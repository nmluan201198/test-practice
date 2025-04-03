<script setup lang="ts">
import { ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import type { TUser } from '@/interfaces/UserInterface'
import { reactive } from 'vue'
import { formatNumber } from '@/helper/numberHelper'
import dayjs from 'dayjs'
import RegistrationRenderer from './RegistrationRenderer.vue'
import type { GridOptions } from 'ag-grid-community'

// Column Definitions
const columnDefs = ref([
  { headerName: 'Name', field: 'name' },
  { headerName: 'Balance', field: 'balance', valueFormatter: (params : any) => formatNumber(params.value) },
  { headerName: 'Email', field: 'email', cellRenderer: (params: any) => {
      const emailLink = `mailto:${params.value}`;
      return `<a href="${emailLink}" target="_blank">${params.value}</a>`;
    }},
  { headerName: 'Registration', field: 'registerAt',cellRenderer: RegistrationRenderer},
  { headerName: 'Status', field: 'active', cellRenderer: (params: any) => (params.value ? 'Active' : 'Inactive') },
 {headerName: 'Action' , cellRenderer: (params : any) => { return 'Action Button'}}
]);

// Row Data
const rowData = ref<TUser[]>([
  {
    id: '1',
    name: 'Alice Johnson',
    balance: 3200.50,
    email: 'alice.johnson@example.com',
    registerAt: new Date('2022-01-10T08:00:00'),
    active: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    balance: 1540.75,
    email: 'bob.smith@example.com',
    registerAt: new Date('2021-06-15T12:00:00'),
    active: true,
  },
  {
    id: '3',
    name: 'Charlie Lee',
    balance: 500.00,
    email: 'charlie.lee@example.com',
    registerAt: new Date('2023-03-25T16:00:00'),
    active: false,
  },
  {
    id: '4',
    name: 'David Harris',
    balance: 2200.30,
    email: 'david.harris@example.com',
    registerAt: new Date('2020-11-01T10:30:00'),
    active: true,
  },
  {
    id: '5',
    name: 'Eva Green',
    balance: 7800.10,
    email: 'eva.green@example.com',
    registerAt: new Date('2019-12-05T14:45:00'),
    active: true,
  },
  {
    id: '6',
    name: 'Frank Moore',
    balance: 1250.00,
    email: 'frank.moore@example.com',
    registerAt: new Date('2022-08-20T09:15:00'),
    active: false,
  },
  {
    id: '7',
    name: 'Grace Lee',
    balance: 9000.00,
    email: 'grace.lee@example.com',
    registerAt: new Date('2021-03-30T17:30:00'),
    active: true,
  },
  {
    id: '8',
    name: 'Hannah Scott',
    balance: 345.90,
    email: 'hannah.scott@example.com',
    registerAt: new Date('2023-01-15T11:00:00'),
    active: true,
  },
  {
    id: '9',
    name: 'Ian Cooper',
    balance: 4120.80,
    email: 'ian.cooper@example.com',
    registerAt: new Date('2022-07-25T13:00:00'),
    active: false,
  },
  {
    id: '10',
    name: 'Jack Taylor',
    balance: 6750.60,
    email: 'jack.taylor@example.com',
    registerAt: new Date('2020-04-18T18:30:00'),
    active: true,
  }
]);

// Grid Options
const gridOptions: GridOptions = {
  pagination: true,
}

const defaultColDef = reactive({
  resizable: true,
  editable: true
})

</script>

<template>
 <div class='container'>
    <p>Test Practice 2</p>

    <div :style="{ width: '100%', height: '100%' }" class="ag-theme-alpine grid-container">
    <ag-grid-vue 
        :style="{ width: '100%', height: '100%' }"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :grid-options="gridOptions" 
    :default-col-def="defaultColDef"
    class="ag-theme-alpine">
    </ag-grid-vue>
  </div>
 </div>
</template>

<style scoped>
.container{
    height : 100vh;
    width: 100vw;
}
</style>