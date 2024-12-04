import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chucherias.com',
  appName: 'Chucherias & Regalos',
  webDir: 'dist', // Tu directorio web compilado
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // Configuración opcional, controla el tiempo de la splash screen
      launchAutoHide: true, // Ocultar automáticamente la splash screen
      backgroundColor: '#ffffff', // Color de fondo de la splash screen
      androidSplashResourceName: 'icon', // Nombre de la imagen de la splash
    },
  },
};

export default config;
