import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Stopka',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),

    defineField({
      name: 'items',
      title: 'Grupy linków',
      type: 'array',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            {name: 'title', title: 'Tytuł', type: 'string'},
            {
              name: 'links',
              title: 'Linki',
              type: 'array',
              of: [
                {
                  name: 'link',
                  title: 'Link',
                  type: 'object',
                  fields: [
                    {name: 'label', title: 'Tytuł', type: 'string'},
                    {name: 'link', title: 'Link', type: 'link'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
