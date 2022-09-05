import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";

export default function useActiveWeb3() {
  const context = useWeb3ReactCore();
  const contextNetwork = useWeb3ReactCore("NETWORK");
  return context.active ? context : contextNetwork;
}
