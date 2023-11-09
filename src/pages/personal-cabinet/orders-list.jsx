import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/actions/user-actions';
import { Link } from 'react-router-dom';
import { calculateTotalPrice, formatPrice } from '../../utils';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const OrderProduct = ({ id, category, image, price, quantity }) => {

  const { t } = useTranslation();

  return (
    <div className="order-product">
      <Link className="order-product__image-link" to={`/catalog/${category}/${id}`}>
        <picture className="order-product__image">
          <img src={image} alt={ t(`products.${category}.${id}.title`) } />
        </picture>
      </Link>

      <Link className="order-product__title link link--black" to={`/catalog/${category}/${id}`}>
        { t(`products.${category}.${id}.title`) }
      </Link>

      <span className="flex-break"></span>

      <div className="order-product__price">
        { t('interface.pagesContent.price') }:&nbsp;
        <span className="text-black">{ formatPrice(price) } ₴</span> 
      </div>

      <div className="order-product__quantity">
        { t('interface.pagesContent.quantity') }:&nbsp;
        <span className="text-black">{quantity}</span> 
      </div>

      <div className="order-product__sum">
        { t('interface.pagesContent.sum') }:&nbsp;
        <span className="text-black">{ formatPrice(price * quantity) } ₴</span> 
      </div>
    </div>
  );
};

const OrderEntry = ({ date, delivery, id, items }) => {
  
  const { t } = useTranslation();

  const {
    tel, city, country,
    email, name, addressLine
  } = delivery;

  return (
    <div className="order-entry orders__entry">
      <div className="order-entry__info-row">
        № {id}&nbsp;
        { t('interface.pagesContent.from') }&nbsp;
        { new Date(Date.parse(date)).toLocaleString(i18next.language) }
      </div>
      
      <div className="order-entry__layout">
        <div className="order-entry__delivery-info text-black">
          <p>
            <span><b>{ t('interface.pagesContent.deliveryAddress') }:</b></span>
            {city}, {country}
            <br />
            {addressLine}
          </p>

          <p>
            <span>{name}</span>
            <span>{tel} </span>
            <span>{email}</span>
          </p>
        </div>

        <div className="order-entry__products">
          { 
            items.map((item) => (
              <OrderProduct {...item} key={item.id} />
            )) 
          }
        </div>
      </div>

      <div className="order-entry__total-price">
        { t('interface.pagesContent.total') }:&nbsp;
        <span className="text-black">{ formatPrice(calculateTotalPrice(items)) } ₴</span> 
      </div>
    </div>
  );
};

const OrdersList = ({ id, title, orders, getUserInfo }) => {

  const { t } = useTranslation();

  useEffect(() => {
    getUserInfo(id);
  }, []);

  return (
    <>
      <h1>
        { t('interface.headings.cabinet.orders') || title }
      </h1>

      <div className="orders">
        { 
          orders &&
          Object.values(orders).map((order) => (
            <OrderEntry {...order} key={order.id} />
          )) 
        }
      </div>
    </>
  );
};

const mapStateToProps = ({ user: { account: { id, orders } } }) => ({
  id, orders
});

const mapDispatchToProps = {
  getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
