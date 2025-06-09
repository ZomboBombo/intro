<script setup lang="ts">
  import RoutesData from '@app/router/config/routes-data.ts'
</script>

<template>
  <nav :class="smNav['sitemap-nav']">
    <ol :class="smNav['sitemap-nav__list']">
      <li
        v-for="{ path, name } in RoutesData"
        :key="path"
        :class="smNav['sitemap-nav__item']"
      >
        <RouterLink :to="path" :class="smNav['sitemap-nav__link']">
          <span>{{ name }}</span>
          <span>{{ path }}</span>
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" module="smNav">
  @forward './styles';
</style>
