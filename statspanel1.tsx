mport StatsPanel from "../StatsPanel";

export default function StatsPanelExample() {
  const mockStats = {
    gamesPlayed: 15,
    gamesWon: 12,
    currentStreak: 5,
    bestStreak: 8,
  };

  return <StatsPanel stats={mockStats} />;
}
