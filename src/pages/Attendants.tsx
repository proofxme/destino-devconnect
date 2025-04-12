
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Users, Filter } from "lucide-react";

// Mock data for attendants
const MOCK_ATTENDANTS = [
  { id: 1, name: "Alex Johnson", role: "Developer", company: "Ethereum Foundation", interests: ["Smart Contracts", "Layer 2"] },
  { id: 2, name: "Maria Garcia", role: "Researcher", company: "Chainlink Labs", interests: ["Oracles", "ZK Proofs"] },
  { id: 3, name: "James Wilson", role: "Founder", company: "ZK Solutions", interests: ["Privacy", "Scaling"] },
  { id: 4, name: "Sarah Ahmed", role: "Designer", company: "Polygon", interests: ["UX Design", "NFTs"] },
  { id: 5, name: "Michael Patel", role: "Engineer", company: "Arbitrum", interests: ["Optimistic Rollups", "DeFi"] },
  { id: 6, name: "Emma Rodriguez", role: "Product Manager", company: "Uniswap", interests: ["DEX", "Tokenomics"] },
  { id: 7, name: "David Kim", role: "Community Lead", company: "Optimism", interests: ["DAOs", "Community Building"] },
  { id: 8, name: "Nina Chen", role: "Protocol Engineer", company: "Scroll", interests: ["ZK Rollups", "EVM"] },
];

const Attendants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  
  const filteredAttendants = MOCK_ATTENDANTS.filter(attendant => {
    const matchesSearch = 
      attendant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendant.interests.some(interest => 
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
    const matchesRole = roleFilter === "" || attendant.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = Array.from(new Set(MOCK_ATTENDANTS.map(a => a.role)));

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Devconnect Attendants</h1>
        <p className="text-gray-600 mb-6">
          Connect with other attendees at Devconnect Argentina 2025. Use the filters below to find people with similar interests.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search by name, company, or interests" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-roles">All Roles</SelectItem>
              {uniqueRoles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2" onClick={() => {
          setSearchTerm("");
          setRoleFilter("");
        }}>
          <Filter className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Interests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendants.length > 0 ? (
              filteredAttendants.map((attendant) => (
                <TableRow key={attendant.id}>
                  <TableCell className="font-medium">{attendant.name}</TableCell>
                  <TableCell>{attendant.role}</TableCell>
                  <TableCell>{attendant.company}</TableCell>
                  <TableCell>{attendant.interests.join(", ")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No attendants found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Attendants;
