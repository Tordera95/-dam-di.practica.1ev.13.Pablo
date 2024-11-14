<template>
  <header class="header">
    <h1>Práctica Vue Notas 1Ev</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  
  color: #fff; /* Texto en blanco */
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
}

.header h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase; /* Texto en mayúsculas */
  letter-spacing: 2px; /* Espaciado entre letras */
}


</style>
