
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  History, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserProfileDropdown = () => {
  const { walletAddress, disconnect } = useWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const shortenAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleLogout = async () => {
    const success = await disconnect();
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-full border border-yellow-500/20 flex items-center pr-3 pl-0"
        >
          <div className="bg-yellow-600 rounded-full h-10 w-10 flex items-center justify-center mr-2">
            <span className="text-white font-bold">
              {walletAddress?.substring(2, 4).toUpperCase() || "WL"}
            </span>
          </div>
          {shortenAddress(walletAddress)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 bg-white" align="end">
        <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation("/transactions")}>
          <History className="mr-2 h-4 w-4" />
          <span>Transaction History</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
