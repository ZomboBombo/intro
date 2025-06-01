<script lang="ts">
  import { markRaw, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import BaseLayout from './base-layout'

  export default {
    name: 'AppLayoutSetup',
    setup() {
      const layout = markRaw(BaseLayout)
      const route = useRoute()

      watch(
          () => route.meta,
          async (meta) => {
            try {
              const metaLayout = meta?.layout ?? 'base'
              const component = await import(/* @vite-ignore */`./${metaLayout}-layout/`)

              layout.value = component.default ?? BaseLayout
            } catch (err) {
              layout.value = BaseLayout
            }
          },
          { immediate: true },
      )

      return { layout }
    },
  }
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>
