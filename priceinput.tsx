import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface PriceInputProps {
  onGuess: (price: number) => void;
  disabled?: boolean;
}

export default function PriceInput({ onGuess, disabled }: PriceInputProps) {
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice) && numPrice > 0) {
      onGuess(numPrice);
      setPrice("");
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="price-input" className="block text-sm font-medium mb-2">
              Your guess (PLN)
            </label>
            <div className="relative">
              <Input
                id="price-input"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={price}
                onChange={handlePriceChange}
                disabled={disabled}
                className="text-2xl font-mono text-center pr-16"
                data-testid="input-price"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                PLN
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={disabled || !price || parseFloat(price) <= 0}
            data-testid="button-submit-guess"
          >
            Submit Guess
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
