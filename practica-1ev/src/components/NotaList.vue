<script setup>
import { inject } from 'vue';
import { useHooks } from '@/composables/useHooks';
import NotaItem from '@/components/Nota.vue';
import { EVT_NOTA_ITEM_CLONAR, EVT_NOTA_ITEM_BORRAR, EVT_NOTA_ITEM_SEL_ADD, EVT_NOTA_ITEM_SEL_UNO } from '@/components/Nota.vue';

const { store } = defineProps(['store']);
const ME = 'NotaList';

const hooks = useHooks(ME);
const { logFn } = hooks;

const fnselUno = (nota) => {
  logFn(ME, "fnSelUno", nota.id);
  store.seleccionar(nota.id, false);
};

const fnSelAdd = (nota) => {
  logFn(ME, "fnSelAdd", nota.id);
  store.seleccionar(nota.id, true);
};

const fnClonarNota = (nota) => {
  logFn(ME, "fnClonar", nota.id);
  store.clonarNota(nota);
};

const fnBorrarNota = (nota) => {
  logFn(ME, "fnBorrar", nota.id);
  store.borrarPorId(nota.id);
};
</script>

<template>
  <div class="notas">
    <NotaItem 
      v-for="nota in store.notas.value" 
      :key="nota.internalid"
      :nota="nota"
      @[EVT_NOTA_ITEM_SEL_UNO]="fnselUno"
      @[EVT_NOTA_ITEM_SEL_ADD]="fnSelAdd"
      @[EVT_NOTA_ITEM_BORRAR]="fnBorrarNota"
      @[EVT_NOTA_ITEM_CLONAR]="fnClonarNota"
    />
  </div>
</template>

<style scoped>
.notas {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #0e0c0c; /* Fondo suave */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad */
}

.nota-item {
  background-color: #0d0808; /* Fondo rojo claro para cada nota */
  padding: 15px;
  border: 1px solid #ff6666;
  border-radius: 5px;
  transition: transform 0.2s;
}
ss
.nota-item:hover {
  transform: translateY(-3px); /* Efecto al pasar el ratón */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
