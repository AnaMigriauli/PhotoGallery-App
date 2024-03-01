import React from "react";
interface NavigationProps {
  setCurrentPage: (page: string) => void;
}
const Navigatin: React.FC<NavigationProps> = ({ setCurrentPage }) => {
  return (
    <nav>
      <button onClick={() => setCurrentPage("home")}>Home</button>
      <button onClick={() => setCurrentPage("history")}>History</button>
    </nav>
  );
};

export default Navigatin;
