import Method from "./Method";

export default class SyncMethod {

    method: Method ;

    constructor() {
        this.method = new Method();
    }

    getMethod() {
        return this.method ;
    }
}