"use client";
import {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from 'react';

const DISCORD_ID = '455384255774720011';

type LanyardResponse = {
  data: {
    discord_user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
    };
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Activity[];
    spotify: SpotifyData | null;
    listening_to_spotify: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_web: boolean;
  };
};

type Activity = {
  type: number;
  state: string;
  name: string;
  id: string;
  details?: string;
  created_at: number;
  timestamps?: {
    start: number;
    end?: number;
  };
  assets?: {
    large_image: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
};

type SpotifyData = {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
};

type UseLanyardValue = {
  data: LanyardResponse['data'] | null;
  loading: boolean;
  error: Error | null;
};

const LanyardContext = createContext<UseLanyardValue | undefined>(undefined);

function useProvideLanyard(): UseLanyardValue {
  const [data, setData] = useState<LanyardResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Lanyard data');
        }
        const result: LanyardResponse = await response.json();
        setData(result.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}

export function LanyardProvider({ children }: { children: ReactNode }) {
  const value = useProvideLanyard();

  return (
    <LanyardContext.Provider value={value}>
      {children}
    </LanyardContext.Provider>
  );
}

export function useLanyard() {
  const context = useContext(LanyardContext);
  if (!context) {
    throw new Error('useLanyard must be used within a LanyardProvider');
  }
  return context;
}
