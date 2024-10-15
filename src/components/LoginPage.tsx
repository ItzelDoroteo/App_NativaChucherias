// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonAlert, IonPage, IonInputPasswordToggle  } from '@ionic/react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        correo,
        contraseña,
      });

      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        setAlertMessage(response.data.message);

        // Redirigir a la página principal después de 3 segundos
        setTimeout(() => {
          setShowAlert(false);
          history.push('/');
        }, 3000);
      }
    } catch (error: any) {
      if (error.response) {
        setAlertMessage(error.response.data.error);
      } else {
        setAlertMessage('Error desconocido. Inténtalo más tarde.');
      }
    } finally {
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonInput
          placeholder="Correo"
          value={correo}
          onIonChange={(e) => setCorreo(e.detail.value!)}
        />
        <IonInput placeholder="Contraseña"
          type="password"
          value={contraseña}
          onIonChange={(e) => setContraseña(e.detail.value!)}>
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>
        <IonButton expand="full" onClick={handleLogin}>Iniciar Sesión</IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Inicio de Sesión"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
