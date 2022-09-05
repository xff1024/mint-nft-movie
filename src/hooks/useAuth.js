import { useCallback } from "react";
import { initNetwork } from "../utils/web3.utils.js";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ChainId } from "../constant";
const useAuth = () => {
  const { activate, setError } = useWeb3React();
  const login = useCallback(async () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;

    if (!isMetamask) {
      window.open("https://metamask.io/download");
      return;
    }

    const injectedConnector = new InjectedConnector({
      supportedChainIds: [ChainId],
    });

    activate(injectedConnector, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        setError(error);
        const provider = await injectedConnector.getProvider();
        const hasSetup = await initNetwork(provider);
        if (hasSetup) {
          activate(injectedConnector);
        }
        localStorage.setItem("");
      }
    });
  }, [activate, setError]);

  return { login };
};

export default useAuth;
