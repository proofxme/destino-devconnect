
/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (request: { method: string, params?: Array<any> }) => Promise<any>
  }
}
