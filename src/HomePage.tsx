import { useGallery } from "./GalleryContext";
import { useState } from "react";

const HomePage: React.FC = () => {
  const { data, isLoading, error, executeSearch } = useGallery();
  const [searchPhoto, setSearchPhoto] = useState<string>("");

  // useEffect(() => {
  //   executeSearch("");
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  const handlephotoSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhoto(e.target.value);
  };

  const handleEnterForSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPhoto.trim() !== "" && executeSearch(searchPhoto);
    }
  };
  console.log(searchPhoto);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchPhoto}
        onChange={handlephotoSearch}
        onKeyDown={handleEnterForSearch}
      />

      <div>
        {data?.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
          />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
