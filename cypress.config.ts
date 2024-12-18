import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8100/", // La URL base de tu aplicación
    defaultCommandTimeout: 10000, // Aumenta el tiempo de espera por defecto a 10 segundos
    setupNodeEvents(on, config) {
      // Puedes agregar eventos personalizados aquí, si es necesario
    },
    viewportWidth: 1280,  // Ancho del viewport
    viewportHeight: 720,  // Altura del viewport
    video: false, // Deshabilita la grabación de video, si no es necesario
    screenshotOnRunFailure: true, // Habilita captura de pantalla en caso de fallo
    reporter: 'mochawesome', // Usa Mochawesome como reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Carpeta para los reportes
      overwrite: false,
      html: true, // Genera reporte HTML
      json: true, // Genera archivo JSON
      embeddedScreenshots: true, // Incluir capturas en el reporte
    },

  },
});
