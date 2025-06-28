export interface LinkI {
  href: string
  name: string
}

export interface UiKitNavAnchorI {
  href: string
  name: string
  sublinks?: LinkI[]
}
