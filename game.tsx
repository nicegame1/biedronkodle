import { useState, useEffect } from "react";
import GameHeader from "@/components/GameHeader";
import ProductCard from "@/components/ProductCard";
import PriceInput from "@/components/PriceInput";
import GuessFeedback from "@/components/GuessFeedback";
import StatsPanel from "@/components/StatsPanel";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import type { Guess, GameStats } from "@shared/schema";

// todo: remove mock functionality - this will be replaced with API calls
const BIEDRONKA_PRODUCTS = [
  { name: "Mleko 2L", price: 5.49 },
  { name: "Chleb 500g", price: 3.29 },
  { name: "Masło 200g", price: 6.29 },
  { name: "Jaja 10 szt.", price: 12.99 },
  { name: "Ser żółty 1kg", price: 24.99 },
  { name: "Szynka 200g", price: 8.99 },
  { name: "Woda mineralna 1.5L", price: 1.99 },
  { name: "Kawa mielona 250g", price: 15.99 },
  { name: "Cukier 1kg", price: 4.49 },
  { name: "Mąka pszenna 1kg", price: 3.79 },
  { name: "Olej słonecznikowy 1L", price: 7.99 },
  { name: "Papryka czerwona 1kg", price: 9.99 },
  { name: "Pomidory 1kg", price: 6.99 },
  { name: "Banan 1kg", price: 5.99 },
  { name: "Jogurt naturalny 400g", price: 3.49 },
  { name: "Herbata czarna 100 saszetek", price: 11.99 },
  { name: "Czekolada mleczna 100g", price: 3.99 },
  { name: "Płyn do naczyń 500ml", price: 4.99 },
  { name: "Papier toaletowy 8 rolek", price: 9.99 },
  { name: "Pasta do zębów 75ml", price: 5.49 },
];

export default function Game() {
  const [currentProduct, setCurrentProduct] = useState(BIEDRONKA_PRODUCTS[0]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    bestStreak: 0,
  });
  const [usedProducts, setUsedProducts] = useState<Set<number>>(new Set());

  const getRandomProduct = () => {
    const availableIndices = BIEDRONKA_PRODUCTS.map((_, i) => i).filter(
      (i) => !usedProducts.has(i)
    );

    if (availableIndices.length === 0) {
      setUsedProducts(new Set());
      const randomIndex = Math.floor(Math.random() * BIEDRONKA_PRODUCTS.length);
      return { product: BIEDRONKA_PRODUCTS[randomIndex], index: randomIndex };
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    return { product: BIEDRONKA_PRODUCTS[randomIndex], index: randomIndex };
  };

  const startNewGame = () => {
    const { product, index } = getRandomProduct();
    setCurrentProduct(product);
    setUsedProducts((prev) => new Set(prev).add(index));
    setGuesses([]);
    setGameWon(false);
  };

  const handleGuess = (guessedPrice: number) => {
    const actualPrice = currentProduct.price;
    const difference = guessedPrice - actualPrice;
    const isCorrect = Math.abs(difference) < 0.01;

    const newGuess: Guess = {
      guessedPrice,
      actualPrice,
      difference,
      isCorrect,
    };

    setGuesses((prev) => [...prev, newGuess]);

    if (isCorrect) {
      setGameWon(true);
      setScore((prev) => prev + 1);
      setStats((prev) => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
      }));
    }
  };

  const handleNextProduct = () => {
    startNewGame();
  };

  const handleNewGame = () => {
    setScore(0);
    setStats({
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
    setUsedProducts(new Set());
    startNewGame();
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GameHeader score={score} onNewGame={handleNewGame} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <ProductCard productName={currentProduct.name} />
          
          {gameWon ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 p-8 rounded-lg bg-green-50 dark:bg-green-950/20 border-2 border-green-500">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                    Correct!
                  </h3>
                  <p className="text-muted-foreground">
                    The price is <span className="font-mono font-bold">{currentProduct.price.toFixed(2)} PLN</span>
                  </p>
                </div>
                <Button
                  onClick={handleNextProduct}
                  size="lg"
                  data-testid="button-next-product"
                >
                  Next Product
                </Button>
              </div>
            </div>
          ) : (
            <PriceInput onGuess={handleGuess} disabled={gameWon} />
          )}

          <GuessFeedback guesses={guesses} />
          
          <StatsPanel stats={stats} />
        </div>
      </main>
    </div>
  );
}
