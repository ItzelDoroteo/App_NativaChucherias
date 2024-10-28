import React, { useState } from 'react';
import { IonContent, IonHeader, IonMenu, IonMenuToggle, IonToolbar, IonTitle, IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonCol, IonRow, IonImg, IonItem, IonList, IonToast, IonRouterLink, IonLoading, IonAvatar } from '@ionic/react';
import { home, list, person, logIn, logOut, helpCircleOutline, timeOutline, cartOutline } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Tab4 from '../pages/Tab4';
import Login from '../pages/Login';
import CategoryProducts from '../pages/CategoryProducts';
import DetalleProducto from '../pages/DetalleProducto';
import SearchPage from '../pages/SearchPage';
import CartPage from '../pages/CartPage';
import SelectAddress from '../pages/SelectAddress';
import SelectPayment from '../pages/SelectPayment';
import PurchaseHistory from '../pages/PurchaseHistory';
import { useAuth } from '../contexts/AuthContext';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false); // Controla el estado del spinner
  const history = useHistory();

  const cierreSession = async () => {
    try {
      // Llamada a la función de cierre de sesión
      logout();
      
      // Eliminar solo el carrito del localStorage
      localStorage.removeItem('cart');
      
      // Mostrar el toast de éxito de cierre de sesión
      setShowToast(true);
      
      // Redirigir a la página de inicio o login
      history.push('/login');
      
    } catch (error: any) {
      console.log(error);
    }
  };

  // Escuchar cambios en la ruta para controlar el spinner
  history.listen((location, action) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simula un retraso en la carga, ajustable
  });

  return (
    <>
      <IonMenu side="start" contentId="main">
        <IonHeader>
          <IonToolbar className="custom-toolbar">
            <IonImg src={"/assets/Images/Chucherias.png"} className='img-user' alt="Logo chucherias y regalos" />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonToolbar>
            <IonRouterLink routerLink="/tab3">
              <IonItem>
                <IonAvatar slot="start">
                  <img alt="Banner usuario" src={user ? user.imagen : "/assets/Images/user.jpg"} />
                </IonAvatar>
                <IonLabel>{user ? `${user.nombre} ${user.aPaterno}` : 'Iniciar sesión'}</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonToolbar>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink="/tab1">
                <IonIcon icon={home} slot="start" />
                <IonLabel>Inicio</IonLabel>
              </IonItem>
              <IonItem routerLink="/tab2">
                <IonIcon icon={list} slot="start" />
                <IonLabel>Categorías</IonLabel>
              </IonItem>
              <IonItem routerLink="/tab4">
                <IonIcon icon={helpCircleOutline} slot="start" />
                <IonLabel>Ayuda</IonLabel>
              </IonItem>

              {!user ? (
                <IonItem routerLink="/login">
                  <IonIcon icon={logIn} slot="start" />
                  <IonLabel>Iniciar Sesión</IonLabel>
                </IonItem>
              ) : (
                <>
                  <IonItem routerLink="/cart">
                    <IonIcon icon={cartOutline} slot="start" />
                    <IonLabel>Mi carrito</IonLabel>
                  </IonItem>
                  <IonItem routerLink="/purchase-history">
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel>Historial de compras</IonLabel>
                  </IonItem>
                  <IonItem routerLink="/tab3">
                    <IonIcon icon={person} slot="start" />
                    <IonLabel>Mi cuenta</IonLabel>
                  </IonItem>
                  <IonItem button onClick={cierreSession}>
                    <IonIcon icon={logOut} slot="start" />
                    <IonLabel>Cerrar Sesión</IonLabel>
                  </IonItem>
                </>
              )}
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main">
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1" component={Tab1} />
            <Route exact path="/tab2" component={Tab2} />
            <Route exact path="/tab3" component={Tab3}>
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/tab4" component={Tab4} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/select-address" component={SelectAddress} />
            <Route exact path="/select-payment" component={SelectPayment} />
            <Route exact path="/search/:term" component={SearchPage} />
            <Route exact path="/products/categoria/:categoriaId" component={CategoryProducts} />
            <Route exact path="/product/:productId" component={DetalleProducto} />
            <Route exact path="/purchase-history" component={PurchaseHistory} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>Inicio</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={list} />
              <IonLabel>Categorías</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4">
              <IonIcon icon={helpCircleOutline} />
              <IonLabel>Ayuda</IonLabel>
            </IonTabButton>
            {!user ? (
              <IonTabButton tab="tab3" href="/login">
                <IonIcon icon={person} />
                <IonLabel>Iniciar sesión</IonLabel>
              </IonTabButton>
            ) : (
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={person} />
                <IonLabel>Mi cuenta</IonLabel>
              </IonTabButton>
            )}
          </IonTabBar>
        </IonTabs>
      </IonPage>

      {/* IonToast para mostrar mensaje de cierre de sesión */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Cierre de sesión exitoso"
        duration={3000}
      />

      {/* IonLoading para mostrar el spinner de carga */}
      <IonLoading isOpen={loading} message={'Cargando...'} duration={5000} />
    </>
  );
};

export default MainLayout;
