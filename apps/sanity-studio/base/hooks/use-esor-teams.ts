import {useEffect} from 'react'
import {useState} from 'react'
import {EsorEntity} from '../types'
import {sortEsorEntities} from '../utils'

export const useEsorTeams = (leagueId: string, groupId: string) => {
  const [teams, setTeams] = useState<EsorEntity[]>([])
  const [loadingTeams, setLoadingTeams] = useState(false)

  const fetchTeams = async () => {
    if (!leagueId || !groupId) {
      setTeams([])
      return
    }

    try {
      setLoadingTeams(true)
      const response = await fetch(
        `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/teams?leagueId=${leagueId}&groupId=${groupId}`,
      )
      const data = (await response.json()) as EsorEntity[]
      setTeams(sortEsorEntities(data))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingTeams(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [leagueId, groupId])

  return {teams, loadingTeams}
}
