<script setup>
import { provide } from 'vue';
import { useNotasStore } from './composables/useNotaStore';
import Toolbar from './components/Toolbar.vue';
import NotaList from "./components/NotaList.vue";
import Header from './components/Header.vue';
import { EVT_TOOLBAR_NUEVA_NOTA, EVT_TOOLBAR_RELOAD_DATA } from './constants/events';

// Definir el logger
const eventelogger = {
  logFn: (component, action, id) => {
    console.log(`[${component}] ${action}${id ? ': ' + id : ''}`);
  }
};

// Proporcionar el logger al árbol de componentes
provide("eventelogger", eventelogger);

// Usar el composable useNotasStore
const notasStore = useNotasStore([]);

// Funciones del toolbar (simplificadas)
const fnLoadData = async () => {
  await notasStore.load('/data/notas.json');
};

const fnNuevaNota = () => {
  const nota = {
    desc: "Nueva nota"
  };
  notasStore.nueva(nota);
};

// Definir las constantes para que sean accesibles en el template
const EVENTS = {
  EVT_TOOLBAR_NUEVA_NOTA,
  EVT_TOOLBAR_RELOAD_DATA
};
</script>

<template>
  <main class="app-container">
    <Header></Header>  
    <Toolbar 
      v-on:[EVENTS.EVT_TOOLBAR_NUEVA_NOTA]="fnNuevaNota"
      v-on:[EVENTS.EVT_TOOLBAR_RELOAD_DATA]="fnLoadData" 
      :store="notasStore"
    />
    <NotaList :store="notasStore"></NotaList>
  </main>
</template>

<style scoped>
/* Estilo global para el fondo de la página */
body {
  background-color: #2e2e2e; /* Fondo gris oscuro */
  color: #016314; /* Texto claro */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Estilos para el contenedor principal */
.app-container {
  background-color: #3e3e3e; /* Fondo gris intermedio para el contenedor */
  color: #0d073d; /* Texto blanco */
  padding: 20px;
  max-width: 800px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Sombra oscura */
}

/* Estilos para el Header */
.header {
  background-color: #f1bc1c; /* Fondo rojo oscuro */
  color: #131313;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Estilos para el Toolbar */
.toolbar {
  background-color: #e98227; /* Fondo rojo */
  padding: 15px;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.toolbar button {
  background-color: #8cf151;
  color: rgb(28, 15, 15);
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toolbar button:hover {
  background-color: #b2e43c;
}

/* Estilos para la lista de notas */
.notas {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #4e4e4e; /* Fondo gris oscuro para las notas */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


</style>
