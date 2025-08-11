import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Stopka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Prawa autorskie',
      type: 'blockContent',
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Linki do Mediów Społecznościowych',
      type: 'reference',
      to: [{type: 'socialMedia'}],
    }),
  ],
})
