
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, ListPlus, BookmarkPlus } from "lucide-react";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchItem, searchItems, addToList, addToFavorites, subscribeToItem } from "@/api/searchApi";

export function SearchSpotlight() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      
      try {
        const results = await searchItems(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleItemSelect = (item: SearchItem) => {
    setOpen(false);
    navigate(item.link);
  };

  const handleAddToList = async (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    try {
      await addToList(item.id);
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const handleAddToFavorites = async (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    try {
      await addToFavorites(item.id);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleSubscribe = async (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    try {
      await subscribeToItem(item.id);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size={isMobile ? "icon" : "sm"}
        className={isMobile 
          ? "h-9 w-9 p-0 text-white" 
          : "relative h-10 w-10 md:w-60 md:justify-start md:px-4 md:py-2 text-base rounded-md bg-white/10 hover:bg-white/20 text-white"
        }
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className={isMobile ? "h-5 w-5" : "h-5 w-5 md:mr-2"} />
        {!isMobile && <span className="hidden md:inline-flex">Search...</span>}
        {!isMobile && (
          <kbd className="hidden md:inline-flex absolute right-3 top-2 pointer-events-none h-5 select-none items-center gap-1 rounded border bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100 text-white">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        )}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search events, places, activities..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup heading="Results">
              {searchResults.map((item) => (
                <CommandItem
                  key={`${item.type}-${item.id}`}
                  onSelect={() => handleItemSelect(item)}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center space-x-3">
                    {item.imageUrl && (
                      <div className="w-10 h-10 overflow-hidden rounded">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="text-xs text-muted-foreground">
                        <span className="capitalize">{item.type}</span>
                        {item.category && <> · {item.category}</>}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-7 w-7"
                      onClick={(e) => handleAddToList(e, item)}
                      title="Add to list"
                    >
                      <ListPlus size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={(e) => handleAddToFavorites(e, item)}
                      title="Add to favorites"
                    >
                      <Heart size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={(e) => handleSubscribe(e, item)}
                      title="Subscribe"
                    >
                      <BookmarkPlus size={16} />
                    </Button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
