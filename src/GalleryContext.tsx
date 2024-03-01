import { useState, createContext, useContext, ReactNode, FC } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

interface Photo {
  id: string;
  urls: { small: string };
  alt_descrition: string;
}

interface GalleryContextType {
  data: Photo[] | null;
  isLoading: boolean;
  error: Error | null;
  searchHistory: string[];
  executeSearch: (query: string) => void;
}

const GalleryContext = createContext<GalleryContextType>({
  data: null,
  isLoading: false,
  error: null,
  searchHistory: [],
  executeSearch: () => {},
});

interface GalleryProviderProps {
  children: ReactNode;
}

const accessKey = "L2sqDC0mPRAmNahheL0QLjwgIqNLwj8b59SXSG7UncQ";

export const GalleryProvider: FC<GalleryProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const fetchGallery = async ({
    queryKey,
  }: QueryFunctionContext<[string, string]>) => {
    const [, query] = queryKey;

    let url = "https://api.unsplash.com/photos?order_by=popular&per_page=20";
    if (query) {
      url = `https://api.unsplash.com/search/photos?query=${query}&per_page=20`;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching from Unsplash API");
    }

    const jsonData = await response.json();
    return query ? jsonData.results : jsonData;
  };
  console.log();

  const { data, isLoading, error } = useQuery({
    queryKey: ["photos", searchTerm],
    queryFn: fetchGallery,
    enabled: true,
  });

  const executeSearch = async (query: string) => {
    setSearchTerm(query);
    if (!searchHistory.includes(query)) {
      setSearchHistory((prevHistory) => [...prevHistory, query]);
    }
  };

  return (
    <GalleryContext.Provider
      value={{ data, isLoading, error, searchHistory, executeSearch }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
