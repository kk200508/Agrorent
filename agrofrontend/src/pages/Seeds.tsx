import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import wheatSeedsImage from "@/assets/wheat-seeds.jpg";
import riceSeedsImage from "@/assets/rice-seeds.jpg";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Seeds = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const seeds = [
    {
      id: "1",
      name: "Premium Wheat Seeds",
      category: "Wheat",
      price: 450,
      unit: "kg",
      description: "High-yield disease-resistant wheat variety",
      image: wheatSeedsImage,
      stock: 50,
    },
    {
      id: "2",
      name: "Basmati Rice Seeds",
      category: "Rice",
      price: 850,
      unit: "kg",
      description: "Premium quality aromatic rice seeds",
      image: riceSeedsImage,
      stock: 30,
    },
    {
      id: "3",
      name: "Hybrid Corn Seeds",
      category: "Corn",
      price: 650,
      unit: "kg",
      description: "Fast-growing hybrid corn variety",
      image: wheatSeedsImage,
      stock: 40,
    },
    {
      id: "4",
      name: "Organic Soybean Seeds",
      category: "Soybean",
      price: 550,
      unit: "kg",
      description: "Certified organic soybean seeds",
      image: riceSeedsImage,
      stock: 25,
    },
  ];

  const updateQuantity = (id: string, change: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + change);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (seed: typeof seeds[0]) => {
    const qty = quantities[seed.id] || 1;
    addToCart({
      id: seed.id,
      name: seed.name,
      price: seed.price,
      quantity: qty,
      type: "seeds",
      image: seed.image,
    });
    toast({
      title: "Added to Cart",
      description: `${qty} kg of ${seed.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Seeds Store</h1>
            <p className="text-muted-foreground">
              Quality certified seeds for maximum yield and crop health
            </p>
          </div>

          {/* Seeds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {seeds.map((seed) => (
              <Card key={seed.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={seed.image}
                    alt={seed.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3" variant="secondary">
                    {seed.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{seed.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{seed.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">₹{seed.price}</span>
                    <span className="text-sm text-muted-foreground">/{seed.unit}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Stock: {seed.stock} {seed.unit}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(seed.id, -1)}
                      disabled={(quantities[seed.id] || 0) === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantities[seed.id] || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(seed.id, 1)}
                      disabled={(quantities[seed.id] || 1) >= seed.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" onClick={() => handleAddToCart(seed)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Seeds;
