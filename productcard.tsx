import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

interface ProductCardProps {
  productName: string;
}

export default function ProductCard({ productName }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 rounded-full bg-primary/10">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Guess the price of</p>
            <h2 className="text-2xl md:text-3xl font-semibold" data-testid="text-product-name">
              {productName}
            </h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
