import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameHeaderProps {
  score: number;
  onNewGame: () => void;
}

export default function GameHeader({ score, onNewGame }: GameHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary">
          Biedronkodle
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm md:text-base font-medium">
          Score: <span className="text-lg font-semibold text-primary" data-testid="text-score">{score}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onNewGame}
          data-testid="button-new-game"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New Game
        </Button>
      </div>
    </header>
  );
}
