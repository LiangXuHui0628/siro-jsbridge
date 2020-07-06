import SiroBridge from "./core/SiroBridge";

export default class SRJSBridge {
    // 版本号1.0.0
    version: string ;

    siroBridge: SiroBridge ;

    constructor() {
        this.version = '1.0.23';
        this.siroBridge = new SiroBridge();
        this.invoke = this.invoke.bind(this);
        this.bind2Window();
    }

    install(Vue) {
        Object.defineProperty(Vue.prototype, 'SRJSBridge', {
            get() {
                return new SRJSBridge();
              }
        });
    }

    bind2Window() {
        window._handleMessageFromNative = this._handleMessageFromNative;
    }

    public invoke(method: any, args?: any, cb?: any) {
       return this.siroBridge.call(method, args, cb);
    }

    public _handleMessageFromNative(info:any) {
        const arg = JSON.parse(info.data);
        const ret = {
            id: info.callbackId,
            complete: true
        }
        const f = this.siroBridge.syncMethod[info.method];
        const af = this.siroBridge.asyncMethod[info.method];
        if (f) {
            this.callSyn(ret, f, this.siroBridge.syncMethod);
        } else if (af) {
            this.callAsyn(ret, af, this.siroBridge.asyncMethod);
        }  else {
            // with namespace
            const name = info.method.split('.');
            if (name.length<2) return;
            const method=name.pop();
            const namespace=name.join('.')
            let obs = this.siroBridge.syncMethod.getMethod();
            let ob = obs[namespace] || {};
            let m = ob[method];
            if (m && typeof m === "function") {
                this.callSyn(ret, m, ob);
                return;
            }
            obs = this.siroBridge.asyncMethod.getMethod();
            ob = obs[namespace] || {};
            m = ob[method];
            if (m && typeof m === "function") {
                this.callAsyn(ret, m, ob);
                return;
            }
        }
    }

    _hasJavascriptMethod() {
        this.siroBridge.register('_hasJavascriptMethod', (method) => {
            const name = method.split('.')
            if(name.length<2) {
                return !!(this.siroBridge.syncMethod[name]||this.siroBridge.asyncMethod[name])
            }else{
                // with namespace
                method = name.pop()
                const namespace=name.join('.')
                const ob=this.siroBridge.syncMethod.getMethod[namespace]||this.siroBridge.asyncMethod.getMethod[namespace]
                return ob&&!!ob[method]
            }
       });
    }

    public callSyn(ret: any, f: any, arg: any) {
        ret.data = f.apply(this, arg);
        this.siroBridge.call('_dsb.returnValue', ret)
    }

    public callAsyn (ret: any, f: any, arg: any) {
        arg.push((data, complete) => {
            ret.data = data;
            ret.complete = complete!==false;
            this.siroBridge.call("_dsb.returnValue", ret)
        })
        f.apply(this, arg)
    }

    public getVersion() {
        return this.version;
    }

}