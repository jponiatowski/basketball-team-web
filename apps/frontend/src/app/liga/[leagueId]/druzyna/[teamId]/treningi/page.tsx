export default async function TrainingSchedulePage({
  params,
}: {
  params: Promise<{ leagueId: string; teamId: string }>;
}) {
  const { leagueId, teamId } = await params;
  return <div>Treningi</div>;
}
