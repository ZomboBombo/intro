<script setup lang="ts">
  import UiTitle from '@entities/ui-title'
  import { UiTitleCodeExamples } from '../data'

  const onCopyCodeUsage = (e: MouseEvent): void => {
    e.preventDefault()

    const copybtn = e.currentTarget as HTMLButtonElement
    const copybtnDefaultTextContent = copybtn.textContent
    const target = copybtn.parentElement!.querySelector('code')

    if (!target) {
      return
    }

    const treatedTargetText = target.textContent!.trim()

    navigator.clipboard.writeText(treatedTargetText)

    copybtn.textContent = 'Copied!'
    copybtn.setAttribute('disabled', '')

    setTimeout(() => {
      copybtn.textContent = copybtnDefaultTextContent
      copybtn.removeAttribute('disabled')
    }, 1800)
  }
</script>

<template>
  <UiTitle text="UI-kit" is-centered-horizontal />

  <section class="ui-kit-section">
    <h2 class="ui-kit-section__title">The &lt;UiTitle&gt; component</h2>

    <section
      v-for="[key, { descr, usage, output }] in UiTitleCodeExamples"
      :key="key"
      class="ui-kit-subsec"
    >
      <hgroup class="ui-kit-subsec__heading">
        <h3 class="ui-kit-subsec__title">{{ key }}</h3>
        <p class="ui-kit-subsec__descr">{{ descr }}</p>
      </hgroup>

      <div class="ui-kit-subsec__example">
        <strong class="ui-kit-subsec__example-title">Usage:</strong>

        <pre class="ui-kit-subsec__example-demo">
          <code>
            {{ usage }}
          </code>

          <button
              type="button"
              class="ui-kit-subsec__example-copybtn"
              title="Click to copy `usage fragment` to clipboard"
              aria-label="Click to copy `usage fragment` to clipboard"
              @click="onCopyCodeUsage"
          >Copy</button>
        </pre>
      </div>

      <div class="ui-kit-subsec__example">
        <strong class="ui-kit-subsec__example-title">Output:</strong>

        <pre class="ui-kit-subsec__example-demo">
          <code>
            {{ output }}
          </code>
        </pre>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
  @forward './styles';
</style>
