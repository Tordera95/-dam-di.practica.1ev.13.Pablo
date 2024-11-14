import { ref, inject, computed } from "vue";

export function useNotasStore(data) {
  const ME = "NotaStore";

  // Hacer el logger opcional con un valor por defecto
  const logger = inject("eventelogger", {
    logFn: (component, action, id) => {
      console.log(`[${component}] ${action}${id ? ': ' + id : ''}`);
    }
  });

  // Usar logger.logFn en lugar de destructurar
  const logFn = logger.logFn;

  // Generar un ID único
  const genuniqueid = (id) => {
    let uuid = 0;
    return () => {
      return id + uuid++;
    };
  };
  const uniqueid = genuniqueid("nota:");

  // Definir el estado
  const notas = ref(data);
  const clonados = ref(0);

  // Contador para los IDs de las notas
  let nextId = 1;

  // Generar un ID único incremental
  const generateId = () => {
    return `nota-${String(nextId++).padStart(3, '0')}`;  // Formato: nota-001, nota-002, etc.
  };

  const totalActivas = computed(() => {
    let x = 0;
    notas.value.forEach((n) => {
      x += n.activa ? 1 : 0;
    });
    return x;  // Corrección de "returnx"
  });
  
  const totalNotas = computed(() => notas.value.length);
  const totalInactivas = computed(() => notas.value.length - totalActivas.value);

  // Funciones para manejar las notas
  const nueva = (nota) => {
    logFn(ME, "nueva");
    const nuevaNota = {
      ...nota,
      id: generateId(),        // Usar el nuevo generador de IDs
      internalid: uniqueid(),
      activa: false,
      titulo: `Nota ${nextId-1}`,  // El título también refleja el número
      desc: nota.desc || `Descripción de la nota ${nextId-1}`
    };
    notas.value.push(nuevaNota);
  };

  const seleccionar = (id, append) => {
    logFn(ME, "seleccionar", id);
    notas.value.forEach((nota) => {
      if (nota.id === id) {
        nota.activa = !nota.activa;
        return;
      }
    });
  };

  const invertirSeleccion = () => {
    logFn(ME, "invertirSeleccion");
    notas.value.forEach((nota) => (nota.activa = !nota.activa));
  };

  const seleccionarTodas = () => {
    logFn(ME, "seleccionarTodas");
    notas.value.forEach((nota) => (nota.activa = true));
  };

  const anular = (id) => {
    logFn(ME, "anular", id);
    notas.value.forEach((nota) => {
      if (nota.id === id) {
        nota.activa = false;
        return;
      }
    });
  };

  const anularTodo = () => {
    logFn(ME, "anularTodo");
    notas.value.forEach((nota) => (nota.activa = false));
  };

  const borrar = () => {
    logFn(ME, "borrar");
    const tmp = [];
    notas.value.forEach((nota, idx) => {
      if (nota.activa) tmp.push(idx);
    });
    tmp.reverse().forEach((idx) => {
      notas.value.splice(idx, 1);
    });
  };

  const borrarPorId = (id) => {
    logFn(ME, "borrarPorId", id);
    const index = notas.value.findIndex(nota => nota.id === id);
    if (index !== -1) {
      notas.value.splice(index, 1);
    }
  };

  const borrarTodo = () => {
    logFn(ME, "borrarTodo");
    notas.value = []; // Limpiar todas las notas
  };

  const clonar = () => {
    logFn(ME, "clonar");
    notas.value.forEach((nota) => {
      if (nota.activa) {
        clonados.value++;
        nota.activa = false;
        let clon = { 
          ...nota,
          id: generateId(),
          internalid: uniqueid(),
          titulo: `${nota.titulo} (copia)`,
          activa: false
        };
        notas.value.push(clon);
      }
    });
  };

  const clonarNota = (nota) => {
    logFn(ME, "clonarNota");
    let clon = { 
      ...nota,
      id: generateId(),
      internalid: uniqueid(),
      titulo: `${nota.titulo} (copia)`,
      activa: false
    };
    notas.value.push(clon);
  };

  const load = async (url) => {
    logFn(ME, "load", url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Resetear el contador de IDs
      nextId = 1;
      notas.value = data.map(nota => ({
        ...nota,
        id: generateId(),        // Generar nuevo ID
        internalid: uniqueid(),
        activa: false
      }));
    } catch (error) {
      console.error('Error loading notes:', error);
      // Opcionalmente, inicializar con algunas notas por defecto
      notas.value = [
        {
          id: generateId(),
          internalid: uniqueid(),
          titulo: "Nota por defecto",
          desc: "Esta es una nota por defecto",
          activa: false
        }
      ];
    }
  };

  const seleccionarNotas = () => {
    logFn(ME, "seleccionarNotas");
    notas.value.forEach((nota) => (nota.activa = true));
  };

  // Inicializar las notas
  data.forEach((nota) => {
    nota.activa = false;
  });

  return {
    totalActivas,
    totalInactivas,
    totalNotas,
    notas,
    anular,
    anularTodo,
    borrar,
    borrarTodo,
    clonar,
    clonarNota,
    nueva,
    invertirSeleccion,
    seleccionar,
    seleccionarTodas,
    load,
    borrarPorId
  };
}
