import { SRJSBridge } from './SiroJsBridge/SRJSBridge'
export default SRJSBridge;

declare global {
  interface Window {
    SRJSBridge:SRJSBridge,
    _dsbridge: any,
    _handleMessageFromNative: any,
    Vue:any,
  }
}
// export const SiroBridge = new SRJSBridge();
window.SRJSBridge = new SRJSBridge();
