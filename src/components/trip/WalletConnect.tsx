
import React from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";

const WalletConnect: React.FC = () => {
  const { connecting, connect } = useWallet();

  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex flex-col items-center justify-center text-center">
      <div className="bg-argentina-blue/10 p-4 rounded-full mb-4">
        <Wallet size={24} className="text-argentina-blue" />
      </div>
      <h3 className="font-medium mb-2">Connect Wallet</h3>
      <p className="text-sm text-gray-500 mb-4">
        Connect your wallet to view and manage your Devconnect trip plan
      </p>
      <Button 
        onClick={connect} 
        disabled={connecting}
        className="bg-argentina-blue hover:bg-argentina-blue-dark"
      >
        {connecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default WalletConnect;
