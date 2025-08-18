import {useState, useEffect} from 'react'
import {EsorEntity} from '../types'
import {sortEsorEntities} from '../utils'

export const useEsorRounds = (leagueId: string) => {
  const [rounds, setRounds] = useState<EsorEntity[]>([])
  const [loadingRounds, setLoadingRounds] = useState(false)

  const fetchRounds = async () => {
    try {
      if (!leagueId) {
        setRounds([])
        return
      }

      setLoadingRounds(true)
      const response = await fetch(
        `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/rounds?leagueId=${leagueId}`,
      )
      const data = (await response.json()) as EsorEntity[]
      setRounds(sortEsorEntities(data))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingRounds(false)
    }
  }

  useEffect(() => {
    fetchRounds()
  }, [leagueId])

  return {rounds, loadingRounds}
}
