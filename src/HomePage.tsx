import { useGallery } from "./GalleryContext";
import { useState } from "react";
import Modal from "./ImageModal";

const HomePage: React.FC = () => {
  const { data, isLoading, error, executeSearch } = useGallery();
  const [searchPhoto, setSearchPhoto] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

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
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => setModalOpen(false);

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
            alt={photo.alt_descrition}
            onClick={handleOpenModal}
          />
        ))}
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>}
    </div>
  );
};
export default HomePage;
