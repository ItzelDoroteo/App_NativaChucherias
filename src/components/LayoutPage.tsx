import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonRouterLink, IonBadge } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import './LayoutPage.css';
import './CustomMenu.css';
import { useCart } from '../contexts/CartContext'; // Asegúrate de que la ruta sea correcta

interface LayoutPageProps {
  children: React.ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  const { cart } = useCart(); // Obtiene el carrito desde el contexto
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0); // Calcula el total de items en el carrito

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="custom-toolbar">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonSearchbar placeholder="Buscar productos" animated={true} />
            <IonButtons slot='end' className='icon-container'>
              <IonRouterLink routerLink="/cart" color={'dark'} >
                <IonIcon className='icon-header' icon={cartOutline} />
                {/* Indicador de cantidad */}
                {totalItems > 0 && (
                  <IonBadge color="danger" className="cart-badge">
                    {totalItems}
                  </IonBadge>
                )}
              </IonRouterLink>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* Aquí se renderizará el componente hijo */}
          {children}
        </IonContent>
      </IonPage>
    </>
  );
}

export default LayoutPage;
