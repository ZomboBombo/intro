<script setup lang="ts">
  type UiTitleLvlT = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  defineProps<{
    text: string
    lvl?: UiTitleLvlT
  }>()
</script>

<template>
  <component
    :is="lvl ?? 'h1'"
    :class="['ui-code', 'ui-title', `ui-title--${lvl ?? 'h1'}`]"
  >
    {{ text }}
  </component>
</template>

<style module lang="scss"></style>
