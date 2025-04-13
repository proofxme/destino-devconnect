
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
      className="bg-gray-700 hover:bg-gray-600 text-white h-10 rounded-full border border-yellow-500/20 flex items-center"
      onClick={connect} 
      disabled={connecting}
    >
      <div className="bg-yellow-600 rounded-full h-7 w-7 flex items-center justify-center mr-2">
        <Wallet className="h-4 w-4 text-white" />
      </div>
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;
