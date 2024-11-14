import { createApp } from 'vue';
import App from './App.vue';
import Header from './components/Header.vue';
import Note from './components/Nota.vue';
import NoteList from './components/NotaList.vue';
import Toolbar from './components/Toolbar.vue';

// Crear la aplicación Vue
const app = createApp(App);

// Registrar los componentes globalmente
app.component('Header', Header);
app.component('Note', Note);
app.component('NoteList', NoteList);
app.component('Toolbar', Toolbar);

// Montar la aplicación en el elemento con id "app"
app.mount('#app');
