import React, { useEffect, useState } from 'react';
import Pagination from '../pagination';
import { createMultyArray } from '../../utils';

const withPagination = () => (Component) => {
  return function WithPagination (props) {

    const [currentPage, setCurrentPage] = useState(0);
    const { items, itemsPerPage, error } = props;

    const dataChunks = createMultyArray(items, itemsPerPage);
    const pagesCount = dataChunks.length;

    useEffect(() => {
      setCurrentPage(0);
    }, [itemsPerPage, dataChunks.length]);

    const handlers = {
      handleNext: () => !(currentPage >= pagesCount - 1) && setCurrentPage((p) => p + 1),
      handlePrev: () => !(currentPage <= 0) && setCurrentPage((p) => p - 1),
      handlePage: (idx) => setCurrentPage(idx),
    }

    return (
      <div>
        <Component 
          {...props} 
          items={dataChunks[currentPage]}
        />

        {
          !!dataChunks.length && !error &&
          <Pagination 
            {...handlers} 
            pagesCount={pagesCount} 
            currentPage={currentPage} 
          />
        }
      </div>
    );
  } 
};

export default withPagination;
