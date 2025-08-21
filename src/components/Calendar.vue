<template>
    <div class="container" v-if="displayedYear !== null && displayedMonth !== null && selectedDate !== null">
        <div class="month-year">
            <button
                @click="decreaseMonth"
            >◀</button>
            <span>
                {{ months[displayedMonth] }} {{ displayedYear }}
            </span>
            <button
                @click="increaseMonth"
            >▶</button>
        </div>
        <div class="weekdays">
            <span
                v-for="weekday in weekdays"
                :key="weekday"
                class="weekday"
            >
                {{ weekday }}
            </span>
        </div>
        <div class="calendar-grid">
            <span
                v-for="n in getDaysOffset(displayedYear, displayedMonth)"
                class="day-offset"
                :key="n"
                >
            </span>
            <button
                v-for="day in getDaysInMonth(displayedYear, displayedMonth)"
                @click="changeDate(day)"
                :class="`day-button ${formatDate(new Date(displayedYear, displayedMonth, day)) === formatDate(selectedDate) ? 'day__selected' : null}`"
                :key="day"
                >
                {{ day }}
            </button>
        </div>
    </div>
    <div class="loader" v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import {locales} from '../utils/locale'
    import type { Language } from '../types/locales';

    interface CalendarProps {
        modelValue: Date | null,
        locale?: Language,
    }

    const {
        modelValue,
        locale: propsLocale,
    } = defineProps<CalendarProps>();

    const emit = defineEmits(['update:modelValue', 'select']);

    const selectedDate = ref<Date | null>(null);
    const displayedMonth = ref<number | null>(null);
    const displayedYear = ref<number | null>(null);

    if(modelValue){
        selectedDate.value = modelValue;
        displayedMonth.value = modelValue.getMonth();
        displayedYear.value = modelValue.getFullYear();
    } else {
        const today = new Date();
        selectedDate.value = today;
        emit('update:modelValue', today);
        displayedMonth.value = today.getMonth();
        displayedYear.value = today.getFullYear();
    }

    function getDaysInMonth(year: number, month: number): number{
        return new Date(year, month + 1, 0).getDate();
    }


    function getDaysOffset(year: number, month: number): number{
        const firstDay = new Date(year, month, 1).getDay();
        return (firstDay + 6) % 7;
    }

     // TODO: maybe "2025-0-2" - use padStart for future and increase month by 1, 
     // now it acceptable because it used only for inner comparation
    function formatDate(date: Date) {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
    
    const locale = computed(() => propsLocale ?? 'en');
    const months = computed(() => locales[locale.value].months)
    const weekdays = computed(() => locales[locale.value].weekdays)

    function changeDate(day: number) {
        if(displayedYear.value !== null && displayedMonth.value !== null){
            const date = new Date(displayedYear.value, displayedMonth.value, day);
            selectedDate.value = date;
            emit('update:modelValue', date);
            emit('select', date);
        }
    }

    function increaseMonth(){
        if(displayedMonth.value !== null && displayedYear.value !== null){
            if(displayedMonth.value <= 10)
                displayedMonth.value++;
            else {
                displayedYear.value++;
                displayedMonth.value = 0;
            }
        }
    }

    function decreaseMonth(){
        if(displayedMonth.value !== null && displayedYear.value !== null){
            if(displayedMonth.value >= 1)
                displayedMonth.value--;
            else {
                displayedYear.value--;
                displayedMonth.value = 11;
            }
        }
    }
</script>

<style scoped>
 .container {
    display: flex;
    flex-direction: column;
    min-width: 240px;
    height: 320px;
 }

  .month-year {
    display: flex;
    justify-content: space-between;
    align-items: center;
 }

 .weekdays {
    display: flex;
    justify-content: space-around;
    align-items: center;
 }

 .calendar-grid {
    background-color: #ccc;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    width: 100%;
    flex-grow: 1;
    padding: 4px;
 }

 .day__selected {
    background-color: blueviolet;
 }
</style>
