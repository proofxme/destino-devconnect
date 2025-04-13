
import { useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Repeat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Transactions = () => {
  const { connected, transactions } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case "receive":
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case "swap":
        return <Repeat className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto max-w-4xl pt-24 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      
      {transactions.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-gray-500">No transactions found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="overflow-hidden">
              <CardHeader className="p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</CardTitle>
                      <CardDescription className="text-xs">{transaction.date}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.amount}</div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
