
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const WalletButton = () => {
  const { connected, connecting, connect, disconnect, walletAddress } = useWallet();

  const shortenAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (connected) {
    return (
      <div className="flex items-center">
        <Button
          variant="outline"
          className="border-argentina-sun text-argentina-sun hover:bg-argentina-sun/10"
          onClick={disconnect}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {shortenAddress(walletAddress)}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      className="border-white text-white hover:bg-white/10"
      onClick={connect} 
      disabled={connecting}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;
