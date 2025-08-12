import React, {useEffect, useMemo, useState} from 'react'
import type {ObjectInputProps} from 'sanity'
import {FormField, set, unset} from 'sanity'
import {Select, Stack, Text} from '@sanity/ui'

type League = {id: string; name: string}
type Team = {id: string; name: string}

export default function TeamEsorDataSelector(props: ObjectInputProps) {
  const {value, onChange, schemaType} = props

  const leagueId = value?.leagueId ?? ''
  const teamId = value?.teamId ?? ''

  const [leagues, setLeagues] = useState<League[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [loadingLeagues, setLoadingLeagues] = useState(false)
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const ctl = new AbortController()
    setLoadingLeagues(true)
    setError(null)

    fetch(`${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/leagues`, {signal: ctl.signal})
      .then((r) => {
        if (!r.ok) throw new Error(`Leagues HTTP ${r.status}`)
        return r.json()
      })
      .then((data: League[]) => !cancelled && setLeagues(data))
      .catch((e) => {
        if (!cancelled) setError('Nie udało się pobrać listy lig.')
        console.error(e)
      })
      .finally(() => !cancelled && setLoadingLeagues(false))

    return () => {
      cancelled = true
      ctl.abort()
    }
  }, [])

  useEffect(() => {
    if (!leagueId) {
      setTeams([])
      // clear team when league is cleared
      if (teamId) {
        onChange(set({...value, teamId: undefined}))
      }
      return
    }
    let cancelled = false
    const ctl = new AbortController()
    setLoadingTeams(true)
    setError(null)

    fetch(
      `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/teams?leagueId=${encodeURIComponent(leagueId)}`,
      {
        signal: ctl.signal,
      },
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Teams HTTP ${r.status}`)
        }
        return r.json()
      })
      .then((data: Team[]) => !cancelled && setTeams(data))
      .catch((e) => {
        if (!cancelled) {
          setError('Nie udało się pobrać listy drużyn.')
        }
        console.error(e)
      })
      .finally(() => !cancelled && setLoadingTeams(false))

    return () => {
      cancelled = true
      ctl.abort()
    }
  }, [leagueId])

  const teamsWithSelection = useMemo(() => {
    if (!teamId || teams.some((t) => t.id === teamId)) {
      return teams
    }
    return [{id: teamId, name: `⚠︎ (missing) ${teamId}`} as Team, ...teams]
  }, [teams, teamId])

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(
      next
        ? set({...(value ?? {}), leagueId: next, teamId: undefined})
        : set({leagueId: undefined, teamId: undefined}),
    )
  }

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), teamId: next}) : unset(['teamId']))
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

      <FormField title="Drużyna">
        <Select value={teamId} onChange={handleTeamChange} disabled={!leagueId || loadingTeams}>
          <option value="">
            {!leagueId ? 'Najpierw wybierz ligę' : loadingTeams ? 'Ładowanie…' : 'Wybierz drużynę'}
          </option>
          {teamsWithSelection.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </FormField>

      {error && <Text>{error}</Text>}
    </Stack>
  )
}
