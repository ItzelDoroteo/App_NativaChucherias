// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonToast, IonPage, IonLabel, IonImg, IonHeader, IonTitle, IonToolbar, IonInputPasswordToggle, IonText } from '@ionic/react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'; // Archivo CSS para los estilos

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
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
        setToastMessage(response.data.message);

        // Redirigir a la página principal después de 3 segundos
        setTimeout(() => {
          setShowToast(false);
          history.push('/');
        }, 3000);
      }
    } catch (error: any) {
      if (error.response) {
        setToastMessage(error.response.data.error);
      } else {
        setToastMessage('Error desconocido. Inténtalo más tarde.');
      }
    } finally {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="login-title">Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* <IonText><h3>Inicie sesión ahora, comencemos con sus compras. ¿No tiene una cuenta?</h3></IonText> */}
        <div className="login-container">
          {/* Imagen o logo de inicio de sesión */}
          <IonImg src="/assets/Images/ChucheriasRegalos.jpg" alt="ChucheriasRegalos" className="login-image" />

          {/* Campo de entrada de correo */}
          <IonLabel>Correo</IonLabel>
          <IonInput
            placeholder="Correo"
            value={correo}
            onIonChange={(e) => setCorreo(e.detail.value!)}
            className="login-input"
            clearInput
          />

          {/* Campo de entrada de contraseña */}
          <IonLabel>Contraseña</IonLabel>
          <IonInput type="password" placeholder="Contraseña" value={contraseña} onIonChange={(e) => setContraseña(e.detail.value!)}
            className="login-input">
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>

          {/* Botón de inicio de sesión */}
          <IonButton expand="block" onClick={handleLogin} className="login-button">
            Iniciar Sesión
          </IonButton>

          {/* Toast de feedback para el usuario */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
            position="top"
            color="primary"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
