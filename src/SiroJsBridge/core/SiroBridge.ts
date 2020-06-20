import AsyncMethod from "../method/AsyncMethod";
import SyncMethod from "../method/SyncMethod";

export default class SiroBridge {

    // 异步方法
    asyncMethod: AsyncMethod ;
    // 同步方法
    syncMethod: SyncMethod ;
    // 回调方法数量
    callBackCount: number ;
    // 初始化Nativit Bridge方法
    bridgeInit: boolean;

    constructor() {
        this.asyncMethod = new AsyncMethod();
        this.syncMethod = new SyncMethod();
        this.callBackCount = 0 ;
        this.bridgeInit = false;
    }

    call(method: any, args?: any, cb?: any) {
        let ret ;
        if (typeof args === 'function') {
            cb = args;
            args = {};
        }
        const arg={data:args===undefined?null:args}
        if (typeof cb === 'function') {
            const cbName = 'dscb' + this.callBackCount++;
            window[cbName] = cb;
            // tslint:disable-next-line:no-string-literal
            arg['_dscbstub'] = cbName;
        }
        const argStr = JSON.stringify(arg)
        // if in webview that dsBridge provided, call!
        if(window._dsbridge){
           ret = window._dsbridge.call(method, argStr)
        }else if(navigator.userAgent.indexOf("_dsbridge") !== -1){
           ret = prompt("_dsbridge=" + method, argStr);
        }
       return  JSON.parse(ret||'{}').data
    }

    register(name: string, fun: any, asyn?: any) {
        const q = asyn ? this.asyncMethod : this.syncMethod;
        if (!this.bridgeInit) {
            this.bridgeInit = true;
            // notify native that js apis register successfully on next event loop
            setTimeout(() => {
                this.call("_dsb.dsinit");
            }, 0)
        }
        if (typeof fun === "object") {
            q.getMethod[name] = fun;
        } else {
            q[name] = fun
        }
    }

    registerAsyn (name: string, fun: any) {
        this.register(name, fun, true);
    }

    hasNativeMethod (name: string, type: any) {
        // tslint:disable-next-line:object-literal-shorthand
        return this.call("_dsb.hasNativeMethod", {name: name, type:type||"all"});
    }

    disableJavascriptDialogBlock (disable) {
        this.call("_dsb.disableJavascriptDialogBlock", {
            disable: disable !== false
        })
    }
}