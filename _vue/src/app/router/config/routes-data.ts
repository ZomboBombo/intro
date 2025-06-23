import Home from '@pages/home'
import Sitemap from '@pages/sitemap'
import UiKit from '@pages/ui-kit'

export default {
  home: {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'base',
      title: 'SN',
    },
  },
  sitemap: {
    path: '/sitemap',
    name: 'Sitemap',
    component: Sitemap,
    meta: {
      layout: 'empty',
      title: 'SN: Sitemap',
    },
  },
  'ui-kit': {
    path: '/ui-kit',
    name: 'UI-kit',
    component: UiKit,
    meta: {
      layout: 'empty',
      title: 'SN: UI-kit',
    },
  },
}
