// routes.tsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Tab4 from '../pages/Tab4';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CategoryProducts from '../pages/CategoryProducts';
import DetalleProducto from '../pages/DetalleProducto';
import SearchPage from '../pages/SearchPage';
import CartPage from '../pages/CartPage';
import SelectAddress from '../pages/SelectAddress';
import SelectPayment from '../pages/SelectPayment';
import PurchaseHistory from '../pages/PurchaseHistory';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import KeyVerifly from '../pages/KeyVerifly';
import ChangePassword from '../pages/ChangePassword';
import { useAuth } from '../contexts/AuthContext';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Route exact path="/tab1" component={Tab1} />
      <Route exact path="/tab2" component={Tab2} />
      <Route exact path="/tab3">
        {user ? <Tab3 /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/tab4" component={Tab4} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/select-address" component={SelectAddress} />
      <Route exact path="/select-payment" component={SelectPayment} />
      <Route exact path="/search/:term" component={SearchPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/products/categoria/:categoriaId" component={CategoryProducts} />
      <Route exact path="/product/:productId" component={DetalleProducto} />
      <Route exact path="/purchase-history" component={PurchaseHistory} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPasswordPage} />
      <Route exact path="/key-verification/:correo" component={KeyVerifly} />
      <Route exact path="/change-password/:correo" component={ChangePassword} />
      <Route exact path="/">
        <Redirect to="/tab1" />
      </Route>
    </>
  );
};

export default Routes;