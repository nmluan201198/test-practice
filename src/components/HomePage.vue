<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import type { TUser } from '@/interfaces/UserInterface'
import { reactive } from 'vue'
import { formatNumber } from '@/helper/numberHelper'
import dayjs from 'dayjs'
import RegistrationRenderer from './RegistrationRenderer.vue'
import type {
  GridApi,
  GridOptions,
  GridReadyEvent,
  PaginationNumberFormatterParams,
} from 'ag-grid-community'
import { message } from 'ant-design-vue';
const [messageApi, contextHolder] = message.useMessage();

// Column Definitions
const columnDefs = ref([
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    width: 50,
  },
  { headerName: 'Name', field: 'name', sortable: true },
  {
    headerName: 'Balance ($)',
    field: 'balance',
    valueFormatter: (params: any) => formatNumber(params.value),
  },
  {
    headerName: 'Email',
    field: 'email',
    cellRenderer: (params: any) => {
      const emailLink = `mailto:${params.value}`
      return `<a href="${emailLink}" target="_blank">${params.value}</a>`
    },
  },
  { headerName: 'Registration', field: 'registerAt', cellRenderer: RegistrationRenderer },
  {
    headerName: 'Status',
    field: 'active',
    cellRenderer: (params: any) => (params.value ? 'Active' : 'Inactive'),
  },
  {
    headerName: 'Action',
    cellRenderer: (params: any) => {
      return 'Action Button'
    },
  },
])

// Row Data
const rowData = ref<TUser[]>([])
const gridApi = shallowRef<GridApi<TUser> | null>(null)

const rowSelection = ref<'single' | 'multiple'>('multiple')
const paginationPageSize = ref(10)
const paginationPageSizeSelector = ref<number[] | boolean>([10, 50, 100])
const paginationNumberFormatter = ref<(params: PaginationNumberFormatterParams) => string>(
  (params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']'
  },
)

// Grid Options
const gridOptions: GridOptions = {
  pagination: true,
}

const defaultColDef = reactive({
  resizable: true,
  editable: true,
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 100,
})

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api

  const updateData = (data: TUser[]) => {
    rowData.value = data
  }

  fetch('https://677769a180a79bf919019f46.mockapi.io/api/tickets')
    .then((resp) => { 
      if(resp.status !== 200) {
        return message.error("Network Error")
      }
      
      return resp.json()})
    .then((data) => updateData(data)).catch((error) => {
      message.error("Network Error")
    })
}
</script>

<template>
  <div class="container">
    <p>Test Practice 2</p>

    <div :style="{ width: '100%', height: '100%' }" class="ag-theme-alpine grid-container">
      <ag-grid-vue
        :style="{ width: '100%', height: '100%' }"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :rowSelection="rowSelection"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        :paginationNumberFormatter="paginationNumberFormatter"
        :rowData="rowData"
        :grid-options="gridOptions"
        :default-col-def="defaultColDef"
        class="ag-theme-alpine"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}
</style>
