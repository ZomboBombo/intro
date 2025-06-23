<script setup lang="ts">
  import AppLayoutSetup from './layouts/AppLayoutSetup.vue'
  import RoutesData from './router/config/routes-data.ts'

  const SITEMAP = RoutesData.sitemap
  const SITEMAP_PATH: string = SITEMAP.path
  const SITEMAP_NAME: string = SITEMAP.name
</script>

<template>
  <nav>
    <RouterLink v-if="$route.name !== SITEMAP_NAME" :to="SITEMAP_PATH">
      {{ SITEMAP_NAME }}
    </RouterLink>
  </nav>

  <AppLayoutSetup>
    <RouterView />
  </AppLayoutSetup>
</template>

<style lang="scss"></style>
