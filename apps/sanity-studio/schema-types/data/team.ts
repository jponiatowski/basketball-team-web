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
            {
              name: 'day',
              title: 'Dzień',
              type: 'string',
              options: {
                list: [
                  {title: 'Poniedziałek', value: 'monday'},
                  {title: 'Wtorek', value: 'tuesday'},
                  {title: 'Środa', value: 'wednesday'},
                  {title: 'Czwartek', value: 'thursday'},
                  {title: 'Piątek', value: 'friday'},
                  {title: 'Sobota', value: 'saturday'},
                  {title: 'Niedziela', value: 'sunday'},
                ],
              },
            },
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
                    {
                      name: 'coach',
                      title: 'Trenerzy',
                      type: 'array',
                      of: [{type: 'reference', to: [{type: 'coach'}]}],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ageGroup',
      title: 'Grupa wiekowa',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {name: 'from', title: 'Od', type: 'number', validation: (Rule) => Rule.required()},
        {name: 'to', title: 'Do', type: 'number', validation: (Rule) => Rule.required()},
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
