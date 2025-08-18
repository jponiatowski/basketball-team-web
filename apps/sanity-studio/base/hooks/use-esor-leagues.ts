import {useEffect} from 'react'
import {useState} from 'react'
import {EsorEntity} from '../types'
import {sortEsorEntities} from '../utils'

export const useEsorLeagues = () => {
  const [leagues, setLeagues] = useState<EsorEntity[]>([])
  const [loadingLeagues, setLoadingLeagues] = useState(false)

  const fetchLeagues = async () => {
    try {
      setLoadingLeagues(true)
      const response = await fetch(`${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/leagues`)
      const data = (await response.json()) as EsorEntity[]
      setLeagues(sortEsorEntities(data))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingLeagues(false)
    }
  }

  useEffect(() => {
    fetchLeagues()
  }, [])

  return {leagues, loadingLeagues}
}
