import type {PreviewProps} from 'sanity'
import {Text, Flex} from '@sanity/ui'
import {useEsorGame} from '../base/hooks/use-esor-game'

export default function EsorGamePreview(props: PreviewProps) {
  // @ts-expect-error
  const {leagueId, roundId, groupId, homeTeamId, awayTeamId} = props

  const {game, loading} = useEsorGame({
    leagueId,
    roundId,
    groupId,
    homeTeamId,
    awayTeamId,
  })

  if (loading) {
    return <Text>Ładowanie…</Text>
  }

  // if (!game || !game?.awayTeamName || !game?.homeTeamName || !game?.finalScore) {
  //   return <Text>Nie udało się załadować danych</Text>
  // }

  return (
    <Flex gap={2} padding={4}>
      <Text>{game?.awayTeamName}</Text>
      <Text>{game?.finalScore}</Text>
      <Text>{game?.homeTeamName}</Text>
    </Flex>
  )
}
