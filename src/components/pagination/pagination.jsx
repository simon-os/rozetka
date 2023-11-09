import React from 'react';

const Pagination = ({ 
  handleNext, handlePrev, handlePage, 
  currentPage, pagesCount = 1 
}) => {
  
  return (
    <div className="pagination">
      <div className="pagination__inner">
        <button className="pagination__item" onClick={handlePrev}>{'<'}</button>
        { 
          new Array(pagesCount).fill('').map((_, idx) => (
            <button 
              className={"pagination__item" + (currentPage === idx ? ' active' : '')}
              onClick={() => handlePage(idx)}
              key={idx}
            >
              {idx + 1}
            </button>
          ))
        }
        <button className="pagination__item" onClick={handleNext}>{'>'}</button>
      </div>
    </div>
  );
};

export default Pagination;
