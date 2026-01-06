import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ReviewsWishlist from './pages/ReviewsWishlist';
import CarConfigurator from './pages/CarConfigurator';
import CarConfiguratorAddOns from './pages/CarConfiguratorAddOns';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import Returns from './pages/Returns';
import Dashboard from './pages/Dashboard';
import Utilities from './pages/Utilities';
import B2BExtras from './pages/B2BExtras';
import EmptyStates from './pages/EmptyStates';
import ErrorStates from './pages/ErrorStates';
import Permissions from './pages/Permissions';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.categories} element={<Categories />} />
      <Route path={ROUTES.productList} element={<ProductList />} />
      <Route path={ROUTES.productDetail} element={<ProductDetail />} />
      <Route path={ROUTES.reviews} element={<ReviewsWishlist />} />
      <Route path={ROUTES.configurator} element={<CarConfigurator />} />
      <Route path={ROUTES.configuratorAddOns} element={<CarConfiguratorAddOns />} />
      <Route path={ROUTES.cart} element={<Cart />} />
      <Route path={ROUTES.checkout} element={<Checkout />} />
      <Route path={ROUTES.orderConfirmation} element={<OrderConfirmation />} />
      <Route path={ROUTES.orders} element={<Orders />} />
      <Route path={ROUTES.returns} element={<Returns />} />
      <Route path={ROUTES.dashboard} element={<Dashboard />} />
      <Route path={ROUTES.utilities} element={<Utilities />} />
      <Route path={ROUTES.b2b} element={<B2BExtras />} />
      <Route path={ROUTES.emptyStates} element={<EmptyStates />} />
      <Route path={ROUTES.errors} element={<ErrorStates />} />
      <Route path={ROUTES.permissions} element={<Permissions />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
};

export default App;
