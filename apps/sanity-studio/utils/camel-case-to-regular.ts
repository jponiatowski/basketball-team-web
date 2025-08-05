export const camelCaseToRegular = (str: string): string => {
  return (
    str
      // Insert a space before any uppercase letter that follows a lowercase letter
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize first letter of each word
      .replace(/\b\w/g, (c) => c.toUpperCase())
  )
}
