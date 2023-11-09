import { useEffect, useState } from 'react';
import { SEARCH_QUERY } from '../constants';

const useGetSearchQuery = (activeFilters) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const queryFilter = activeFilters?.find((f) => f.type === SEARCH_QUERY);
    const query = queryFilter?.data[0] || '';
    setSearchQuery(query);
  }, [activeFilters]);

  return searchQuery;
};

export default useGetSearchQuery;
