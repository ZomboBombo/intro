import RoutesData from './routes-data.ts'

import Home from '@/pages/home'
import Sitemap from '@/pages/sitemap'

export const routes = [
  { ...RoutesData.home, component: Home },
  { ...RoutesData.sitemap, component: Sitemap },
]
