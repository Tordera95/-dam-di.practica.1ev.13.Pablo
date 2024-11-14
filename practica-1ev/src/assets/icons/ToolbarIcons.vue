<template>
    <div>
      <component :is="iconName" />
    </div>
  </template>
  
  <script>
  export default {
    name: "ToolbarIcons",
    props: {
      iconName: {
        type: String,
        required: true,
      },
    },
    components: {
      NewToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2z"/>
          </svg>
        `,
      },
      DeleteAllToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        `,
      },
      CloneToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h8v-2h-2v-2h4c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 14H4V3h12v12zM22 5v14c0 1.1-.9 2-2 2h-2v-2h2V5h-2V3h2c1.1 0 2 .9 2 2z"/>
          </svg>
        `,
      },
      DeleteToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3 6l3 18h12l3-18H3zm18-4H3V2h3.5l1-1h7l1 1H21v2z"/>
          </svg>
        `,
      },
      SelectAllToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3 3h18v18H3V3zm8 12h2v-2H8v2zm0-4h2V9h-2v2zm0-4h2V5h-2v2z"/>
          </svg>
        `,
      },
      DeSelectAllToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3 3h18v18H3V3zm10 12v-2h-2v2h2zm0-4V9h-2v2h2zm0-4V5h-2v2h2z"/>
          </svg>
        `,
      },
      InverterSelectToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7 7h10v10H7V7zm8 8V9H9v6h6z"/>
          </svg>
        `,
      },
      ReloadToolbarIcon: {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M13 3c-4.42 0-8 3.58-8 8s3.58 8 8 8v-3l4 4-4 4v-3c-5.52 0-10-4.48-10-10S7.48 1 13 1V3z"/>
          </svg>
        `,
      },
    },
  };
  </script>
  <style scoped>
  .icon {
    fill: #ff3333; /* Color rojo */
    width: 24px;
    height: 24px;
    transition: fill 0.3s;
  }
  
  .icon:hover {
    fill: #ff8080; /* Color más claro en hover */
  }
  </style>
  
