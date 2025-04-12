
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
      className="border-white text-white hover:bg-white/10"
      size={isMobile ? "sm" : "default"}
      onClick={connect} 
      disabled={connecting}
    >
      <Wallet className={`${isMobile ? "" : "mr-2"} h-4 w-4`} />
      {!isMobile && (connecting ? "Connecting..." : "Connect Wallet")}
    </Button>
  );
};

export default WalletButton;
