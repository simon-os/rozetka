import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateFilters } from '../../store/actions/filters-actions';
import { useTranslation } from 'react-i18next';
import { PRICE_RANGE } from '../../constants';
import withDatabaseService from '../hoc/with-database-service';
import RangeSlider from 'rsuite/RangeSlider';

/*
  Slider from 'rsuite' library 
  does not support touch events.
  This hook adds it manually.
*/
const useSimulateSliderTouch = (rangeSliderRef) => {
  
  useEffect(() => {
    const handles = [...rangeSliderRef.current.getElementsByClassName(
      'rs-slider-handle',
    )];

    const simulateTouchListener = (handle, mouseEvent, eventDataProp, e) => {
      const mouseDownEvent = new MouseEvent(mouseEvent, {
        bubbles: e.bubbles,
        button: 0,
        cancelable: e.cancelable,
        clientX: e[eventDataProp][0].clientX,
        clientY: e[eventDataProp][0].clientY,
        screenX: e[eventDataProp][0].screenX,
        screenY: e[eventDataProp][0].screenY,
      });

      handle.dispatchEvent(mouseDownEvent);
    }

    handles.forEach((handle) => {
      handle.addEventListener(
        'touchstart', 
        simulateTouchListener.bind(null, handle, 'mousedown', 'touches')
      );
      handle.addEventListener(
        'touchmove', 
        simulateTouchListener.bind(null, handle, 'mousemove', 'touches')
      );
      handle.addEventListener(
        'touchend', 
        simulateTouchListener.bind(null, handle, 'mouseup', 'changedTouches')
      );
    })

    return () => {
      handles.forEach((handle) => {
        handle.removeEventListener('touchstart', simulateTouchListener);
        handle.removeEventListener('touchmove', simulateTouchListener);
        handle.removeEventListener('touchend', simulateTouchListener);
      })
    }
  }, [rangeSliderRef]);
};

const getPriceRange = (activeFilters) => {
  if (!activeFilters.length) return;

  const range = activeFilters.find((f) => f.type === PRICE_RANGE)?.data[0];
  return range || [0, 0];
};

const PriceFilter = ({ classList, activeFilters, updateFilters, priceMax }) => {

  const priceRange = getPriceRange(activeFilters) || [0, 0]; 
  const [sliderValues, setSliderValues] = useState([priceRange[0], priceRange[1]]); 
  const { t } = useTranslation();
  const rangeSliderRef = useRef();
  useSimulateSliderTouch(rangeSliderRef);
  
  const updatePrice = (values) => {
    setSliderValues(values);
    updateFilters({ type: PRICE_RANGE, value: values });
  };

  useEffect(() => {
    if (priceRange[0] === 0 && priceRange[1] === 0 && priceMax !== 0) {
      updatePrice([0, priceMax]);
    }
  }, [priceRange]);

  useEffect(() => {
    updatePrice([priceRange[0], priceRange[1] || priceMax]);
  }, [priceMax]);

  const handleSubmitPriceRange = (ev) => {  
    ev?.preventDefault();

    const min = sliderValues[0];
    let max = sliderValues[1];
    
    if (max < min) {
      max = min;
    }
    else if (max > priceMax) {
      max = priceMax;
    }
    updatePrice([min, max]);
  };

  return (
    <>
      <form 
        className={'price-filter' + (classList ? ' '+classList : '')} 
        onSubmit={handleSubmitPriceRange}
      >
        <p className="filter__header">
          { t('interface.filters.price') }
        </p>

        <div className="price-filter__row">
          <div className="price-filter__range">
            <input 
              className="price-filter__input"
              type="text"
              pattern="[0-9]*" 
              value={sliderValues[0]}
              onChange={(ev) => {
                const value = +ev.target.value;
                const min = isNaN(value) ? 0 : value;
                setSliderValues([min, sliderValues[1]]);
              }}
            />
            -
            <input
              className="price-filter__input"
              type="text"
              pattern="[0-9]*" 
              value={sliderValues[1]}
              onChange={(ev) => {
                const value = +ev.target.value;
                const max = isNaN(value) ? 0 : value;
                setSliderValues([sliderValues[0], max]);
              }}
            />
          </div>

          <button className="price-filter__submit">OK</button>
        </div>

        <RangeSlider 
          ref={rangeSliderRef}
          value={sliderValues}
          onChange={setSliderValues}
          tooltip={false}
          max={priceMax}
        />
      </form>
    </>
  );
};

const mapStateToProps = ({ filters: { activeFilters } }) => ({
  activeFilters
});

const mapDispatchToProps = {
  updateFilters
};

export default compose(
  withDatabaseService(),
  connect(mapStateToProps, mapDispatchToProps)
)(memo(PriceFilter));
