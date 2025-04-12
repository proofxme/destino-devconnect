
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import UserProfileDropdown from "./navigation/UserProfileDropdown";

const WalletButton = () => {
  const { connected, connecting, connect } = useWallet();

  if (connected) {
    return <UserProfileDropdown />;
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
