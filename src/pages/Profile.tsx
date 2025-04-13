
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  name: string;
  bio: string;
  profileImage: string | null;
  socialLinks: {
    twitter: string;
    github: string;
    website: string;
  }
}

const Profile = () => {
  const { walletAddress, connected, transactions } = useWallet();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    bio: "",
    profileImage: null,
    socialLinks: {
      twitter: "",
      github: "",
      website: ""
    }
  });

  // Mock profile data - in a real app, this would be fetched from a database
  useEffect(() => {
    if (connected) {
      // Simulate loading profile data
      setTimeout(() => {
        setProfile({
          name: "Ethereum Enthusiast",
          bio: "Web3 developer and crypto enthusiast. Passionate about decentralized applications and blockchain technology.",
          profileImage: null,
          socialLinks: {
            twitter: "https://twitter.com/ethereum_dev",
            github: "https://github.com/eth-dev",
            website: "https://mywebsite.com"
          }
        });
      }, 500);
    }
  }, [connected]);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address has been copied to clipboard.",
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    setEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const formatAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Card>
          <CardContent className="pt-6">
            <p>Please connect your wallet to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Profile Info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Profile</span>
                {!editing ? (
                  <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center gap-3">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-argentina-blue text-white text-2xl">
                    {profile.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {editing ? (
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="mt-2 text-center"
                  />
                ) : (
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                )}

                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <div className="bg-yellow-600 h-4 w-4 rounded-full"></div>
                  <span className="text-gray-600 text-sm font-medium">{formatAddress(walletAddress)}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={copyAddress}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                {editing ? (
                  <div className="w-full mt-2">
                    <label className="text-sm text-gray-500 mb-1 block text-left">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full border rounded-md p-2 text-sm h-24"
                    />
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm mt-2">{profile.bio}</p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Social Links</h4>
                
                {editing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Twitter</label>
                      <Input 
                        value={profile.socialLinks.twitter} 
                        onChange={(e) => setProfile({
                          ...profile, 
                          socialLinks: {...profile.socialLinks, twitter: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">GitHub</label>
                      <Input 
                        value={profile.socialLinks.github}
                        onChange={(e) => setProfile({
                          ...profile, 
                          socialLinks: {...profile.socialLinks, github: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Website</label>
                      <Input 
                        value={profile.socialLinks.website}
                        onChange={(e) => setProfile({
                          ...profile, 
                          socialLinks: {...profile.socialLinks, website: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.socialLinks.twitter && (
                      <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                          Twitter <ExternalLink className="h-3 w-3 ml-1" />
                        </Badge>
                      </a>
                    )}
                    {profile.socialLinks.github && (
                      <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                          GitHub <ExternalLink className="h-3 w-3 ml-1" />
                        </Badge>
                      </a>
                    )}
                    {profile.socialLinks.website && (
                      <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </Badge>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Activity & Transactions */}
        <div className="md:col-span-2">
          <Tabs defaultValue="transactions">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent wallet transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex justify-between p-3 border rounded-md bg-gray-50 hover:bg-gray-100">
                          <div>
                            <div className="font-medium">
                              {tx.type === 'receive' ? 'Received' : tx.type === 'send' ? 'Sent' : 'Swapped'}
                            </div>
                            <div className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${tx.type === 'receive' ? 'text-green-600' : 'text-gray-900'}`}>
                              {tx.type === 'receive' ? '+' : ''}{tx.amount}
                            </div>
                            <div className="text-xs text-gray-500">
                              {tx.status === 'completed' ? 'Completed' : tx.status === 'pending' ? 'Pending' : 'Failed'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">No transactions found.</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events you're attending at Devconnect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4 text-gray-500">No upcoming events found.</div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections">
              <Card>
                <CardHeader>
                  <CardTitle>Network Connections</CardTitle>
                  <CardDescription>People you've connected with at Devconnect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4 text-gray-500">No connections found.</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
