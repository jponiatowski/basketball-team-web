export default async function SchedulePage({
  params,
}: {
  params: Promise<{ leagueId: string; teamId: string }>;
}) {
  const { leagueId, teamId } = await params;
  return <div>Terminarz</div>;
}
