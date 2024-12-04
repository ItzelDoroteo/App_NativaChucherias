import { useEffect } from 'react';
import { IonPage, IonText } from '@ionic/react';
import './Tab3.css';
import LayoutPage from '../components/LayoutPage';
import UserProfile from '../components/UserProfile';

const Tab3: React.FC = () => {
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
        <UserProfile />
      </LayoutPage>
    </IonPage>
  );
};

export default Tab3;
