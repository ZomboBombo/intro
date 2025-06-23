<script setup lang="ts">
  import AppLayoutSetup from './layouts/AppLayoutSetup.vue'
  import RoutesData from './router/config/routes-data.ts'

  const SITEMAP = RoutesData.sitemap
  const SITEMAP_PATH: string = SITEMAP.path
  const SITEMAP_NAME: string = SITEMAP.name
</script>

<template>
  <nav :class="$style['goto-nav']">
    <RouterLink
      v-if="$route.name !== SITEMAP_NAME"
      :to="SITEMAP_PATH"
      :class="$style['goto-nav__link']"
      aria-label="Go to the «Sitemap» page"
    >
      {{ SITEMAP_NAME }}
    </RouterLink>
  </nav>

  <AppLayoutSetup>
    <RouterView />
  </AppLayoutSetup>
</template>

<style module lang="scss">
  .goto-nav {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: var(--gap-site-container-def);

    &__link {
      $t-props: color, background-color, opacity;
      @include trans-config($t-props);

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.3rem 1.2rem;
      font-size: 2.4rem;
      color: var(--ui-secondary);
      border: 0.2rem solid var(--ui-secondary);
      border-radius: 0.75em;

      &:where(:hover, :focus-visible) {
        color: var(--ui-primary);
        background-color: var(--ui-secondary);
      }

      &:active {
        opacity: 0.75;
      }
    }
  }
</style>
