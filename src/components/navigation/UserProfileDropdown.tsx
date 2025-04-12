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
    // We don't need to handle the success value here since the disconnect function already shows a toast
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
          variant="outline"
          className="border-argentina-sun text-argentina-sun hover:bg-argentina-sun/10 flex items-center"
        >
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback className="bg-argentina-sun/20 text-argentina-sun text-xs">
              {walletAddress?.substring(2, 4).toUpperCase() || "WL"}
            </AvatarFallback>
          </Avatar>
          {shortenAddress(walletAddress)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 bg-white" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>My Account</span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleNavigation("/transactions")}>
          <History className="mr-2 h-4 w-4" />
          <span>Transaction History</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation("/account/settings")}>
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
