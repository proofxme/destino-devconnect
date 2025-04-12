
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSearchParams } from "react-router-dom";

const cities = [
  { value: "all", label: "All Cities" },
  { value: "buenos-aires", label: "Buenos Aires" },
  { value: "palermo", label: "Palermo" },
  { value: "recoleta", label: "Recoleta" },
  { value: "san-telmo", label: "San Telmo" },
  { value: "belgrano", label: "Belgrano" },
  { value: "puerto-madero", label: "Puerto Madero" },
];

export function CityFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCity = searchParams.get("city") || "all";

  const handleCityChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("city");
    } else {
      searchParams.set("city", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center">
      <div className="relative w-[200px]">
        <Select value={currentCity} onValueChange={handleCityChange}>
          <SelectTrigger className="flex items-center">
            <MapPin size={16} className="mr-2 text-argentina-blue" />
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
