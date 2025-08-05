import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),

    // defineField({
    //   type: 'array',
    //   name: 'sections',
    //   validation: (Rule) => Rule.required(),
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [],
    //     },
    //   ],
    // }),
    defineField({
      type: 'object',
      name: 'metadata',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          type: 'text',
        }),
        defineField({
          type: 'image',
          name: 'image',
        }),
      ],
    }),
  ],
})
