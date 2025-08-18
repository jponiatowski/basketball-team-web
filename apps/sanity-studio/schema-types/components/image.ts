import {defineField, defineType} from 'sanity'

export const imageBlock = defineType({
  name: 'imageBlock',
  type: 'object',
  title: 'Image',
  fields: [
    defineField({
      name: 'file',
      type: 'image',
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt',
      validation: (Rule) => Rule.required().error('Alt is required'),
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
})
