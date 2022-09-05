import { Web3Provider } from "@ethersproject/providers";
import { NETWORK_CONFIG } from "../constant";

// 获取账号
export const getAccount = async () => {
  const accounts = await window.ethereum?.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

// 初始化网络
export const initNetwork = async (externalProvider) => {
  const { chainId, chainName, nativeCurrency, rpc, scanUrl } = NETWORK_CONFIG;
  const provider = externalProvider || window.ethereum;
  try {
    await provider?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    return true;
  } catch (error) {
    if (error?.code === 4902) {
      const netConfig = {
        chainId,
        chainName,
        nativeCurrency,
        rpcUrls: [rpc],
        blockExplorerUrls: [scanUrl],
      };
      await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ ...netConfig }],
      });
      return true;
    }
    return false;
  }
};

export function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  return library;
}
