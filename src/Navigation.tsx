import React from "react";
import styled from "styled-components";

interface NavigationProps {
  setCurrentPage: (page: string) => void;
}
const Navigatin: React.FC<NavigationProps> = ({ setCurrentPage }) => {
  return (
    <Nav>
      <button onClick={() => setCurrentPage("home")}>Home</button>
      <button onClick={() => setCurrentPage("history")}>History</button>
    </Nav>
  );
};

export default Navigatin;

const Nav = styled.nav`
  display: flex;
  gap: 50px;
  margin-top: 30px;
  margin-bottom: 20px;

  button {
    background: #add8e6;
    padding: 6px;
    border-radius: 4px;
    border: none;
    font-size: 18px;
    line-height: 20px;
    cursor: pointer;
    color: var(--black);
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid transparent;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        var(--slate-blue),
        rgba(0, 0, 0, 0)
      );
      background-repeat: no-repeat;
      background-size: 100% 1px;
      background-position: 0 bottom;
    }
  }
`;
