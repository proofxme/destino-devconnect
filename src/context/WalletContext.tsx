
import React, { createContext, useContext, useState, useEffect } from "react";
import { connectWallet, disconnectWallet, isWalletConnected } from "@/api/tripApi";
import { useToast } from "@/components/ui/use-toast";

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  walletAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if wallet is connected on mount
    const checkConnection = async () => {
      const isConnected = isWalletConnected();
      setConnected(isConnected);
      if (isConnected) {
        // In a real app, we would get the actual wallet address
        setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    try {
      setConnecting(true);
      const success = await connectWallet();
      if (success) {
        setConnected(true);
        // Mock wallet address - in a real app this would come from the wallet connection
        setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected.",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      const success = await disconnectWallet();
      if (success) {
        setConnected(false);
        setWalletAddress(null);
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected.",
        });
      }
    } catch (error) {
      toast({
        title: "Disconnect Failed",
        description: "Failed to disconnect wallet.",
        variant: "destructive",
      });
    }
  };

  return (
    <WalletContext.Provider
      value={{ connected, connecting, connect, disconnect, walletAddress }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
