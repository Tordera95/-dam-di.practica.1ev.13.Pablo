import { ref } from 'vue';

export function useEventLogger() {
  const logs = ref([]);
  const cmpShowInUI = ref(false); // Controla la visualización de la consola en UI
  const rfEnabled = ref(false); // Habilita o deshabilita el modo de depuración

  // Función para registrar logs
  const logFn = (component, action, details = '') => {
    if (rfEnabled.value) {
      const timestamp = new Date().toISOString();
      logs.value.push(`[${timestamp}] ${component}: ${action} - ${details}`);
    }
  };

  // Función para alternar el modo de depuración
  const toggleDebug = () => {
    rfEnabled.value = !rfEnabled.value;
  };

  // Función para alternar la consola de UI
  const toggleUI = () => {
    cmpShowInUI.value = !cmpShowInUI.value;
  };

  // Función para limpiar los logs
  const clear = () => {
    logs.value = [];
  };

  return {
    logs,
    logFn,
    toggleDebug,
    toggleUI,
    clear,
    cmpShowInUI,
    rfEnabled
  };
}
