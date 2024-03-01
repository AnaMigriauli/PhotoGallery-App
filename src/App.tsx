import "./App.css";
import { useState } from "react";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import Navigatin from "./Navigation";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  return (
    <div>
      <Navigatin setCurrentPage={setCurrentPage} />
      {currentPage === "home" ? <HomePage /> : <HistoryPage />}
    </div>
  );
};

export default App;
