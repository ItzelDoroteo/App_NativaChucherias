import { IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import LayoutPage from '../components/LayoutPage';
import ListaProductos from '../components/ListaProductos';
import CategoryCards from '../components/CategoryCards';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <LayoutPage>
        <CategoryCards />
      </LayoutPage>
    </IonPage>
  );
};

export default Tab2;
