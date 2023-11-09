import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/products-actions';
import { useTranslation } from 'react-i18next';
import Product from '../../components/product';

const FavouritesList = ({ title, favourites, getProducts }) => {

  const { t } = useTranslation();
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  
  useEffect(() => {
    const handleGetProducts = async () => {
      const products = await getProducts({
        callback: (products) => favourites.map((f) => products.find((p) => p.id === f))
      });
      setFavouriteProducts(products);
    };
    handleGetProducts();
  }, [favourites]);

  return (
    <>
      <h1>
        { t('interface.headings.cabinet.favourites') || title }
      </h1>

      <div className="products-layout favourites">
        {
          favouriteProducts.map((p) => 
            <Product 
              classList="product--wishlist" 
              key={p.id}  
              {...p}
            />
          )
        }
      </div>
    </>
  );
};

const mapStateToProps = ({ user: { account: { favourites } } }) => ({
  favourites
});

const mapDispatchToProps = {
  getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesList);
