// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GalleryProvider } from "./GalleryContext";
import "./App.css";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import Navigation from "./Navigation";

// const queryClient = new QueryClient();

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");

  return (
    // <QueryClientProvider client={queryClient}>
    <GalleryProvider>
      <div>
        <Navigation setCurrentPage={setCurrentPage} />
        {currentPage === "home" ? <HomePage /> : <HistoryPage />}
      </div>
    </GalleryProvider>
    // <ReactQueryDevtools initialIsOpen={false} />
    // </QueryClientProvider>
  );
};

export default App;
