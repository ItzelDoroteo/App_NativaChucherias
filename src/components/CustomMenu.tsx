import React, {useEffect} from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRow, IonCol, IonIcon } from '@ionic/react';
import ListaProductos from './ListaProductos';
import { carSharp, cartOutline } from 'ionicons/icons';
import LayoutPage from './LayoutPage';
import './CustomMenu.css'

function CustomMenu() {
    useEffect(() => {
        const ionPages = document.querySelectorAll('.ion-page');
        ionPages.forEach(ionPage => {
          // Elimina la clase 'ion-page-invisible' de todos los elementos con clase 'ion-page'
          ionPage.classList.remove('ion-page-invisible', 'ion-page-hidden');
        });
      }, []);
    return (
        <>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonSearchbar placeholder="Bucar productos" className='input-search' />
                        <IonButtons slot='end' className='icon-container' >
                            <IonIcon className='icon-header' icon={cartOutline} />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
            </IonPage>
        </>
    );
}

export default CustomMenu;