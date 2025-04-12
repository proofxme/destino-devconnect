
import React from "react";
import { Friend, TripEvent } from "@/api/tripApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface TripFriendsListProps {
  friends: Friend[];
  loading: boolean;
}

const TripFriendsList: React.FC<TripFriendsListProps> = ({ friends, loading }) => {
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
      <div className="text-center py-8 border border-dashed rounded-lg">
        <p className="text-gray-500">No friends attending</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-10 w-10 mr-3 border border-gray-200">
                  <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                  <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{friend.wallet}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div>
            <div className="font-medium text-sm">{friend.name}</div>
            <div className="text-xs text-gray-500">
              Attending {friend.events.length} event{friend.events.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripFriendsList;
