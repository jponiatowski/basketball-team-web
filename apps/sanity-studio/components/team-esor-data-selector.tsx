import React, {useEffect, useMemo, useState} from 'react'
import type {ObjectInputProps} from 'sanity'
import {FormField, set, unset} from 'sanity'
import {Select, Stack, Text} from '@sanity/ui'

type League = {id: string; name: string}
type Team = {id: string; name: string}
type Group = {id: string; name: string}
type Round = {id: string; name: string}

export default function TeamEsorDataSelector(props: ObjectInputProps) {
  const {value, onChange, schemaType} = props

  const leagueId = value?.leagueId ?? ''
  const teamId = value?.teamId ?? ''
  const groupId = value?.groupId ?? ''
  const roundId = value?.roundId ?? ''
  const [leagues, setLeagues] = useState<League[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [rounds, setRounds] = useState<Round[]>([])
  const [loadingLeagues, setLoadingLeagues] = useState(false)
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [loadingGroups, setLoadingGroups] = useState(false)
  const [loadingRounds, setLoadingRounds] = useState(false)
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
      setGroups([])
      // clear team when league is cleared
      if (groupId) {
        onChange(set({...value, groupId: undefined}))
      }
      return
    }
    let cancelled = false
    const ctl = new AbortController()
    setLoadingTeams(true)
    setError(null)

    fetch(
      `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/groups?leagueId=${encodeURIComponent(leagueId)}&roundId=${encodeURIComponent(roundId)}`,
      {
        signal: ctl.signal,
      },
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Groups HTTP ${r.status}`)
        }
        return r.json()
      })
      .then((data: Group[]) => !cancelled && setGroups(data))
      .catch((e) => {
        if (!cancelled) {
          setError('Nie udało się pobrać listy grup.')
        }
        console.error(e)
      })
      .finally(() => !cancelled && setLoadingGroups(false))

    return () => {
      cancelled = true
      ctl.abort()
    }
  }, [leagueId, roundId])

  useEffect(() => {
    if (!leagueId) {
      setRounds([])
      // clear team when league is cleared
      if (roundId) {
        onChange(set({...value, roundId: undefined}))
      }
      return
    }
    let cancelled = false
    const ctl = new AbortController()
    setLoadingTeams(true)
    setError(null)

    fetch(
      `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/rounds?leagueId=${encodeURIComponent(leagueId)}`,
      {
        signal: ctl.signal,
      },
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Rounds HTTP ${r.status}`)
        }
        return r.json()
      })
      .then((data: Round[]) => !cancelled && setRounds(data))
      .catch((e) => {
        if (!cancelled) {
          setError('Nie udało się pobrać listy rund.')
        }
        console.error(e)
      })
      .finally(() => !cancelled && setLoadingRounds(false))

    return () => {
      cancelled = true
      ctl.abort()
    }
  }, [leagueId])

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
      `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/teams?leagueId=${encodeURIComponent(leagueId)}&groupId=${encodeURIComponent(groupId)}`,
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
  }, [leagueId, groupId])

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

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), groupId: next}) : unset(['groupId']))
  }

  const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.currentTarget.value || undefined
    onChange(next ? set({...(value ?? {}), roundId: next}) : unset(['roundId']))
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

      <FormField title="Runda">
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

      <FormField title="Grupa">
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
