import React, { useState } from "react";

interface PaginatonProps {
  IncomingTotalPages: number;
  handlePageChange: (newValue: number) => void;
}

export function Pagination({
  IncomingTotalPages,
  handlePageChange,
}: PaginatonProps) {
  const totalPages = IncomingTotalPages; // Total number of pages
  const [activePage, setActivePage] = useState(1);

  const getStartPage = () => {
    const middlePage = Math.floor(visiblePages / 2);
    return Math.max(activePage - middlePage, 1);
  };
  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
    handlePageChange(pageNumber);
  };

  const visiblePages = 6; // Number of visible page numbers
  const startPage = getStartPage();
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  const renderButtons = () => {
    const buttons = [];

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      buttons.push(
        <button
          key={pageNumber}
          className={`join-item btn ${
            activePage === pageNumber ? "btn-active" : ""
          }`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="join">
      {activePage > 6 && (
        <button className="join-item btn" onClick={() => handlePageClick(1)}>
          First
        </button>
      )}
      {activePage > 1 && (
        <button
          className="join-item btn"
          onClick={() => handlePageClick(activePage - 1)}
        >
          «
        </button>
      )}
      {renderButtons()}
      <button className="join-item btn">...</button>
      {activePage < totalPages && (
        <button
          className="join-item btn"
          onClick={() => handlePageClick(activePage + 1)}
        >
          »
        </button>
      )}
    </div>
  );
}
