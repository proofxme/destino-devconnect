
import { useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AdminButtonProps {
  size?: "default" | "sm";
  className?: string;
}

export const AdminButton = ({ size = "default", className = "" }: AdminButtonProps) => {
  const navigate = useNavigate();

  const goToAdminDashboard = () => {
    navigate("/admin");
  };

  return (
    <Button
      onClick={goToAdminDashboard}
      variant="outline"
      size={size}
      className={`border-argentina-blue text-argentina-blue hover:bg-argentina-blue hover:text-white ${className}`}
    >
      {size === "default" ? (
        <>
          Propose
          <ChevronRight className="ml-1 h-4 w-4" />
        </>
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  );
};
