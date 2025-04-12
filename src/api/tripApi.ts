
// Mock data for the trip planner sidebar

export interface TripEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'conference' | 'workshop' | 'hackathon' | 'social' | 'other';
  imageUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  date: string;
  time: string;
  imageUrl?: string;
}

export interface Friend {
  id: string;
  name: string;
  wallet: string;
  avatarUrl: string;
  events: string[]; // IDs of events they're attending
}

export interface TripPlan {
  startDate: string;
  endDate: string;
  events: TripEvent[];
  restaurants: Restaurant[];
  friends: Friend[];
}

// Mock data
const mockTripPlan: TripPlan = {
  startDate: "2025-11-15",
  endDate: "2025-11-23",
  events: [
    {
      id: "e1",
      title: "Ethereum World's Fair",
      date: "2025-11-17",
      time: "10:00 - 18:00",
      location: "La Rural",
      type: "conference",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },
    {
      id: "e2",
      title: "ETH Day Kickoff",
      date: "2025-11-17",
      time: "09:00 - 12:00",
      location: "La Rural",
      type: "conference",
      imageUrl: "https://images.unsplash.com/photo-1591116681b-8f15b8c8ba11"
    },
    {
      id: "e3",
      title: "Devconnect Official Event",
      date: "2025-11-20",
      time: "10:00 - 16:00",
      location: "La Rural",
      type: "conference",
      imageUrl: "https://images.unsplash.com/photo-1540304453527-62f979142a17"
    },
    {
      id: "e4",
      title: "Web3 Hackers Meetup",
      date: "2025-11-19",
      time: "18:00 - 21:00",
      location: "Area 3, Palermo",
      type: "social",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
    }
  ],
  restaurants: [
    {
      id: "r1",
      name: "Don Julio",
      cuisine: "Steakhouse",
      location: "Palermo",
      date: "2025-11-17",
      time: "20:00",
      imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17"
    },
    {
      id: "r2",
      name: "El Preferido",
      cuisine: "Argentine",
      location: "Palermo",
      date: "2025-11-19",
      time: "21:00",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },
    {
      id: "r3",
      name: "Web3 Café",
      cuisine: "Café",
      location: "Recoleta",
      date: "2025-11-20",
      time: "10:00",
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8"
    }
  ],
  friends: [
    {
      id: "f1",
      name: "Alex Rodriguez",
      wallet: "0x1234...5678",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      events: ["e1", "e3"]
    },
    {
      id: "f2",
      name: "Morgan Lee",
      wallet: "0x8765...4321",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      events: ["e1", "e2", "e4"]
    },
    {
      id: "f3",
      name: "Taylor Chen",
      wallet: "0x9876...1234",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      events: ["e3", "e4"]
    },
    {
      id: "f4",
      name: "Jordan Kim",
      wallet: "0x5432...9876",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      events: ["e1", "e4"]
    }
  ]
};

export const getTripPlan = (): Promise<TripPlan> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTripPlan);
    }, 500);
  });
};

// Mock wallet connection status
let walletConnected = false;

export const isWalletConnected = (): boolean => {
  return walletConnected;
};

export const connectWallet = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      walletConnected = true;
      resolve(true);
    }, 1000);
  });
};

export const disconnectWallet = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      walletConnected = false;
      resolve(true);
    }, 500);
  });
};
