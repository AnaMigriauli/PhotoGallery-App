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
  alt_description?: string;
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

  const fetchPhotos = async (searchTerm: string, pageParam: number) => {
    setIsLoading(true);
    setError(null);
    console.log(pageParam);

    let url = `https://api.unsplash.com/photos?order_by=popular&per_page=20&page=${pageParam}`;
    if (searchTerm) {
      url = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=20&page=${pageParam}`;
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

      // setPhotos((prev) =>
      //   pageParam === 1 ? newPhotos : [...prev, ...newPhotos]
      // );
      if (page === 1 || searchTerm) {
        setPhotos(newPhotos);
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
      }
    } catch (error) {
      setError("Failed to fetch photos.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(photos);

  useEffect(() => {
    fetchPhotos(searchTerm, page);
  }, [page]);

  const executeSearch = (query: string) => {
    setSearchTerm(query);
    setPage(1);
    if (!searchHistory.includes(query)) {
      setSearchHistory((prev) => [...prev, query]);
    }
  };

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
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

// import { useState, createContext, useContext, ReactNode, FC } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";

// interface Photo {
//   id: string;
//   urls: { small: string };
//   alt_description: string;
// }

// interface GalleryContextType {
//   isLoading: boolean;
//   error: Error | null;
//   searchHistory: string[];
//   executeSearch: (query: string) => void;
//   fetchNextPage: () => void;
//   allPhotos: Photo[] | null;
// }

// const GalleryContext = createContext<GalleryContextType>({
//   isLoading: false,
//   error: null,
//   searchHistory: [],
//   executeSearch: () => {},
//   fetchNextPage: () => {},
//   allPhotos: null,
// });

// interface GalleryProviderProps {
//   children: ReactNode;
// }

// const accessKey = "L2sqDC0mPRAmNahheL0QLjwgIqNLwj8b59SXSG7UncQ";

// export const GalleryProvider: FC<GalleryProviderProps> = ({ children }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [searchHistory, setSearchHistory] = useState<string[]>([]);

//   const fetchGallery = async ({ pageParam = 1 }) => {
//     let url = `https://api.unsplash.com/photos?order_by=popular&per_page=20&page=${pageParam}`;
//     if (searchTerm) {
//       url = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=20&page=${pageParam}`;
//     }
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Client-ID ${accessKey}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error fetching from Unsplash API");
//     }

//     const data = await response.json();
//     return {
//       results: searchTerm ? data.results : data,
//       nextPage: pageParam + 1,
//     };
//   };

//   const { data, isLoading, error, fetchNextPage, hasNextPage } =
//     useInfiniteQuery({
//       queryKey: ["photos", searchTerm],
//       queryFn: ({ pageParam = 1 }) => fetchGallery({ pageParam, searchTerm }),
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//     });

//   const executeSearch = (query: string) => {
//     setSearchTerm(query);
//     if (!searchHistory.includes(query)) {
//       setSearchHistory((prevHistory) => [...prevHistory, query]);
//     }
//   };

//   const allPhotos = data?.pages.flatMap((page) => page.results) || [];

//   return (
//     <GalleryContext.Provider
//       value={{
//         isLoading,
//         error,
//         searchHistory,
//         executeSearch,
//         fetchNextPage,
//         allPhotos,
//       }}
//     >
//       {children}
//     </GalleryContext.Provider>
//   );
// };

// export const useGallery = (): GalleryContextType => {
//   const context = useContext(GalleryContext);
//   if (context === undefined) {
//     throw new Error("useGallery must be used within a GalleryProvider");
//   }
//   return context;
// };
