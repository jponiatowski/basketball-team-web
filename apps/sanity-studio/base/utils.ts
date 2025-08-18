import {EsorEntity} from './types'

export const camelCaseToRegular = (str: string): string => {
  return (
    str
      // Insert a space before any uppercase letter that follows a lowercase letter
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize first letter of each word
      .replace(/\b\w/g, (c) => c.toUpperCase())
  )
}

export const sortEsorEntities = (entities: EsorEntity[]) => {
  return [...entities].sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}
