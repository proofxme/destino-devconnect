
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
import { toast } from "sonner";

type SearchItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'event' | 'accommodation' | 'restaurant' | 'activity';
  link: string;
  imageUrl: string;
};

export function SearchSpotlight() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Combine data from all sections
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    // This would normally be a real search API call
    // Here we'll simulate with static data
    const query = searchQuery.toLowerCase();
    
    // Get data from various places in the app (this is an example implementation)
    const events = [
      { id: 1, title: "Devconnect Buenos Aires", description: "The main Devconnect event", category: "conference", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87" },
      { id: 2, title: "ETHLatam", description: "Latin America's largest Ethereum community event", category: "conference", imageUrl: "https://images.unsplash.com/photo-1591116681b-8f15b8c8ba11" },
    ];
    
    const accommodations = [
      { id: 1, title: "Alvear Palace Hotel", description: "Luxury hotel in Recoleta", category: "Luxury", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
      { id: 2, title: "Palermo Soho Loft", description: "Modern loft apartment", category: "Apartment", imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
    ];
    
    const restaurants = [
      { id: 1, title: "Don Julio", description: "Famous steakhouse", category: "Steakhouse", imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17" },
      { id: 2, title: "El Preferido", description: "Historic local restaurant", category: "Argentine", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
    ];
    
    const activities = [
      { id: 1, title: "La Bomba de Tiempo", description: "Famous drum performance", category: "Cultural", imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5" },
      { id: 2, title: "San Telmo Sunday Market", description: "Historic market", category: "Shopping", imageUrl: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7" },
    ];

    // Format results
    const results: SearchItem[] = [
      ...events.filter(e => e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query))
        .map(e => ({ ...e, type: 'event' as const, link: `/events` })),
      ...accommodations.filter(a => a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query))
        .map(a => ({ ...a, type: 'accommodation' as const, link: `/accommodations` })),
      ...restaurants.filter(r => r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query))
        .map(r => ({ ...r, type: 'restaurant' as const, link: `/restaurants` })),
      ...activities.filter(a => a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query))
        .map(a => ({ ...a, type: 'activity' as const, link: `/activities` })),
    ];

    setSearchResults(results);
  }, [searchQuery]);

  // Set up keyboard shortcut to open search dialog
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

  const addToList = (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    toast.success(`Added ${item.title} to list`);
  };

  const addToFavorites = (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    toast.success(`Added ${item.title} to favorites`);
  };

  const subscribe = (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    toast.success(`Subscribed to ${item.title}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 md:h-10 md:w-60 md:justify-start md:px-3 md:py-2 border-argentina-blue"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline-flex">Search...</span>
        <kbd className="hidden md:inline-flex absolute right-1.5 top-1.5 pointer-events-none h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search events, places, activities..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
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
                      onClick={(e) => addToList(e, item)}
                      title="Add to list"
                    >
                      <ListPlus size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={(e) => addToFavorites(e, item)}
                      title="Add to favorites"
                    >
                      <Heart size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={(e) => subscribe(e, item)}
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
