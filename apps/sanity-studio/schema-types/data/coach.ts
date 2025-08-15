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
      readOnly: true,
      options: {
        source: 'name',
        slugify: (input) => `/trenerzy/${input.toLowerCase().replace(/\s+/g, '-')}`,
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
      validation: (Rule) => Rule.required(),
      fields: [
        {name: 'email', title: 'E-mail', type: 'email', validation: (Rule) => Rule.required()},
        {name: 'phone', title: 'Telefon', type: 'string', validation: (Rule) => Rule.required()},
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
