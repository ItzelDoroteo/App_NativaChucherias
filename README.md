

---

# Proyecto: Aplicación Móvil Nativa con Ionic

### Descripción
Esta aplicación móvil nativa ha sido desarrollada utilizando el framework **Ionic**, lo que permite que la app sea compatible con dispositivos Android e iOS. El objetivo de esta aplicación es ofrecer una experiencia fluida y optimizada para los usuarios, manteniendo las funcionalidades clave del sitio web original, como el **login**, la **visualización de ofertas** y el **carrito de compras**. Además, incluye características nativas como **notificaciones push**, **almacenamiento local** y **soporte offline limitado**.

### Características principales
- **Login seguro** con autenticación mediante JWT.
- **Carrito de compras** funcional para gestionar productos seleccionados.
- **Ofertas y catálogo de productos** accesibles de forma eficiente.
- **Notificaciones push** y acceso a funcionalidades nativas del dispositivo.
- **Compatibilidad offline limitada**: Permite acceder a algunas funcionalidades básicas sin conexión a Internet.

### Instalación
Sigue los siguientes pasos para clonar e instalar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ItzelDoroteo/App_NativaChucherias.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd App_NativaChucherias
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

4. Compila la aplicación:
   - Para Android:
     ```bash
     ionic capacitor build android
     ```


### Ejecución
Para ejecutar la aplicación en modo local en un emulador o dispositivo físico, sigue estos pasos:

1. **Android**:
   - Abre el proyecto en **Visual Studio Code**.
   - Ejecuta la app con el CLI
     ```bash
     ionic serve
     ```

### Uso
Una vez que la aplicación esté corriendo, podrás acceder a las siguientes funcionalidades:
- **Login de usuario**: Acceso con credenciales seguras.
- **Exploración de ofertas**: Navega por las promociones y añade productos al carrito.
- **Carrito de compras**: Gestiona los productos seleccionados.
- **Notificaciones push**: Recibe alertas importantes sobre nuevas ofertas o actualizaciones.
  
### Requisitos
- **Ionic Framework** (Versión 6.0 o superior)
- **Capacitor** o **Cordova** para integrar funcionalidades nativas.
- **Android Studio** y/o **Xcode** para compilar y probar en dispositivos móviles.
- **Node.js** y **Express** para el backend y la API REST.
- **GitHub** para la gestión del control de versiones.

### Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza los cambios y **commitea**:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Sube los cambios a tu repositorio:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un **pull request** para que tus cambios sean revisados e integrados.

### Estrategia de Despliegue
Para el despliegue de la aplicación, seguimos una estrategia de **despliegue gradual** en la App Store y Google Play. La aplicación es inicialmente liberada a un subconjunto de usuarios, recopilando retroalimentación y monitoreando su rendimiento antes de lanzarla completamente a todos los usuarios.

### Entornos de Despliegue
- **Desarrollo**: Entorno para probar nuevas funcionalidades en dispositivos emulados.
- **Staging**: Réplica del entorno de producción para realizar pruebas exhaustivas.
- **Producción (Despliegue Gradual)**: Lanzamiento inicial a un pequeño porcentaje de usuarios.
- **Producción Completa**: Despliegue total una vez que se confirme la estabilidad.

### Integración Continua (CI)
Este proyecto utiliza **GitHub Actions** para ejecutar pruebas automáticas y manejar el flujo de trabajo de CI/CD. Cada vez que se crea o actualiza una **pull request**, se ejecutan pruebas unitarias y de integración.

### Licencia
Este proyecto está bajo la Licencia MIT.

---
