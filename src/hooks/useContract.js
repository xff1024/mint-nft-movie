import { useEffect, useMemo, useState } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import BigNumber from "bignumber.js";
import { NETWORK_CONFIG, CONSTACTS_ADDRESS } from "../constant";
import useActiveWeb3 from "./useActiveWeb3";
import abi from "../contracts/abi.json";

const useContract = () => {
  const { account } = useActiveWeb3();
  const [movieIds, setMovieIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const nftContract = useMemo(() => {
    try {
      return new Contract(
        CONSTACTS_ADDRESS,
        abi,
        new JsonRpcProvider(NETWORK_CONFIG.rpc)
      );
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const getNftLists = async () => {
      if (account && nftContract) {
        setLoading(true);
        const lists = await nftContract?.getNFTList();
        setMovieIds(
          lists?.map((item) => new BigNumber(item.movie_id._hex).toNumber()) ||
            []
        );
      }
      setLoading(false);
    };
    getNftLists();
  }, [nftContract, account]);

  return {
    loading,
    movieIds,
    nftContract,
  };
};

export default useContract;
