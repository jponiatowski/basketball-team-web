import {useEffect, useState} from 'react'
import {EsorEntity} from '../types'

export const useEsorSeasons = () => {
  const [seasons, setSeasons] = useState<EsorEntity[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSeasons = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.SANITY_STUDIO_FRONTEND_URL}/api/esor/seasons`)
      const data = await response.json()
      console.log(data)
      setSeasons(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeasons()
  }, [])

  return {seasons, loadingSeasons: loading}
}
