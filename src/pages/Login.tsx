import React, { useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';
import LoginPage from '../components/LoginPage';
import LayoutPage from '../components/LayoutPage';

const Tab1: React.FC = () => {

  useEffect(() => {
    const ionPages = document.querySelectorAll('.ion-page');
    ionPages.forEach(ionPage => {
      // Elimina la clase 'ion-page-invisible' de todos los elementos con clase 'ion-page'
      ionPage.classList.remove('ion-page-invisible', 'ion-page-hidden');
    });
  }, []);

  return (
    <IonPage>
      <LayoutPage>
        <LoginPage />
      </LayoutPage>
    </IonPage>
  );
};

export default Tab1;
