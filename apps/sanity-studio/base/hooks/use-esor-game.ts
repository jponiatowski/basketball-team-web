import {useEffect, useState} from 'react'
import {EsorGame} from '../types'

export const useEsorGame = ({
  leagueId,
  roundId,
  groupId,
  homeTeamId,
  awayTeamId,
}: {
  leagueId: string
  roundId: string
  groupId: string
  homeTeamId: string
  awayTeamId: string
}) => {
  const [game, setGame] = useState<EsorGame | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchGame = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/games?leagueId=${leagueId}&roundId=${roundId}&groupId=${groupId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`,
      )
      const data = await response.json()
      console.log(data)
      setGame(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGame()
  }, [leagueId, roundId, groupId, homeTeamId, awayTeamId])

  return {game, loading}
}
