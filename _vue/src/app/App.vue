<script setup lang="ts">
  import HelloWorld from '@/entities/hello-world'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style lang="scss">
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms ease;

    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }

    &.vue:hover {
      filter: drop-shadow(0 0 2em #42b883aa);
    }
  }
</style>
