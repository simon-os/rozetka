import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems, clearShoppingCart } from '../../store/actions/user-actions';
import { getProducts } from '../../store/actions/products-actions';
import { calculateTotalPrice, formatPrice } from '../../utils';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import Input from '../../components/input';
import CenteredLayout from '../../layouts/centered-layout';
import withDatabaseService from '../../components/hoc/with-database-service';

const OrderItem = ({ price, quantity, id, category }) => {

  const { t } = useTranslation();

  return (
    <div className="order-item">
      <p className="order-item__title">
        { t(`products.${category}.${id}.title`) }
      </p>

      <p className="order-item__quantity">
        {quantity}
      </p>

      <p className="order-item__price">
        { formatPrice(price * quantity) }
        <span> ₴</span>
      </p>
    </div>
  );
};

const OrderDetailsPage = ({ 
  items, databaseService, id, isAuthed,
  getCartItems, getProducts, clearShoppingCart
 }) => {

  const [orderItems, setOrderItems] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!items.length) navigate('/shopping-cart');

    const handleGetCartItems = async () => {
      const data = await getCartItems(getProducts);
      setOrderItems(data);
    };
    handleGetCartItems();
  }, []);
  
  const handleSubmitOrder = (ev) => {
    ev.preventDefault();

    if (isAuthed) {
      const formData = new FormData(ev.target);
    
      const order = {
        id: Date.now(),
        date: new Date(),
        items: [
          ...orderItems
        ],
        delivery: {
          name: formData.get('name'),
          email: formData.get('email'),
          tel: formData.get('tel'),
          country: formData.get('country'),
          city: formData.get('city'),
          addressLine: formData.get('address-line'),
        }
      }

      databaseService.setUserField(id, `orders/${order.id}`, order);
      databaseService.setUserField(id, 'shoppingCart', null);
    }

    clearShoppingCart();
    navigate('/thank-you');
  };

  return (
    <CenteredLayout>
      <form className="order-details" onSubmit={handleSubmitOrder}>

        <div className="order-details__layout">
          <div className="order-details__row">
            <div className="order-details__col">
              <h4>
                { t('interface.pagesContent.yourInfo') }
              </h4>

              <Input
                id="name"
                label={ t('interface.forms.nameSurname') }
                autoComplete="name"
                required
              />

              <Input
                id="email"
                label="E-mail"
                autoComplete="email"
                required
              />

              <Input
                id="tel"
                label={ t('interface.forms.phoneNumber') }
                autoComplete="tel"
                required
              />
            </div>

            <div className="order-details__col">
              <h4>
                { t('interface.pagesContent.delivery') }
              </h4>

              <Input
                id="country"
                label={ t('interface.forms.country') }
                autoComplete="country-name"
                required
              />

              <Input
                id="city"
                label={ t('interface.forms.city') }
                autoComplete="address-level1"
                required
              />

              <Input
                id="address-line"
                label={ t('interface.forms.streetHouse') }
                autoComplete="address-line1"
                required
              />
            </div>
          </div>

          <div className="order-details__summary">
            <h4>
              { t('interface.pagesContent.order') }
            </h4>

            {
              orderItems.map((item) => <OrderItem key={item.id} {...item} />)
            }
          </div>
        </div>

        <div className="centered-layout__bottom-row">
          <button 
            type="button" 
            className="link link--black link--underline" 
            onClick={() => navigate(-1)}
          >
            { t('interface.buttons.back') }
          </button>

          <div className="cart-total">
            <div>
              { formatPrice(calculateTotalPrice(items)) }
              <span> ₴</span>
            </div> 

            <button 
              className="button" 
              type="submit"
            >
              { t('interface.buttons.confirm') }
            </button>
          </div>
        </div>
      </form>
    </CenteredLayout>
  );
};

const mapStateToProps = ({ 
  user: { account: { id, isAuthed, shoppingCart: items } }
}) => ({
  id, isAuthed, items
});

const mapDispatchToProps = {
  getProducts,
  getCartItems,
  clearShoppingCart
};

export default compose(
  withDatabaseService(),
  connect(mapStateToProps, mapDispatchToProps)
)(OrderDetailsPage);
