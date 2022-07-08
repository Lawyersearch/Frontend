export interface Category {
  id: number
  name: string
}

export interface CategoryTree {
  id: number
  title: string
  childs?: CategoryTree[]
}

export interface CategoryView {
  id: number
  label: string
  parents: {id: number, label: string}[]
}
