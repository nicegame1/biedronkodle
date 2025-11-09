import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GameStats } from "@shared/schema";

interface StatsPanelProps {
  stats: GameStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary" data-testid="text-games-played">
              {stats.gamesPlayed}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Played</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary" data-testid="text-win-rate">
              {winRate}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary" data-testid="text-current-streak">
              {stats.currentStreak}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
