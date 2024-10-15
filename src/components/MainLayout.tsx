import React, { useState } from 'react';
import { IonContent, IonHeader, IonMenu, IonMenuToggle, IonToolbar, IonTitle, IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonCol, IonRow, IonImg, IonItem, IonList, IonAlert, IonRouterLink, IonLoading } from '@ionic/react';
import { home, list, person, logIn, logOut } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login';
import CategoryProducts from '../pages/CategoryProducts';
import DetalleProducto from '../pages/DetalleProducto';
import { useAuth } from '../contexts/AuthContext';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); // Controla el estado del spinner
  const history = useHistory();

  const cierreSession = async () => {
    try {
      logout();
    } catch (error: any) {
      console.log(error);
    } finally {
      setShowAlert(true);
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
          <IonToolbar>
            <IonRouterLink routerLink="/tab3" className='content'>
              <IonRow className='content'>
                <IonCol size='8'>
                  <IonTitle>{user ? `${user.nombre} ${user.aPaterno}` : 'Usuario'}</IonTitle>
                </IonCol>
                <IonCol size='4'>
                  <IonImg src={user ? user.imagen : "/assets/Images/user.jpg"} className='img-user' alt="Usuario logo" />
                </IonCol>
              </IonRow>
            </IonRouterLink>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
              <IonItem routerLink="/tab3">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Mi cuenta</IonLabel>
              </IonItem>
              {!user ? (
                <IonItem routerLink="/login">
                  <IonIcon icon={logIn} slot="start" />
                  <IonLabel>Iniciar Sesión</IonLabel>
                </IonItem>
              ) : (
                <IonItem button onClick={cierreSession}>
                  <IonIcon icon={logOut} slot="start" />
                  <IonLabel>Cerrar Sesión</IonLabel>
                </IonItem>
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
              {!user && (
                <Redirect to="/login" />
              )}
            </Route>

            <Route exact path="/products/categoria/:categoriaId" component={CategoryProducts} />
            <Route exact path="/product/:productId" component={DetalleProducto} />
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
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={person} />
              <IonLabel>Mi cuenta</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonPage>

      {/* IonAlert para cierre de sesión */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Cierre de Sesión"
        message={`Cierre de sesión exitoso!`}
        buttons={['OK']}
      />

      {/* IonLoading para mostrar el spinner de carga */}
      <IonLoading
        isOpen={loading}
        message={'Cargando...'}
        duration={5000}
      />
    </>
  );
};

export default MainLayout;
