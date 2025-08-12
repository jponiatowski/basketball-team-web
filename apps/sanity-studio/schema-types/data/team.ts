import {defineType, defineField} from 'sanity'
import TeamEsorDataSelector from '../../components/team-esor-data-selector'

export default defineType({
  name: 'team',
  title: 'Drużyna',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) => `/druzyny/${input.toLowerCase().replace(/\s+/g, '-')}`,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie drużyny',
      type: 'image',
    }),
    defineField({
      name: 'coach',
      title: 'Trenerzy',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'coach'}]}],
    }),
    defineField({
      name: 'practice',
      title: 'Treningi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', title: 'Dzień', type: 'string'},
            {
              name: 'details',
              title: 'Szczegóły',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'time', title: 'Godzina', type: 'string'},
                    {name: 'place', title: 'Miejsce', type: 'string'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'esorData',
      title: 'Dane z ESOR',
      type: 'object',
      fields: [
        {name: 'leagueId', title: 'Liga', type: 'string'},
        {name: 'roundId', title: 'Runda', type: 'string'},
        {name: 'groupId', title: 'Grupa', type: 'string'},
        {name: 'teamId', title: 'Drużyna', type: 'string'},
      ],
      components: {
        input: TeamEsorDataSelector,
      },
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val?.leagueId) {
            return 'Wybierz ligę'
          }

          if (!val?.teamId) {
            return 'Wybierz drużynę'
          }
          return true
        }),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
