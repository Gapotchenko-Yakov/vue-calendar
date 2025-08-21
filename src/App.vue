<template>
  <lang-switcher 
    :model-value="lang"
    @update:model-value="val => lang = val"
    class="lang-switcher"
  />
  <calendar 
    :locale="lang"
    v-model="selectedDate"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calendar from './components/Calendar.vue'
import LangSwitcher from './components/LangSwitcher.vue'
import type { Language } from './types/locales';
import type { CalendarDateString } from './types/calendar';

const lang = ref<Language>('en');
const selectedDate = ref<CalendarDateString | null>(null);

function handleSelect(date: CalendarDateString){
  console.log("🚀 ~ App:handleSelect ~ date:", date)
}
</script>

<style scoped>
  .lang-switcher {
    margin-bottom: 12px;
  }
</style>
