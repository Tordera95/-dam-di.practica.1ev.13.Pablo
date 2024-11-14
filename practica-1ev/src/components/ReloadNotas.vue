<template>
    <div class="reload-notas">
      <button @click="reloadData">Recargar Notas</button>
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  
  const logger = inject('eventelogger', {
    logFn: (component, action) => {
      console.log(`[${component}] ${action}`);
    }
  });
  
  const props = defineProps(['load']);
  
  const reloadData = async () => {
    logger.logFn('ReloadNotas', 'reloadData');
    await props.load();
  };
  </script>
  
  <style scoped>
  .reload-notas button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  