
import React, { useState } from "react";
import { Friend, TripEvent } from "@/api/tripApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface TripFriendsListProps {
  friends: Friend[];
  loading: boolean;
}

const TripFriendsList: React.FC<TripFriendsListProps> = ({ friends, loading }) => {
  const [expandedFriend, setExpandedFriend] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3 p-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 border border-dashed rounded-lg"
      >
        <p className="text-gray-500">No friends attending</p>
      </motion.div>
    );
  }

  const toggleExpand = (id: number) => {
    setExpandedFriend(expandedFriend === id ? null : id);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {friends.map((friend) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`rounded-lg border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 ${
              expandedFriend === friend.id ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => toggleExpand(friend.id)}
          >
            <div className="flex items-center p-3 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className={`h-10 w-10 mr-3 border ${expandedFriend === friend.id ? "border-blue-200 ring-2 ring-blue-100" : "border-gray-200"}`}>
                      <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-800">{friend.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{friend.wallet}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex-1">
                <div className="font-medium text-sm">{friend.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                  Attending {friend.events.length} event{friend.events.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedFriend === friend.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-0">
                    <div className="text-xs font-medium text-gray-500 mb-2 mt-1">Events:</div>
                    <div className="flex flex-wrap gap-1">
                      {friend.events.map((event, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 border-none">
                          {event.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TripFriendsList;
