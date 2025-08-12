import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'coach',
  title: 'Trener',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Imię i nazwisko',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie trenera',
      type: 'image',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Kontakt',
      type: 'object',
      fields: [
        {name: 'email', title: 'E-mail', type: 'email'},
        {name: 'phone', title: 'Telefon', type: 'string'},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
