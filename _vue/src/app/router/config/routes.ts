import RoutesData from './routes-data'

import Home from '@pages/home'
import Sitemap from '@pages/sitemap'
import UiKit from '@pages/ui-kit'

export const routes = [
  { ...RoutesData['home'], component: Home },
  { ...RoutesData['sitemap'], component: Sitemap },
  { ...RoutesData['ui-kit'], component: UiKit },
]
