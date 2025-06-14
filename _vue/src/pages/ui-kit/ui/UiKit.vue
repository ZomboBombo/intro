<script setup lang="ts">
  import UiTitle from '@entities/ui-title'
  import { UiTitleCodeExamples } from '../data'
</script>

<template>
  <UiTitle text="UI-kit" />

  <section class="ui-kit-section">
    <UiTitle text="<UiTitle> component" lvl="h2" />

    <section
      v-for="[key, { descr, usage, output }] in UiTitleCodeExamples"
      :key="key"
    >
      <hgroup>
        <UiTitle :text="key" lvl="h3" />
        <p>{{ descr }}</p>
      </hgroup>

      <pre>
        <code>
          {{ usage }}
        </code>
        <code>
          {{ output }}
        </code>
      </pre>
    </section>
  </section>
</template>

<style scoped lang="scss"></style>
