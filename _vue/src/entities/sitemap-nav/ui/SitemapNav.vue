<script setup lang="ts">
  import RoutesData from '@app/router/config/routes-data'

  const RoutesWithoutSitemap = Object.entries(RoutesData).filter(
    ([key, _]) => key !== 'sitemap'
  )
</script>

<template>
  <nav :class="$style['sitemap-nav']">
    <ol :class="$style['sitemap-nav__list']">
      <li
        v-for="[key, { path, name }] in RoutesWithoutSitemap"
        :key="key"
        :class="$style['sitemap-nav__item']"
      >
        <RouterLink :to="path" :class="$style['sitemap-nav__link']">
          <span>{{ name }}</span>
          <span>{{ path }}</span>
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" module>
  @forward './styles';
</style>
