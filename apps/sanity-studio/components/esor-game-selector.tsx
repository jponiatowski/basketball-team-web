import {ObjectInputProps} from 'sanity'
import {Select, Stack, Text} from '@sanity/ui'
import {FormField, set, unset} from 'sanity'
import {useEsorLeagues} from '../base/hooks/use-esor-leagues'
import {useEsorGroups} from '../base/hooks/use-esor-groups'
import {useEsorRounds} from '../base/hooks/use-esor-rounds'
import {useEsorTeams} from '../base/hooks/use-esor-teams'

export default function EsorGameSelector(props: ObjectInputProps) {
  const {value, onChange, schemaType} = props

  const leagueId = value?.leagueId ?? ''
  const roundId = value?.roundId ?? ''
  const groupId = value?.groupId ?? ''
  const homeTeamId = value?.homeTeamId ?? ''
  const awayTeamId = value?.awayTeamId ?? ''

  const {leagues, loadingLeagues} = useEsorLeagues()
  const {rounds, loadingRounds} = useEsorRounds(leagueId)
  const {groups, loadingGroups} = useEsorGroups(leagueId, roundId)
  const {teams, loadingTeams} = useEsorTeams(leagueId, groupId)

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined

    onChange(next ? set({...(value ?? {}), leagueId: next}) : unset(['leagueId']))
  }

  const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), roundId: next}) : unset(['roundId']))
  }

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), groupId: next}) : unset(['groupId']))
  }

  const handleHomeTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), homeTeamId: next}) : unset(['homeTeamId']))
  }

  const handleAwayTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), awayTeamId: next}) : unset(['awayTeamId']))
  }

  return (
    <Stack space={4}>
      <FormField title="Liga" description={schemaType.description}>
        <Select value={leagueId} onChange={handleLeagueChange} disabled={loadingLeagues}>
          <option value="">{loadingLeagues ? 'Ładowanie…' : 'Wybierz ligę'}</option>
          {leagues.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField title="Runda" description={schemaType.description}>
        <Select value={roundId} onChange={handleRoundChange} disabled={!leagueId || loadingRounds}>
          <option value="">
            {!leagueId ? 'Najpierw wybierz ligę' : loadingRounds ? 'Ładowanie…' : 'Wybierz rundę'}
          </option>
          {rounds.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField title="Grupa" description={schemaType.description}>
        <Select value={groupId} onChange={handleGroupChange} disabled={!leagueId || loadingGroups}>
          <option value="">
            {!leagueId ? 'Najpierw wybierz ligę' : loadingGroups ? 'Ładowanie…' : 'Wybierz grupę'}
          </option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField title="Drużyna gospodarzy" description={schemaType.description}>
        <Select
          value={homeTeamId}
          onChange={handleHomeTeamChange}
          disabled={!leagueId || loadingTeams}
        >
          <option value="">
            {!leagueId ? 'Najpierw wybierz ligę' : loadingTeams ? 'Ładowanie…' : 'Wybierz drużynę'}
          </option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField title="Drużyna gości" description={schemaType.description}>
        <Select
          value={awayTeamId}
          onChange={handleAwayTeamChange}
          disabled={!leagueId || loadingTeams}
        >
          <option value="">
            {!leagueId ? 'Najpierw wybierz ligę' : loadingTeams ? 'Ładowanie…' : 'Wybierz drużynę'}
          </option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </FormField>
    </Stack>
  )
}
