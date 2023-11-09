import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateCartItem, getCartItems } from '../../store/actions/user-actions';
import { calculateTotalPrice, formatPrice } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../store/actions/products-actions';
import { useTranslation } from 'react-i18next';
import CenteredLayout from '../../layouts/centered-layout/';

const CartItem = ({ 
  image, price, category,
  updateCartItem, id, quantity
}) => {

  const { t } = useTranslation();

  const handleAddItem = () => {
    updateCartItem({ id, price, quantity: 1 });
  };

  const handleRemoveItem = () => {
    updateCartItem({ id, price, quantity: -1 });
  };

  const handleRemoveAllItems = () => {
    updateCartItem({ id, price, quantity: -quantity });
  };

  return (
    <div className="cart-item">
      <Link className="cart-item__image-link" to={`/catalog/${category}/${id}`}>
        <picture className="cart-item__image">
          <img src={image} alt={ t(`products.${category}.${id}.title`) } />
        </picture>
      </Link>

      <Link className="cart-item__title link link--black" to={`/catalog/${category}/${id}`}>
        { t(`products.${category}.${id}.title`) }
      </Link>

      <div className="flex-break"></div>

      <div className="cart-item__quantity">
        <button 
          className="cart-item__quantity-button"
          onClick={handleRemoveItem}
        >
          -
        </button>

        <div className="cart-item__quantity-number">
          {quantity}
        </div>

        <button 
          className="cart-item__quantity-button"
          onClick={handleAddItem}
        >
          +
        </button>
      </div>

      <p className="cart-item__price">
        { formatPrice(price * quantity) }
        <span> ₴</span>
      </p>

      <button 
        className="cart-item__remove-button"
        onClick={handleRemoveAllItems}
      >
        x
      </button>
    </div>
  );
};

const ShoppingCartPage = ({ 
  items, getProducts,
  updateCartItem, getCartItems
 }) => {

  const [cartItems, setCartItems] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetCartItems = async () => {
      setCartItems(
        await getCartItems(getProducts)
      );
    };
    handleGetCartItems();
  }, [items]);

  const handleSubmitOrder = () => {
    if (!cartItems.length) return;
    navigate('/order-details');
  };

  const total = calculateTotalPrice(items);

  return (
    <CenteredLayout>
      <div className="shopping-cart">
        <div className="shopping-cart__items">
          {
            cartItems.length 
              ? cartItems.map((item) => 
                  <CartItem key={item.id} {...item} updateCartItem={updateCartItem} />)
              : t('interface.messages.noItemsInShoppingCart')
          }
        </div>

        <div className="centered-layout__bottom-row">
          <button className="link link--black link--underline" onClick={() => navigate('/')}>
            { t('interface.buttons.continueShopping') }
          </button>

          <div className="cart-total">
            {
              total > 0 
              && <>
                <div>
                  { formatPrice(calculateTotalPrice(items)) }
                  <span> ₴</span>
                </div> 

                <button 
                  className="button"
                  onClick={handleSubmitOrder}
                >
                  { t('interface.pagesContent.сheckout') }
                </button>
              </>
            } 
          </div>
        </div>
      </div>
    </CenteredLayout>
  );
};

const mapStateToProps = ({ 
  user: { account: { id: userId, shoppingCart: items } } 
}) => ({
  items, userId
});

const mapDispatchToProps = {
  updateCartItem,
  getProducts,
  getCartItems
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);
