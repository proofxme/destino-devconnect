
interface Filterable {
  location?: string;
}

/**
 * Filter items by city from URL parameter
 */
export const filterByCity = <T extends Filterable>(items: T[], cityParam: string | null): T[] => {
  if (!cityParam || cityParam === "all") {
    return items;
  }
  
  // Convert URL-friendly format to display format
  const normalizeCity = (city: string): string => {
    if (!city) return "";
    return city.toLowerCase()
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const cityName = normalizeCity(cityParam);
  
  return items.filter(item => {
    // Check if location contains the city name (case insensitive)
    return item.location?.toLowerCase().includes(cityName.toLowerCase());
  });
};
