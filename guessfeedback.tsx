import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Check } from "lucide-react";
import type { Guess } from "@shared/schema";

interface GuessFeedbackProps {
  guesses: Guess[];
}

export default function GuessFeedback({ guesses }: GuessFeedbackProps) {
  if (guesses.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Your Guesses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-3 rounded-md bg-muted/50"
            data-testid={`guess-item-${index}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">#{guesses.length - index}</span>
              <span className="font-mono font-semibold">{guess.guessedPrice.toFixed(2)} PLN</span>
            </div>
            <div className="flex items-center gap-2">
              {guess.isCorrect ? (
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                  <Check className="h-3 w-3 mr-1" />
                  Correct!
                </Badge>
              ) : (
                <>
                  <span className="text-sm text-muted-foreground">
                    {Math.abs(guess.difference).toFixed(2)} PLN off
                  </span>
                  <Badge variant="outline">
                    {guess.difference > 0 ? (
                      <>
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Too high
                      </>
                    ) : (
                      <>
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Too low
                      </>
                    )}
                  </Badge>
                </>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
