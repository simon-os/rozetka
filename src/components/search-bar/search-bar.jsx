import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { updateFilters } from '../../store/actions/filters-actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetSearchQuery } from '../../hooks/';
import { SEARCH_QUERY } from '../../constants';

const SearchBar = ({ classList, activeFilters, updateFilters }) => {

  const [inputVal, setInputVal] = useState('');
  const { category } = useParams();
  const { t } = useTranslation();
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = useGetSearchQuery(activeFilters);

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  const submitHandler = (ev) => {
    ev.preventDefault();

    if (location.pathname.includes(`catalog/${category}/`)) {
      navigate(`catalog/${category}`);
    }

    const { value } = inputRef.current;
    updateFilters({ type: SEARCH_QUERY, value });
  };

  if (!category) {
    return null;
  }

  return (
    <form 
      className={'search-bar' + (classList ? ' '+classList : '')}
      onSubmit={(ev) => submitHandler(ev)}
    >
      <input 
        className="search-bar__input" 
        type="text"
        placeholder={ t('interface.forms.searchBar.placeholder') }
        ref={inputRef} 
        value={inputVal}
        onChange={(ev) => setInputVal(ev.target.value)}
      />

      <button className="search-bar__button">
        { t('interface.buttons.search') }
      </button>
    </form>
  );
};

const mapStateToProps = ({ filters: { activeFilters } }) => ({
  activeFilters 
});

const mapDispatchToProps = {
  updateFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
