import {defineType, defineField} from 'sanity'
import EsorGameSelector from '../../components/esor-game-selector'
import EsorGamePreview from '../../components/esort-game-preview'

export const esorGame = defineType({
  name: 'esorGame',
  type: 'object',
  title: 'ESOR Game',
  fields: [
    {name: 'leagueId', title: 'Liga', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'roundId', title: 'Runda', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'groupId', title: 'Grupa', type: 'string'},
    {
      name: 'homeTeamId',
      title: 'Drużyna gospodarzy',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'awayTeamId',
      title: 'Drużyna gości',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      leagueId: 'leagueId',
      roundId: 'roundId',
      groupId: 'groupId',
      homeTeamId: 'homeTeamId',
      awayTeamId: 'awayTeamId',
    },
  },
  components: {
    input: EsorGameSelector,
    preview: EsorGamePreview,
  },
})
