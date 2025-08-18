import {useEffect, useState} from 'react'
import {EsorEntity} from '../types'
import {sortEsorEntities} from '../utils'

export const useEsorGroups = (leagueId: string, roundId: string) => {
  const [groups, setGroups] = useState<EsorEntity[]>([])
  const [loadingGroups, setLoadingGroups] = useState(false)

  const fetchGroups = async () => {
    try {
      if (!leagueId || !roundId) {
        setGroups([])
        return
      }

      setLoadingGroups(true)
      const response = await fetch(
        `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/groups?leagueId=${leagueId}&roundId=${roundId}`,
      )
      const data = (await response.json()) as EsorEntity[]

      setGroups(sortEsorEntities(data))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingGroups(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [leagueId, roundId])

  return {groups, loadingGroups}
}
