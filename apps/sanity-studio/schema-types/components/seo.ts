import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
    }),
  ],
})
