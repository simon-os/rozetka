import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/products-actions';
import { 
  addToWatched, 
  toggleFavourite
} from '../../store/actions/user-actions';
import { formatPrice, isFavourite } from '../../utils';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/spinner';
import ErrorIndicator from '../../components/error-indicator';
import AddToCart from '../../components/add-to-cart';
import AddToFavourites from '../../components/add-to-favourites';
import Breadcrumbs from '../../components/breadcrumbs';
import ProductSlider from '../../components/product-slider';

const FeatureRow = ({ id, category, type }) => {
  
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        { t(`interface.filters.${type}`) }
      </td>
      <td>
        { t(`products.${category}.${id}.features.${type}`) }
      </td>
    </tr>
  )
};

const ProductPage = ({
  loading, error, favourites, 
  toggleFavourite, addToWatched, getProducts
}) => {

  const [item, setItem] = useState(null);
  const { t } = useTranslation();
  const id = +useParams().id;

  useEffect(() => {
    addToWatched(id);
  }, []);

  useEffect(() => {
    const handleFetchItems = async () => {
      const item = await getProducts({ id });
      setItem(item);
    };
    handleFetchItems();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator text={ t('interface.messages.errorItemCannotBeLoaded') } />;
  }

  if (!item) {
    return null;
  }

  const { 
    image, title, price, 
    features, category, gallery 
  } = item;

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs />
      </div>

      <div className="container">
        <div className="product-page__inner">
          <div className="product-page__col product-page__col-left">
            {
              gallery 
                ? (<ProductSlider 
                    loop
                    simulateTouch
                    classList="product-page__slider"
                  >
                    {
                      gallery.map((path) => (
                        <picture className="product-page__image" key={path}>
                          <img src={ path } alt={ t(`products.${category}.${id}.title`) } />
                        </picture>
                      ))
                    }
                  </ProductSlider>)
                : (<picture className="product-page__image">
                    <img src={ image } alt={ t(`products.${category}.${id}.title`) } />
                  </picture>)
            }
          </div>

          <div className="product-page__col product-page__col-right">
            <h1 className="product-page__heading">
              { t(`products.${category}.${id}.title`) }
            </h1>

            <div className="product-page__row">
              <div className="price product-page__price">
                { formatPrice(price) }<small> ₴</small>
              </div>

              <AddToCart item={{ id, image, title, price }} />

              <AddToFavourites 
                classList="product-page__add-to-favourites"
                toggleFavourite={() => toggleFavourite(id)} 
                isFavourite={isFavourite(favourites, id)}
              />
            </div>

            <div className="product-page__description">
              <h4 className="product-page__subheading">
                { t('interface.headings.description') }
              </h4>

              <p>
                { t(`products.${category}.${id}.description`) }
              </p>
            </div>

            {
              features &&
              <div className="product-page__features">
                <h4 className="product-page__subheading">
                  { t('interface.headings.features') }
                </h4>

                <table>
                  <tbody>
                    {
                      features.map((feature) => (
                        <FeatureRow 
                          {...feature} 
                          id={id}
                          category={category}
                          key={feature.type} 
                        />
                      ))
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ 
  products: { loading, error }, 
  user: { account: { favourites } } 
}) => ({
  favourites, loading, error
});

const mapDispatchToProps = {
  toggleFavourite,
  addToWatched,
  getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
