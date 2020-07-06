import SRJSBridge from './SiroJsBridge/SRJSBridge'

declare global {
  interface Window {
    SRJSBridge: SRJSBridge,
    _dsbridge: any,
    _handleMessageFromNative: any,
    _dswk: any,
    Vue:any,
  }
}
// export const SiroBridge = new SRJSBridge();
window.SRJSBridge = new SRJSBridge();
