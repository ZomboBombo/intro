<script setup lang="ts">
  import { toKebabCase } from '@shared/utils'
  import type { UiKitNavAnchorI } from '@shared/models'

  defineProps<{
    anchors: UiKitNavAnchorI[]
  }>()
</script>

<template>
  <aside class="ui-kit-nav">
    <nav class="ui-kit-nav__box">
      <menu class="ui-kit-nav__menu">
        <li
          v-for="{ href, name, sublinks } in anchors"
          :key="href"
          class="ui-kit-nav__item"
        >
          <div class="ui-kit-nav__item-head">
            <a
              :href="href"
              :aria-label="`Scroll to «${name}» component examples`"
              class="ui-kit-nav__link"
            >
              &lt;{{ name }}&gt;
            </a>

            <label
              v-if="sublinks"
              class="ui-kit-nav__sublinks-state-controller"
            >
              <input
                type="checkbox"
                aria-label="Change state of the «Sublinks» list"
                aria-pressed="true"
                aria-hidden="true"
              />
            </label>
          </div>

          <div class="ui-kit-nav__item-content">
            <ul v-if="sublinks" class="ui-kit-nav__sublinks">
              <li
                v-for="sl in sublinks"
                :key="sl.href"
                class="ui-kit-nav__subitem"
              >
                <a
                  :href="sl.href"
                  :aria-label="`Scroll to example of the «${toKebabCase(sl.name)}» usage of the «${name}» component`"
                  class="ui-kit-nav__sublink"
                >
                  → {{ sl.name }}
                </a>
              </li>
            </ul>
          </div>
        </li>
      </menu>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
  @forward './styles';
</style>
