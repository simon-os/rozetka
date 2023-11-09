import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { formatPrice, isFavourite } from '../../utils';
import { toggleFavourite } from '../../store/actions/user-actions';
import AddToCart from '../add-to-cart';
import AddToFavourites from '../add-to-favourites/';

const Product = ({ 
  classList, id, image, title, category,  
  price, toggleFavourite, favourites, 
}) => {

  const { t } = useTranslation();

  return (
    <div className={'product' + (classList ? ' '+classList : '')}>
      <div className="product__inner">
        <AddToFavourites 
          classList="product__add-to-favourites"
          toggleFavourite={() => toggleFavourite(id)} 
          isFavourite={isFavourite(favourites, id)}
        />

        <Link className="product__image-link" to={`/catalog/${category}/${id}`}>
          <picture className="product__image">
            <img src={ image } alt={ title } />
          </picture>
        </Link>

        <Link className="product__title" to={`/catalog/${category}/${id}`}>
          { t(`products.${category}.${id}.title`) }
        </Link>

        <div className="product__bottom-row">
          <div className="price product__price">
            { formatPrice(price) }<small> ₴</small>
          </div>

          <AddToCart 
            layout={'icon'} 
            item={{ id, image, title, price }}
          />
        </div>
      </div>

      {
        <div className="product__full-description">
          <p className="product__description">
            { t(`products.${category}.${id}.description`) }
          </p>
        </div>
      }
    </div>
  );
};

const mapStateToProps = ({ user: { account: { favourites } } }) => ({
  favourites,
});

const mapDispatchToProps = {
  toggleFavourite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
