
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, MapPin, Check, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface VenueProposalFormProps {
  type: string;
  onClose: () => void;
}

type FormValues = {
  name: string;
  address: string;
  description: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
  acceptsCrypto: boolean;
};

const VenueProposalForm = ({ type, onClose }: VenueProposalFormProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      latitude: "",
      longitude: "",
      imageUrl: "",
      acceptsCrypto: false
    }
  });

  const getTitleText = () => {
    switch (type) {
      case "venue": return "Propose New Venue";
      case "event": return "Submit New Event";
      case "accommodation": return "Propose New Accommodation";
      case "restaurant": return "Recommend New Restaurant";
      case "activity": return "Add New Activity";
      default: return "Propose New Place";
    }
  };

  const onSubmit = (values: FormValues) => {
    console.log("Submitted proposal:", {
      ...values,
      type,
      timestamp: new Date().toISOString(),
      walletAddress: localStorage.getItem("wallet-address") || "Unknown"
    });

    // In a real implementation, this would send data to a backend/blockchain
    toast.success("Proposal submitted successfully!");
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl">{getTitleText()}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={`Enter ${type} name`} {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.0000001"
                        placeholder="e.g. -34.6037" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.0000001"
                        placeholder="e.g. -58.3816" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Describe this ${type}`} 
                      {...field} 
                      className="min-h-[120px]"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL (optional)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptsCrypto"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Accepts Crypto Payments</FormLabel>
                    <FormDescription>
                      Does this {type} accept cryptocurrency payments?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Submit Proposal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </CardContent>
  </Card>
  );
};

export default VenueProposalForm;
