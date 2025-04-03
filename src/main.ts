import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'

// Ag-Grid
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-balham.css'
import 'ag-grid-community/styles/ag-theme-material.css'

//AntD
import 'ant-design-vue/dist/reset.css';


createApp(App).use(Antd).mount('#app')
