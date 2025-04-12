
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import UserProfileDropdown from "./navigation/UserProfileDropdown";

const WalletButton = () => {
  const { connected, connecting, connect } = useWallet();
  const isMobile = useIsMobile();

  if (connected) {
    return <UserProfileDropdown />;
  }

  return (
    <Button 
      variant="outline" 
      className="border border-white/20 bg-white/10 text-white hover:bg-white/20 h-10 px-4 rounded-md"
      onClick={connect} 
      disabled={connecting}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;
