<template>
    <div class="calendar" >
        <div class="calendar__header">
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
        <div class="calendar__weekdays">
            <span
                v-for="weekday in weekdays"
                :key="weekday"
                class="weekday"
            >
                {{ weekday }}
            </span>
        </div>
        <div class="calendar__grid">
            <span
                v-for="n in getDaysOffset(displayedYear, displayedMonth)"
                class="calendar__spacing"
                :key="'offset-' + n"
                >
            </span>
            <button
                v-for="day in getDaysInMonth(displayedYear, displayedMonth)"
                @click="changeDate(day)"
                :class="[
                    'calendar__day', {
                    'calendar__day--selected': 
                        displayedYear === selectedDate.getFullYear() 
                        && displayedMonth === selectedDate.getMonth() 
                        && day === selectedDate.getDate()
                    }]"
                :key="day"
                >
                {{ day }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import {locales} from '../utils/locale'
    import type { Language } from '../types/locales';
    import type { CalendarDateString } from '../types/calendar';

    interface CalendarProps {
        modelValue: CalendarDateString | null,
        locale?: Language,
    }

    const {
        modelValue,
        locale: propsLocale,
    } = defineProps<CalendarProps>();

    const emit = defineEmits(['update:modelValue', 'select']);

    const initialDate = modelValue ? new Date(modelValue) : new Date();
    const selectedDate = ref<Date>(initialDate);
    const displayedMonth = ref<number>(initialDate.getMonth());
    const displayedYear = ref<number >(initialDate.getFullYear());

    if(!modelValue){
        emit('update:modelValue', formatDate(initialDate));
    }

    function getDaysInMonth(year: number, month: number): number{
        return new Date(year, month + 1, 0).getDate();
    }


    function getDaysOffset(year: number, month: number): number{
        const firstDay = new Date(year, month, 1).getDay();
        return (firstDay + 6) % 7;
    }

    function formatDate(date: Date): CalendarDateString {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}` as CalendarDateString;
    }
    
    const locale = computed(() => propsLocale ?? 'en');
    const months = computed(() => locales[locale.value].months)
    const weekdays = computed(() => locales[locale.value].weekdays)

    function changeDate(day: number) {
        const date = new Date(displayedYear.value, displayedMonth.value, day);
        selectedDate.value = date;
        emit('update:modelValue', formatDate(date));
        emit('select', formatDate(date));
    }

    function increaseMonth(){
        if(displayedMonth.value <= 10)
            displayedMonth.value++;
        else {
            displayedYear.value++;
            displayedMonth.value = 0;
        }
    }

    function decreaseMonth(){
        if(displayedMonth.value >= 1)
            displayedMonth.value--;
        else {
            displayedYear.value--;
            displayedMonth.value = 11;
        }
    }
</script>

<style scoped>
 .calendar {
    display: flex;
    flex-direction: column;
    min-width: 240px;
    height: 320px;
 }

  .calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
 }

 .calendar__weekdays {
    display: flex;
    justify-content: space-around;
    align-items: center;
 }

 .calendar__grid {
    background-color: #ccc;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    width: 100%;
    flex-grow: 1;
    padding: 4px;
 }

 .calendar__day--selected {
    background-color: #4A90E2;
    color: white;
    /* border-radius: 6px; */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
 }
 .calendar__day:hover {
    background-color: #E0E0E0;
    cursor: pointer;
    color: black;
}
</style>
