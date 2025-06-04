<script setup lang="ts">
  import RoutesData from '@app/router/config/routes-data'

  const { path, name } = RoutesData.home
</script>

<template>
  <RouterLink :to="path">{{ name }}</RouterLink>
</template>

<style scoped lang="scss"></style>
