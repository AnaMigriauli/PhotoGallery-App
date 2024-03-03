import { useGallery } from "./GalleryContext";
import { useState } from "react";

const HistoryPage = () => {
  const { photos, searchHistory, executeSearch } = useGallery();
  const [DisplayData, setDisplayData] = useState(false);

  const handleHistoryItemClick = (term: string) => {
    executeSearch(term);
    setDisplayData(true);
  };

  return (
    <div>
      <ul>
        {searchHistory ? (
          searchHistory.map((term, index) => (
            <li
              style={{ cursor: "pointer", listStyle: "none" }}
              key={index}
              onClick={() => {
                handleHistoryItemClick(term);
              }}
            >
              {term}
            </li>
          ))
        ) : (
          <p>There is no data in history</p>
        )}
      </ul>
      <div>
        {DisplayData &&
          photos?.map((photo) => (
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
export default HistoryPage;
