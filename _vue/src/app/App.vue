<script setup lang="ts">
  import AppLayoutSetup from './layouts/AppLayoutSetup.vue'
  import RoutesData from './router/config/routes-data.ts'
</script>

<template>
  <nav v-if="$route.name === 'Home'">
    <ol>
      <li v-for="{path, name} in RoutesData">
        <RouterLink :to="path">{{ name }}</RouterLink>
      </li>
    </ol>
  </nav>

  <AppLayoutSetup>
    <RouterView />
  </AppLayoutSetup>

<!--  <BaseLayout v-if="$route.meta.layout === 'base'">-->
<!--    <RouterView />-->
<!--  </BaseLayout>-->

<!--  <EmptyLayout v-if="$route.meta.layout === 'empty'">-->
<!--    <RouterView />-->
<!--  </EmptyLayout>-->
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
