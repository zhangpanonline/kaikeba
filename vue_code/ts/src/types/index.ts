export type Feature = {
  id: number,
  name: string
}

export type Select = {
  selected: boolean
}

export type FeatureSelect = Feature & Select