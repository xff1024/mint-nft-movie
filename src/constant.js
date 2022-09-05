export const ChainId = 4;

export const NETWORK_CONFIG = {
  chainId: `0x${ChainId.toString(16)}`,
  chainName: "rinkeby",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpc: "https://rpc.ankr.com/eth_rinkeby",
  scanUrl: "https://rinkeby.etherscan.io/",
};

// constract address
export const CONSTACTS_ADDRESS = "0x6A8513758e8863dc3D4047C690EA7865d59AcE3B";

export const IPFS_URL = "http://127.0.0.1:5002/api/v0";
