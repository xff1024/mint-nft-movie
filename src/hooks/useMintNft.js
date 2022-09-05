import { useCallback, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { create } from "ipfs-http-client";
import { parseUrlToBlob } from "../utils/ipfs";
import { CONSTACTS_ADDRESS, IPFS_URL } from "../constant";
import abi from "../contracts/abi.json";
import useActiveWeb3React from "./useActiveWeb3";
const client = create(IPFS_URL);

const useMintNft = () => {
  const [mintLoading, setMintLoading] = useState(false);
  const { library } = useActiveWeb3React();
  const mintNft = useCallback(
    (url, fileName, title, movieId) => {
      const nftContract = new Contract(
        CONSTACTS_ADDRESS,
        abi,
        library?.getSigner()
      );
      const run = async () => {
        try {
          setMintLoading(true);
          // 转化为文件流
          const file = await parseUrlToBlob(url, fileName);
          // 上传到ipfs
          const { path: cid } = await client.add(file);
          // mint NFT
          await nftContract.mint(movieId, title, cid);
          setMintLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      run();
    },
    [library]
  );

  return {
    mintLoading,
    mintNft,
  };
};

export default useMintNft;
