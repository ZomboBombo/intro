<script lang="ts">
  /* eslint-disable no-console */

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
            const metaLayoutName = meta?.layout ?? 'base'
            const component = await import(
              /* @vite-ignore */
              `./${metaLayoutName}-layout/`
            )

            layout.value = component.default ?? BaseLayout
          } catch (err: unknown) {
            layout.value = BaseLayout

            console.error(`
              Something went wrong while loading layout.
              =---=
              ${(err as Error).message}
            `)
          }
        },
        { immediate: true }
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
