<template>
    <a-popover trigger="hover">
      <template #content>
        <p>{{ formattedDateTime }}</p>
      </template>
      <p>{{ formattedDate }}</p>
    </a-popover>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import dayjs from 'dayjs';
  
 
  const props = defineProps({
    params: { type: Object, required: true }
  });
  

  const formattedDate = dayjs(props.params.value).format('YYYY-MM-DD');
  const formattedDateTime = dayjs(props.params.value).format('YYYY-MM-DD HH:ss');
  </script>
  
  <style scoped>

  </style>
  