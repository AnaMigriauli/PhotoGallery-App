import { Children, createContext, useContext } from "react";

const GalleryContext = createContext();

interface GalleryProviderProps {
  children: ReactNode;
}
const accessKey = "L2sqDC0mPRAmNahheL0QLjwgIqNLwj8b59SXSG7UncQ";

export const GalleryProvider = ({ children }) => {
  const fetchGallery = async () => {
    const url = "https://api.unsplash.com/photos?order_by=popular&per_page=20";

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching from Unsplash API");
    }

    const jsonData = await response.json();
    return jsonData;
  };
  fetchGallery;

  return <GalleryContext.Provider>{Children}</GalleryContext.Provider>;
};

export const useGallery = () => useContext(GalleryContext);
