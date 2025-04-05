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

function processWithDelay(numbers: any[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Check if the input is an array
    if (!Array.isArray(numbers)) {
      reject(new Error('Input must be an array'));
      return;
    }

    // Check if all items in the array are numbers
    if (numbers.some((num) => typeof num !== 'number')) {
      reject(new Error('Array must only contain numeric values'));
      return;
    }

    // Define the async function to process each number with delay
    const process = async () => {
      if (numbers.length === 0) {
        // Resolve immediately if the array is empty
        resolve();
        return;
      }

      for (let i = 0; i < numbers.length; i++) {
        // Wait for 1 second between each number processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Print the number to the console when it is processed
        console.log(numbers[i]);
      }

      // Resolve the promise after all numbers have been processed
      resolve();
    };

    // Start processing the numbers
    process().catch(reject);
  });
}

// Grid Options
const gridOptions: GridOptions = {
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

onMounted(() => {
  processWithDelay([1,2,3,4,5]).then(() => {console.log("All Number Processed")}).catch((error) => {console.log("Error");
  })
})
</script>

<template>
  <div class="container">
    <p>App Development Test</p>

    <div :style="{ width: '100%', height: '60%' }" class="ag-theme-alpine grid-container">
      <ag-grid-vue
        :style="{ width: '100%', height: '100%' }"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :rowSelection="rowSelection"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        :rowData="rowData"
        :default-col-def="defaultColDef"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  padding: 16px;
}
</style>
