<template>
  <div :class="{ nota: true, activa: nota.activa }">
    <div class="contenido">
      <div class="id">{{ nota.id }}</div>
      <div class="titulo">{{ nota.titulo }}</div>
      <div class="desc">{{ nota.desc }}</div>
    </div>
    <div class="tools">
      <ClonarIcon @click.stop="clonar" class="toolbar-icon"></ClonarIcon>
      <TrashIcon @click.stop="eliminar" class="toolbar-icon"></TrashIcon>
      <PinIcon :class="{ selected: nota.activa }" @click.stop="seleccionar" class="toolbar-icon"></PinIcon>
    </div>
  </div>
</template>

<script>
export const EVT_NOTA_ITEM_SEL_UNO = 'nota-sel-uno';
export const EVT_NOTA_ITEM_SEL_ADD = 'nota-sel-add';
export const EVT_NOTA_ITEM_CLONAR = 'nota-clonar';
export const EVT_NOTA_ITEM_BORRAR = 'nota-borrar';
</script>

<script setup>
import { inject } from 'vue';
import ClonarIcon from '@/assets/icons/ClonarIcon.vue';
import TrashIcon from '@/assets/icons/TrashIcon.vue';
import PinIcon from '@/assets/icons/PinIcon.vue';
import { useHooks } from '@/composables/useHooks';

// Desestructuramos los atributos pasados al componente
const { nota } = defineProps(['nota']);

// Definimos los eventos que emitimos
const emit = defineEmits([
  EVT_NOTA_ITEM_SEL_UNO,
  EVT_NOTA_ITEM_SEL_ADD,
  EVT_NOTA_ITEM_BORRAR,
  EVT_NOTA_ITEM_CLONAR,
]);

const ME = 'NotaItem';
const params = nota.id;

// Usar useHooks en lugar de inject directo
const { logFn, logEmit } = useHooks(ME);

// Función para seleccionar la nota
const seleccionar = (evt) => {
  if (evt.altKey || evt.metaKey) {
    logEmit(EVT_NOTA_ITEM_ADD);
    emit(EVT_NOTA_ITEM_ADD, nota);
    return;
  }
  logEmit(EVT_NOTA_ITEM_SEL_UNO);
  emit(EVT_NOTA_ITEM_SEL_UNO, nota);
};

// Función para eliminar la nota
const eliminar = () => {
  logEmit(EVT_NOTA_ITEM_BORRAR);
  emit(EVT_NOTA_ITEM_BORRAR, nota);
};

// Función para clonar la nota (sin verificar si está activa)
const clonar = () => {
  logEmit(EVT_NOTA_ITEM_CLONAR);
  emit(EVT_NOTA_ITEM_CLONAR, nota);
};
</script>

<style scoped>
.nota {
  background-color: #edb76a; /* Fondo en rojo claro */
  border: 1px solid #ff6666; /* Borde rojo */
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nota:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra en hover */
}

.nota.activa {
  background-color:  #eec831; /* Fondo más claro para la nota activa */
  border-color: #d8b4b4; /* Borde rojo más intenso */
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.id {
  font-size: 0.9em;
  color: #555; /* Gris oscuro para el ID */
}

.titulo {
  font-size: 1.2em;
  font-weight: bold;
  color: #b30000; /* Rojo oscuro para el título */
}

.desc {
  font-size: 1em;
  color: #4d4d4d; /* Gris para la descripción */
}

.tools {
  display: flex;
  gap: 10px;
}

.toolbar-icon {
  cursor: pointer;
  fill: #b30000; /* Color rojo oscuro para los iconos */
  width: 24px;
  height: 24px;
  transition: fill 0.3s;
}

.toolbar-icon:hover {
  fill: #ff6666; /* Color rojo más claro en hover */
}

.toolbar-icon.selected {
  fill: #ffd700; /* Color dorado para indicar selección */
}

</style>
