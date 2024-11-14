<script setup>
import { defineProps, defineEmits } from 'vue';
import { useHooks } from '@/composables/useHooks';
import ToolbarIcons from '@/assets/icons/ToolbarIcons.vue';

import {
  EVT_TOOLBAR_NUEVA_NOTA,
  EVT_TOOLBAR_RELOAD_DATA
} from '@/constants/events';

const props = defineProps(['store']);
const emit = defineEmits([
  EVT_TOOLBAR_NUEVA_NOTA,
  EVT_TOOLBAR_RELOAD_DATA
]);

const ME = 'Toolbar';
const { logEmit, logFn } = useHooks(ME);

// Funciones de manejo de eventos
const fnAnularSeleccion = () => {
  logFn(ME, "fnAnularSeleccion");
  props.store.anularTodo();
};

const fnBorrarNotas = () => {
  logFn(ME, "fnBorrarNotas");
  props.store.borrar();
};

const fnBorrarTodo = () => {
  logFn(ME, "fnBorrarTodo");
  props.store.borrarTodo();
};

const fnClonarNota = () => {
  logFn(ME, "fnClonarNota");
  props.store.clonar();
};

const fnNuevaNota = () => {
  logEmit(EVT_TOOLBAR_NUEVA_NOTA);
  emit(EVT_TOOLBAR_NUEVA_NOTA);
};

const fnSeleccionarNotas = () => {
  logFn(ME, "fnSeleccionarNotas");
  props.store.seleccionarTodas();
};

const fnInvertirSeleccion = () => {
  logFn(ME, "fnInvertirSeleccion");
  props.store.invertirSeleccion();
};

const fnReloadData = () => {
  logFn(ME, "fnReloadData");
  window.location.reload();
};
</script>

<template>
  <main class="toolbar">
    <div class="seccion operaciones">
      <!-- Grupo de operaciones básicas -->
      <div class="button-group">
        <button @click="fnNuevaNota" class="btn-primary">
          <ToolbarIcons iconName="NewToolbarIcon" class="icon" />
          <span>Nueva</span>
        </button>
        <button @click="fnClonarNota" :disabled="store.totalActivas.value === 0">
          <ToolbarIcons iconName="CloneToolbarIcon" class="icon" />
          <span>Clonar</span>
        </button>
      </div>

      <!-- Grupo de operaciones de borrado -->
      <div class="button-group">
        <button @click="fnBorrarNotas" :disabled="store.totalActivas.value === 0" class="btn-danger">
          <ToolbarIcons iconName="DeleteToolbarIcon" class="icon" />
          <span>Borrar ({{ store.totalActivas.value }})</span>
        </button>
        <button @click="fnBorrarTodo" class="btn-danger">
          <ToolbarIcons iconName="DeleteAllToolbarIcon" class="icon" />
          <span>Limpiar ({{ store.totalNotas.value }})</span>
        </button>
      </div>

      <!-- Grupo de operaciones de selección -->
      <div class="button-group">
        <button @click="fnSeleccionarNotas">
          <ToolbarIcons iconName="SelectAllToolbarIcon" class="icon" />
          <span>Seleccionar</span>
        </button>
        <button @click="fnInvertirSeleccion">
          <ToolbarIcons iconName="InverterSelectToolbarIcon" class="icon" />
          <span>Invertir</span>
        </button>
        <button @click="fnAnularSeleccion" :disabled="store.totalActivas.value === 0">
          <ToolbarIcons iconName="DeSelectAllToolbarIcon" class="icon" />
          <span>Anular ({{ store.totalActivas.value }})</span>
        </button>
      </div>

      <!-- Separador -->
      <div class="separator"></div>

      <!-- Reload -->
      <div class="button-group">
        <button @click="fnReloadData" class="btn-reload">
          <ToolbarIcons iconName="ReloadToolbarIcon" class="icon" />
          <span>Reload</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.toolbar {
  background-color: #b30000; /* Fondo rojo oscuro */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.seccion {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
}

.button-group {
  display: flex;
  gap: 12px;
}

.button-group button {
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 5px;
  padding: 10px 16px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.icon {
  width: 20px;
  height: 20px;
  fill: #fff;
}

.btn-primary {
  background-color: #d32f2f; /* Color rojo principal */
  color: #fff;
}

.btn-primary:hover {
  background-color: #ff6666; /* Color más claro en hover */
  transform: scale(1.05); /* Efecto de ampliación al pasar el ratón */
}

.btn-danger {
  background-color: #e60000; /* Color rojo intenso */
  color: #fff;
}

.btn-danger:hover {
  background-color: #ff4d4d;
  transform: scale(1.05);
}

.btn-reload {
  background-color: #555;
  color: #fff;
}

.btn-reload:hover {
  background-color: #777;
  transform: scale(1.05);
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin: 15px 0;
  opacity: 0.5;
}

</style>
