import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialMedia',
  title: 'Media Społecznościowe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      initialValue: 'Media społecznościowe',
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Linki do Mediów Społecznościowych',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Link',
          name: 'socialMediaItem',
          fields: [
            {
              name: 'media',
              title: 'Media',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook', type: 'string'},
                  {title: 'Instagram', value: 'instagram', type: 'string'},
                  {title: 'YouTube', value: 'youtube', type: 'string'},
                  {title: 'LinkedIn', value: 'linkedin', type: 'string'},
                  {title: 'TikTok', value: 'tiktok', type: 'string'},
                  {title: 'X', value: 'x', type: 'string'},
                ],
              },
            },
            {
              name: 'link',
              title: 'Link',
              type: 'link',
            },
          ],
        },
      ],
    }),
  ],
})
