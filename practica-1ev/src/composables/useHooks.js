import { inject } from 'vue';

export function useHooks(componentName) {
  const logger = inject('eventelogger', {
    logFn: (component, action) => {
      console.log(`[${component}] ${action}`);
    }
  });

  const logEmit = (action) => {
    logger.logFn(componentName, action);
  };

  return {
    logEmit,
    logFn: logger.logFn
  };
}
