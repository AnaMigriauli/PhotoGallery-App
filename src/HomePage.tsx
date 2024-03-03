import { useGallery } from "./GalleryContext";
import { useState, useEffect, useRef } from "react";
import Modal from "./ImageModal";
import styled from "styled-components";
interface Photo {
  id: string;
  urls: { full: string };
  alt_description?: string;
  likes?: number;
}

const HomePage: React.FC = () => {
  const { photos, isLoading, executeSearch, fetchNextPage } = useGallery();
  const [searchPhoto, setSearchPhoto] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observer && loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [photos]);

  const handlePhotoSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhoto(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      searchPhoto.trim() !== "" && executeSearch(searchPhoto);
    }, 700); //

    return () => {
      clearTimeout(handler);
    };
  }, [searchPhoto]);

  const handleOpenModal = (photo: Photo) => {
    console.log(photo);
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  console.log(SelectedPhoto);
  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        value={searchPhoto}
        onChange={handlePhotoSearch}
      />

      {isLoading && <div>Loading...</div>}

      <MainContainer>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description || ""}
            onClick={() => handleOpenModal(photo)}
          />
        ))}
      </MainContainer>
      {!isLoading && (
        <div ref={loader} style={{ height: "20px", margin: "10px" }} />
      )}

      {isModalOpen && selectedPhoto && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SelectedPhoto
            key={selectedPhoto.id}
            src={selectedPhoto.urls.full}
            alt={selectedPhoto.alt_description || ""}
          />
          <p>Likes: {selectedPhoto.likes ?? "Not available"}</p>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  img {
    width: 100%;
    height: 350px;
    cursor: pointer;
  }
`;

const SelectedPhoto = styled.img`
  width: 90%;
  max-height: 80vh;
  object-fit: contain;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  outline: none;
  border-radius: 4px;
  border: 1px solid black;
  margin-bottom: 20px;
  border: 1px solid #45a0be;

  &:focus-visible {
    border: 1px solid #add8e6;
  }
`;
