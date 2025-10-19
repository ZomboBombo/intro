<script setup lang="ts"></script>

<template>
  <header>HEADER</header>

  <main class="site-main">
    <slot />
  </main>

  <footer>FOOTER</footer>
</template>

<style scoped lang="scss">
  /**
  * ===[ TEMPO STYLES]===
  *
  * This is a temporary styles.
  * It'll be removed after real components will be added.
  */
  header,
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 3rem;
    font: {
      size: 4.8rem;
      weight: 700;
    }
    text-transform: uppercase;
  }

  header {
    background-color: hsl(0 100% 50% / 0.5);
  }

  footer {
    margin-block-start: auto;
    background-color: hsl(220 100% 50% / 0.5);
  }
</style>
