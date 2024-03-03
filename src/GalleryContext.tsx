import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface Photo {
  id: string;
  urls: { small: string };
  alt_description: string;
}

interface GalleryContextType {
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
  searchHistory: string[];
  executeSearch: (query: string) => void;
  fetchNextPage: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

interface GalleryProviderProps {
  children: ReactNode;
}
const accessKey = "L2sqDC0mPRAmNahheL0QLjwgIqNLwj8b59SXSG7UncQ";

export const GalleryProvider: FC<GalleryProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchPhotos = async (searchTerm: string, page: number) => {
    setIsLoading(true);
    setError(null);
    console.log(page);
    console.log(searchTerm);

    let url = `https://api.unsplash.com/photos?order_by=popular&per_page=20&page=${page}`;
    if (searchTerm) {
      url = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=20&page=${page}`;
    }

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Client-ID ${accessKey}` },
      });

      if (!response.ok) {
        throw new Error("Error fetching ");
      }

      const data = await response.json();
      const newPhotos = searchTerm ? data.results : data;

      setPhotos((prev) =>
        page === 1 || searchTerm ? newPhotos : [...prev, ...newPhotos]
      );

      // if (page === 1) {
      //   setPhotos(newPhotos);
      // } else {
      //   setPhotos((prev) => [...prev, ...newPhotos]);
      // }
    } catch (error) {
      setError("Failed to fetch photos.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(photos);

  const executeSearch = (query: string) => {
    if (query !== searchTerm) {
      setSearchTerm(query);
      setPage(1);
      setPhotos([]);
      if (!searchHistory.includes(query)) {
        setSearchHistory((prev) => [...prev, query]);
      }
    }
  };
  useEffect(() => {
    fetchPhotos(searchTerm, page);
  }, [page, searchTerm]);

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
    console.log("gurama");
  };

  return (
    <GalleryContext.Provider
      value={{
        photos,
        isLoading,
        error,
        searchHistory,
        executeSearch,
        fetchNextPage,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("arror");
  }
  return context;
};
