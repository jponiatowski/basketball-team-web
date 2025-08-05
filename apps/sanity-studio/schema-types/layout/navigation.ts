import {defineField, defineType} from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Pozycje',
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
        {
          name: 'subItems',
          title: 'Podpozycje',
          type: 'object',
          fields: [
            {name: 'label', title: 'Tytuł', type: 'string'},
            {
              name: 'items',
              title: 'Pozycje',
              type: 'array',
              of: [
                {
                  name: 'item',
                  title: 'Link',
                  type: 'object',
                  fields: [
                    {name: 'label', title: 'Tytuł', type: 'string'},
                    {name: 'link', title: 'Link', type: 'link'},
                  ],
                },
                {
                  name: 'subItems',
                  title: 'Podpozycje',
                  type: 'object',
                  fields: [
                    {name: 'label', title: 'Tytuł', type: 'string'},
                    {
                      name: 'items',
                      title: 'Pozycje',
                      type: 'array',
                      of: [
                        {
                          name: 'item',
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
            },
          ],
        },
      ],
    }),
  ],
})
