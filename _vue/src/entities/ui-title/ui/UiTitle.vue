<script setup lang="ts">
  import type { UiTitleI } from '@entities/ui-title/config'

  const {
    notHeading = false,
    isCenteredHorizontal,
    tag,
    lvl = 'h1',
  } = defineProps<UiTitleI>()

  const definedTag = tag ?? 'strong'
  const definedComponent = notHeading || tag ? definedTag : lvl
  const headingLevelCssMod = notHeading || tag ? '' : `ui-title--${lvl}`
  const centeredHorizontalCssMod = isCenteredHorizontal
    ? 'ui-title--centered-horizontal'
    : ''
</script>

<template>
  <component
    :is="definedComponent"
    :class="[
      'ui-code',
      'ui-title',
      headingLevelCssMod,
      centeredHorizontalCssMod,
    ]"
  >
    {{ text }}
  </component>
</template>

<style module lang="scss"></style>
