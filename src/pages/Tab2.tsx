import { useEffect } from 'react';
import { IonPage, IonChip } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import LayoutPage from '../components/LayoutPage';
import ListaProductos from '../components/ListaProductos';
import CategoryCards from '../components/CategoryCards';

const Tab2: React.FC = () => {
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
        <IonChip outline={true} className='margin-top' >Categorias disponibles</IonChip>
        <CategoryCards />
      </LayoutPage>
    </IonPage>
  );
};

export default Tab2;
