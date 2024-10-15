import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import './LayoutPage.css'
import './CustomMenu.css'

interface LayoutPageProps {
  children: React.ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="custom-toolbar">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonSearchbar placeholder="Buscar productos" className='input-search' />
            <IonButtons slot='end' className='icon-container'>
              <IonIcon className='icon-header' icon={cartOutline} />
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
