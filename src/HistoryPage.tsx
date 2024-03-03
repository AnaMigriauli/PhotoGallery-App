import { useGallery } from "./GalleryContext";
import { useState } from "react";

const HistoryPage = () => {
  const { photos, searchHistory, executeSearch } = useGallery();
  const [DisplayData, setDisplayData] = useState(false);
  console.log(searchHistory);

  const handleHistoryItemClick = (term: string) => {
    executeSearch(term);
    setDisplayData(true);
  };

  return (
    <div>
      <ul>
        {searchHistory.map((term, index) => (
          <li
            key={index}
            onClick={() => {
              handleHistoryItemClick(term);
            }}
          >
            {term}
          </li>
        ))}
      </ul>
      <div>
        {DisplayData &&
          photos?.map((photo) => (
            <img
              key={photo.id}
              src={photo.urls.small}
              alt={photo.alt_descrition}
            />
          ))}
      </div>
    </div>
  );
};
export default HistoryPage;
