import { useGallery } from "./GalleryContext";
import { useState, useEffect, useRef } from "react";
import Modal from "./ImageModal";
import styled from "styled-components";

const HomePage: React.FC = () => {
  const { photos, isLoading, error, executeSearch, fetchNextPage } =
    useGallery();
  const [searchPhoto, setSearchPhoto] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  const handlePhotoSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhoto(e.target.value);
  };

  const handleEnterForSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchPhoto.trim() !== "") {
      executeSearch(searchPhoto);
    }
  };

  const handleOpenModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchPhoto}
        onChange={handlePhotoSearch}
        onKeyDown={handleEnterForSearch}
      />

      {isLoading && <div>Loading...</div>}

      <div>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description || ""}
            onClick={() => handleOpenModal(photo)}
          />
        ))}
      </div>

      <div ref={loader} style={{ height: "20px", margin: "10px" }} />

      {isModalOpen && selectedPhoto && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SelectedPhoto
            src={selectedPhoto.urls.small}
            alt={selectedPhoto.alt_description || ""}
          />
          <p>Likes: {selectedPhoto.likes}</p>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;

const SelectedPhoto = styled.img`
  width: 50%;
  max-height: 80vh;
  object-fit: contain;
`;

// import { useGallery } from "./GalleryContext";
// import { useState, useEffect, useRef } from "react";
// import Modal from "./ImageModal";
// import styled from "styled-components";

// const HomePage: React.FC = () => {
//   const { photos, isLoading, error, executeSearch, fetchNextPage } =
//     useGallery();
//   const [searchPhoto, setSearchPhoto] = useState<string>("");
//   const [isModalOpen, setModalOpen] = useState<boolean>(false);
//   const [selectedPhoto, setSelectedPhoto] = useState();
//   const loader = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const first = entries[0];
//         if (first.isIntersecting) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loader.current) {
//       observer.observe(loader.current);
//     }
//     console.log(loader.current);
//     return () => {
//       if (loader.current) {
//         observer.unobserve(loader.current);
//       }
//     };
//   }, []);

//   if (error) {
//     return <div>Error: {error.toString()}</div>;
//   }
//   const handlephotoSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchPhoto(e.target.value);
//   };

//   const handleEnterForSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       searchPhoto.trim() !== "" && executeSearch(searchPhoto);
//     }
//   };
//   const handleOpenModal = (photo) => {
//     setSelectedPhoto(photo);
//     setModalOpen(true);
//   };
//   const closeModal = () => setModalOpen(false);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchPhoto}
//         onChange={handlephotoSearch}
//         onKeyDown={handleEnterForSearch}
//       />

//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <Gallery>
//           {photos?.map((photo) => (
//             <img
//               key={photo.id}
//               src={photo.urls.small}
//               alt={photo.alt_descrition}
//               onClick={() => handleOpenModal(photo)}
//             />
//           ))}
//         </Gallery>
//       )}
//       <div ref={loader} />
//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <SelectedPhoto
//             src={selectedPhoto?.urls.regular}
//             alt={selectedPhoto?.alt_descrition}
//           />
//           <p>likes:{selectedPhoto?.likes}</p>
//         </Modal>
//       )}
//     </div>
//   );
// };
// export default HomePage;

// const SelectedPhoto = styled.img`
//   width: 50%;
// `;

// const Gallery = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   grid-gap: 15px;
//   img {
//     width: 100%;
//     height: 200px; /* Adjust based on preference */
//     object-fit: cover;
//   }
// `;
