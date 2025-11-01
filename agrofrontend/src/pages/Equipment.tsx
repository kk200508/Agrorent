import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import tractorImage from "@/assets/tractor-1.jpg";
import harvesterImage from "@/assets/harvester-1.jpg";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Equipment = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedEquipment, setSelectedEquipment] = useState<typeof equipment[0] | null>(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState("");

  const equipment = [
    {
      id: "1",
      name: "John Deere 5050D Tractor",
      type: "Tractor",
      price: 2500,
      location: "Pune, Maharashtra",
      description: "50 HP tractor perfect for all farming operations",
      image: tractorImage,
      available: true,
    },
    {
      id: "2",
      name: "Mahindra 475 DI Tractor",
      type: "Tractor",
      price: 2200,
      location: "Nashik, Maharashtra",
      description: "42 HP reliable tractor for medium-sized farms",
      image: tractorImage,
      available: true,
    },
    {
      id: "3",
      name: "New Holland Harvester",
      type: "Harvester",
      price: 5000,
      location: "Ahmednagar, Maharashtra",
      description: "Efficient harvester for wheat and rice",
      image: harvesterImage,
      available: true,
    },
    {
      id: "4",
      name: "Kubota Rotavator",
      type: "Machinery",
      price: 1500,
      location: "Solapur, Maharashtra",
      description: "Heavy-duty rotavator for soil preparation",
      image: harvesterImage,
      available: false,
    },
  ];

  const handleRentNow = (item: typeof equipment[0]) => {
    setSelectedEquipment(item);
    setRentalDays(1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setStartDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleAddToCart = () => {
    if (!selectedEquipment || !startDate) return;

    addToCart({
      id: selectedEquipment.id,
      name: selectedEquipment.name,
      price: selectedEquipment.price,
      quantity: 1,
      type: "equipment",
      image: selectedEquipment.image,
      rentalDays,
      startDate,
    });

    toast({
      title: "Added to Cart",
      description: `${selectedEquipment.name} for ${rentalDays} day(s) added to your cart`,
    });

    setSelectedEquipment(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Equipment Rental</h1>
            <p className="text-muted-foreground">
              Choose from our wide range of tractors and agricultural machinery
            </p>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className="absolute top-3 right-3"
                    variant={item.available ? "default" : "secondary"}
                  >
                    {item.available ? "Available" : "Rented"}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription className="mt-1">{item.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                    <span className="text-sm text-muted-foreground">/day</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={!item.available}
                    onClick={() => handleRentNow(item)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.available ? "Rent Now" : "Not Available"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Rental Dialog */}
      <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rent {selectedEquipment?.name}</DialogTitle>
            <DialogDescription>
              Choose your rental period and start date
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Number of Days</Label>
              <Input
                id="days"
                type="number"
                min="1"
                value={rentalDays}
                onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            {selectedEquipment && (
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rate per day:</span>
                  <span className="font-medium">₹{selectedEquipment.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Number of days:</span>
                  <span className="font-medium">{rentalDays}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{selectedEquipment.price * rentalDays}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEquipment(null)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart} disabled={!startDate}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Equipment;
