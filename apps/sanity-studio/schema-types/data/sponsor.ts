import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          {
            title: 'Sponsor strategiczny',
            value: 'strategic',
          },
          {
            title: 'Sponsor tytularny',
            value: 'title',
          },
          {
            title: 'Partner grup młodzieżowych',
            value: 'partner',
          },
        ],
      },
    }),
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'image',
      title: 'Logo',
      description: 'Logo w kolorze białym',
      type: 'image',
    }),
  ],
})
