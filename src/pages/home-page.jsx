import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/actions/products-actions';
import { useTranslation } from 'react-i18next';
import NavMenu from '../components/nav-menu/';
import Sidebar from '../components/sidebar';
import Product from '../components/product/';
import ProductSlider from '../components/product-slider/';
import ColumnsLayout from '../layouts/columns-layout';

const HomePage = ({ watched, favourites, getProducts }) => {

  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const [watchedProducts, setWatchedProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const handleFetchFavouriteProducts = async () => {
      const products = await getProducts({ 
        callback: (products) => favourites.map((f) => products.find((p) => p.id === f))
      });

      setFavouriteProducts(products);
    };
    handleFetchFavouriteProducts();
  }, [favourites]);

  useEffect(() => {
    const handleFetchWatchedProducts = async () => {
      const products = await getProducts({ 
        callback: (products) => watched.map((w) => products.find((p) => p.id === w))
      });

      setWatchedProducts(products);
    };
    handleFetchWatchedProducts();
  }, [watched]);

  const sliderBreakpoints = {
    400: { slidesPerView: 2 },
    540: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
    1440: { slidesPerView: 6 },
  };

  return (
    <>
      <ColumnsLayout>
        <Sidebar>
          <NavMenu 
            classList={'nav-menu--grey-bg'} 
            items={[
              { label: t('interface.navigation.categories.notebooks'), path: '/catalog/notebooks' },
              { label: t('interface.navigation.categories.tshirts'), path: '/catalog/tshirts' }
            ]}
          />
        </Sidebar>

        <div className="main-content">
          <h1 className="pt-1">
            { t('interface.headings.home.main') }
          </h1>

            <ProductSlider
              heading={ t('interface.headings.favourites') }
              breakpoints={sliderBreakpoints}
            >
              {
                favouriteProducts.map((item) => (
                  <Product 
                    {...item}
                    key={item.id}
                    classList={'product--wishlist'}
                  />
                ))
              }
            </ProductSlider>

            <ProductSlider
              heading={ t('interface.headings.watched') }
              breakpoints={sliderBreakpoints}
            >
              {
                watchedProducts.map((item) => (
                  <Product 
                    {...item}
                    key={item.id}
                  />
                ))
              }
            </ProductSlider>
        </div>
      </ColumnsLayout>
    </>
  );
};

const mapStateToProps = ({ 
  products: { items }, 
  user: { account: { favourites, watched } } }
) => ({
  favourites, items, watched
});

const mapDispatchToProps = {
  getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
