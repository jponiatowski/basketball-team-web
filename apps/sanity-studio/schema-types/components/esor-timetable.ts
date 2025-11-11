import {defineType} from 'sanity'
import EsorTimetableSelector from '../../components/esor-timetable-selector'

export const esorTimetable = defineType({
  name: 'esorTimetable',
  type: 'object',
  title: 'ESOR Timetable',
  fields: [
    {name: 'seasonId', title: 'Sezon', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'leagueId', title: 'Liga', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'roundId', title: 'Runda', type: 'string'},
    {name: 'groupId', title: 'Grupa', type: 'string'},
  ],
  preview: {
    select: {
      seasonId: 'seasonId',
      leagueId: 'leagueId',
      roundId: 'roundId',
      groupId: 'groupId',
    },
  },
  components: {
    input: EsorTimetableSelector,
  },
})
