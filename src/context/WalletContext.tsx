
import React, { createContext, useContext, useState, useEffect } from "react";
import { connectWallet, disconnectWallet, isWalletConnected } from "@/api/tripApi";
import { useToast } from "@/components/ui/use-toast";

interface Transaction {
  id: string;
  date: string;
  amount: string;
  type: 'send' | 'receive' | 'swap';
  status: 'completed' | 'pending' | 'failed';
}

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  walletAddress: string | null;
  transactions: Transaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    date: "2025-04-10",
    amount: "1.5 ETH",
    type: "receive",
    status: "completed"
  },
  {
    id: "tx2",
    date: "2025-04-08",
    amount: "0.5 ETH",
    type: "send",
    status: "completed"
  },
  {
    id: "tx3",
    date: "2025-04-03",
    amount: "2.0 ETH",
    type: "swap",
    status: "completed"
  }
];

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if wallet is connected on mount
    const checkConnection = async () => {
      const isConnected = isWalletConnected();
      setConnected(isConnected);
      if (isConnected) {
        // In a real app, we would get the actual wallet address
        setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        // Load transactions in a real app
        setTransactions(mockTransactions);
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
        // Set mock transactions
        setTransactions(mockTransactions);
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
        setTransactions([]);
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected.",
        });
      }
      return success;
    } catch (error) {
      toast({
        title: "Disconnect Failed",
        description: "Failed to disconnect wallet.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <WalletContext.Provider
      value={{ 
        connected, 
        connecting, 
        connect, 
        disconnect, 
        walletAddress,
        transactions 
      }}
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
