export function AddGlobalPolyfill () : void {
  if (typeof (window as any).global === 'undefined') {
    ;(window as any).global = window.globalThis || window
  }
}

