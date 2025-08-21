<template>
    <button
        @click="switchLanguage"
        class="lang-switcher"
    >
        {{ lang.toLocaleUpperCase() }}
    </button>
</template>

<script setup lang="ts">
import type { Language } from '../types/locales';

interface LangSwitcherProps {
    modelValue: Language;
}

const { modelValue: lang } = defineProps<LangSwitcherProps>();
const emit = defineEmits(['update:modelValue'])

    function switchLanguage(){
        const newLang = lang === 'en' ? 'ru' : 'en';
        emit('update:modelValue', newLang);
    }

</script>

<style scoped>
.lang-switcher {
    width: 100%;
    border: gray solid 1px;
}
</style>
