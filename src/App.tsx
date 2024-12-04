import React, { useState, useEffect } from 'react';
import { IonApp, IonContent, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { setupIonicReact } from '@ionic/react';
import { Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Elements } from '@stripe/react-stripe-js'; // Importar Elements
import { loadStripe } from '@stripe/stripe-js'; // Importar loadStripe
import { SplashScreen } from '@capacitor/splash-screen'; // Importar el plugin de Splash Screen

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// Carga tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Pf8IA2NI1ZNadeOLivsZnTK9wtGno4CEo8viraLEc0NBdl9CFbhubTvVVuo7gpznAfJt6mqR10IhaeVQQNutEQ500WkPoYuht');

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Mostrar la pantalla de inicio
    SplashScreen.show();

    // Simulamos la carga de la aplicación (esto puede ser reemplazado por procesos reales como carga de datos, etc.)
    const loadApp = async () => {
      // Simulación de un tiempo de espera (por ejemplo, cargando recursos)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Espera de 2 segundos

      // Una vez que la app está lista, ocultamos la pantalla de carga
      setIsLoading(false);
      SplashScreen.hide(); // Ocultar la pantalla de carga de Capacitor
    };

    loadApp();

    return () => {
      SplashScreen.hide(); // Limpiar la pantalla de carga cuando el componente se desmonte
    };
  }, []);

  // Si la aplicación sigue cargando, mostramos la pantalla de carga
  if (isLoading) {
    return (
      <IonApp>
        <IonContent className="ion-padding ion-text-center">
          {/* Logo de la app en el centro */}
          <img src="/assets/Images/ChucheriasRegalos.jpg" alt="Logo de la app" style={{ maxWidth: '65%', height: 'auto' }} /><br/>
          <IonSpinner name="crescent" /> {/* Spinner de carga */}
        </IonContent>
      </IonApp>
    );
  }

  // Si ya terminó de cargar, mostramos la app principal
  return (
    <IonApp>
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <IonReactRouter>
              <Route path="/" component={MainLayout} exact={false} />
            </IonReactRouter>
          </Elements>
        </CartProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
