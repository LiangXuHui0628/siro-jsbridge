import Method from "./Method";

export default class AsyncMethod {

    method: Method ;

    constructor(){
        this.method = new Method();
    }

    getMethod() {
        return this.method ;
    }
}