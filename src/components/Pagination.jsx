import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="d-flex justify-content-center my-4" aria-label="Destinations Pagination">
      <ul className="pagination pagination-md shadow-sm rounded-pill p-1 bg-surface border" style={{ backgroundColor: 'var(--tv-bg-surface)', borderColor: 'var(--tv-border)' }}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-item border-0 bg-transparent text-primary px-3 py-2" onClick={() => onPageChange(currentPage - 1)}>
            <i className="bi bi-chevron-left"></i> Prev
          </button>
        </li>

        {startPage > 1 && (
          <li className="page-item">
            <button className="page-item border-0 bg-transparent text-body px-3 py-2" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        )}

        {startPage > 2 && <li className="page-item disabled px-2 py-2 text-muted">...</li>}

        {pages.map((p) => (
          <li key={p} className={`page-item ${currentPage === p ? 'active' : ''}`}>
            <button
              className={`page-item border-0 rounded-circle px-3 py-2 font-weight-bold ${
                currentPage === p ? 'bg-primary text-white' : 'bg-transparent text-body'
              }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          </li>
        ))}

        {endPage < totalPages - 1 && <li className="page-item disabled px-2 py-2 text-muted">...</li>}

        {endPage < totalPages && (
          <li className="page-item">
            <button className="page-item border-0 bg-transparent text-body px-3 py-2" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        )}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-item border-0 bg-transparent text-primary px-3 py-2" onClick={() => onPageChange(currentPage + 1)}>
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
