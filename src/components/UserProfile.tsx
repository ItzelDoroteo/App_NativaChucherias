import React, { useState, useEffect } from 'react';
import { IonContent, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonItem, IonLabel, IonInput, IonSpinner, IonToast } from '@ionic/react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  useEffect(() => {
    const ionPages = document.querySelectorAll('.ion-page');
    ionPages.forEach(ionPage => {
      // Elimina la clase 'ion-page-invisible' de todos los elementos con clase 'ion-page'
      ionPage.classList.remove('ion-page-invisible', 'ion-page-hidden');
    });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://backend-c-r-production.up.railway.app/users/${user?.customerId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile && !photo) return;

    const formData = new FormData();
    const fileToUpload = selectedFile || new File([photo!], 'profile.jpg', { type: 'image/jpeg' });
    formData.append('imagen', fileToUpload); // Añadir el archivo de imagen al FormData

    try {
      await axios.put(`https://backend-c-r-production.up.railway.app/users/banner/${user?.customerId}`, formData);
      setShowToast(true); // Mostrar confirmación de éxito
    } catch (error) {
      console.error('Error updating user banner:', error);
    }
  };

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Tomar la foto desde la cámara
      });
      setPhoto(image.webPath); // Guardar la imagen obtenida
    } catch (error) {
      console.error('Error tomando la foto', error);
    }
  };

  const chooseFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Seleccionar desde la galería
      });
      setPhoto(image.webPath); // Guardar la imagen seleccionada
    } catch (error) {
      console.error('Error seleccionando imagen de la galería', error);
    }
  };

  if (loading) {
    return <IonSpinner name="dots" />;
  }

  if (!userData) {
    return <p>Error al cargar el perfil de usuario.</p>;
  }

  return (
    <IonContent>
      <IonCard>
        <IonCardHeader className='content'>
          <IonCardTitle>{user?.nombre} {user?.aPaterno} {user?.aMaterno}</IonCardTitle>
          <IonAvatar className='banner'>
            {/* Mostrar la imagen de la cámara o la que se haya seleccionado */}
            <img src={photo || userData.imagen || '/assets/Images/user.jpg'} alt="Foto del Usuario" />
          </IonAvatar>
        </IonCardHeader>
        <IonCardContent>
          {/* Inputs deshabilitados con la información del usuario */}
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={userData.nombre} disabled />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Correo</IonLabel>
            <IonInput value={userData.correo} disabled />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput value={userData.telefono || 'No especificado'} disabled />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Dirección</IonLabel>
            <IonInput value={userData.direccion || 'No especificada'} disabled />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Fecha de Registro</IonLabel>
            <IonInput value={new Date(userData.createdAt).toLocaleDateString()} disabled />
          </IonItem>

          {/* Opciones para tomar foto o elegir desde la galería */}
          <IonButton expand="block" onClick={takePhoto}>
            Tomar Foto
          </IonButton>
          <IonButton expand="block" onClick={chooseFromGallery}>
            Elegir de la Galería
          </IonButton>

          {/* Selector de archivo para cambiar el banner */}
          <IonItem>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </IonItem>

          <IonButton expand="block" onClick={handleImageUpload} disabled={!selectedFile && !photo}>
            Cambiar imagen de perfil
          </IonButton>
        </IonCardContent>
      </IonCard>

      {/* Toast de confirmación */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Imagen actualizada con éxito"
        duration={2000}
      />
    </IonContent>
  );
};

export default UserProfile;