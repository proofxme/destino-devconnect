
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { connected } = useWallet();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");
  const [email, setEmail] = useState("user@example.com");
  const [displayName, setDisplayName] = useState("Ethereum Enthusiast");
  const [bio, setBio] = useState("Web3 developer and crypto enthusiast.");
  
  const handleSave = (section: string) => {
    // In a real app, this would save to a database
    toast({
      title: "Settings Updated",
      description: `Your ${section} settings have been saved successfully.`,
    });
  };

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Card>
          <CardContent className="pt-6">
            <p>Please connect your wallet to access account settings.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <Tabs defaultValue="profile">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-1">
            <TabsList className="flex flex-col h-auto space-y-1 bg-transparent">
              <TabsTrigger 
                value="profile" 
                className="justify-start w-full"
              >
                Profile Information
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-start w-full"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="justify-start w-full"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="justify-start w-full"
              >
                Security & Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="wallets" 
                className="justify-start w-full"
              >
                Connected Wallets
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="profile" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and how it appears to others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input 
                      id="displayName" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave('profile')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="text-base">Enable Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications about activity in your account</p>
                    </div>
                    <Switch 
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Channels</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-xs text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="emailNotifications"
                        disabled={!notificationsEnabled}
                        checked={emailNotifications && notificationsEnabled}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                        <p className="text-xs text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch 
                        id="pushNotifications"
                        disabled={!notificationsEnabled}
                        checked={pushNotifications && notificationsEnabled}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave('notifications')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>
                    Customize how the app works for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="ars">ARS ($)</SelectItem>
                        <SelectItem value="eth">ETH (Ξ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave('preferences')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Privacy</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Privacy Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="publicProfile">Public Profile</Label>
                        <p className="text-xs text-gray-500">Allow others to see your profile information</p>
                      </div>
                      <Switch id="publicProfile" defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showActivity">Activity Visibility</Label>
                        <p className="text-xs text-gray-500">Show your activity to other users</p>
                      </div>
                      <Switch id="showActivity" defaultChecked={true} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSave('security')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="wallets" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Wallets</CardTitle>
                  <CardDescription>
                    Manage your connected blockchain wallets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-600 rounded-full h-10 w-10 flex items-center justify-center">
                          <span className="text-white font-bold">71</span>
                        </div>
                        <div>
                          <p className="font-medium">MetaMask</p>
                          <p className="text-sm text-gray-500">0x71C7...976F</p>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        Connected
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline">Connect Another Wallet</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
