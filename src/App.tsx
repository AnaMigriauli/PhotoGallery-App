import { useState } from "react";
import { GalleryProvider } from "./GalleryContext";
import "./App.css";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import Navigation from "./Navigation";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");

  return (
    <GalleryProvider>
      <div>
        <Navigation setCurrentPage={setCurrentPage} />
        {currentPage === "home" ? <HomePage /> : <HistoryPage />}
      </div>
    </GalleryProvider>
  );
};

export default App;
