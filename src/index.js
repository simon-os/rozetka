import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { DatabaseServiceProvider } from './context/database-service-context';
import { NotificationServiceProvider } from './context/notification-service-context';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store';
import { 
  PersonalCabinet, 
  FavouritesList, 
  ProfileSettings, 
  OrdersList 
} from './pages/personal-cabinet';
import { Slide, ToastContainer } from 'react-toastify';
import App from './App';
import AppSpinner from './components/app-spinner';
import NotificationService from './services/notification-service';
import HomePage from './pages/home-page';
import ErrorPage from './pages/error-page';
import CatalogPage from './pages/catalog-page';
import ProductPage from './pages/product-page/';
import CatalogNavPage from './pages/catalog-nav-page';
import DatabaseService from './services/database-service';
import ShoppingCartPage from './pages/shopping-cart-page/';
import OrderDetailsPage from './pages/order-details-page/';
import ThankYouPage from './pages/thank-you-page/thank-you-page';
import './i18n';
import './firebase';
import './index.scss';

const databaseService = new DatabaseService();
const notificationService = new NotificationService();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <HomePage />
      },
      {
        path: "catalog/",
        element: <CatalogNavPage />,
      },
      {
        path: "catalog/:category",
        element: <CatalogPage />,
      },
      {
        path: "catalog/:category/:id",
        element: <ProductPage />,
      },
      {
        path: "shopping-cart",
        element: <ShoppingCartPage />,
      },
      {
        path: "order-details",
        element: <OrderDetailsPage />,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "personal-cabinet/",
        element: <PersonalCabinet />,
        children: [
          { 
            index: true, 
            element: <ProfileSettings />
          },
          { 
            path: "orders",
            element: <OrdersList />
          },
          { 
            path: "favourites",
            element: <FavouritesList />
          },
        ]
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <DatabaseServiceProvider value={databaseService}>
      <NotificationServiceProvider value={notificationService}>
        <Suspense fallback={<AppSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </NotificationServiceProvider>
    </DatabaseServiceProvider>

    <ToastContainer 
      transition={Slide}
      autoClose={3000} 
      limit={3} 
    />
  </Provider>
);
