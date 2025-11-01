import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tractor, Package, User, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  // Mock data - will be replaced with real data from database
  const activeRentals = [
    {
      id: "1",
      equipment: "John Deere 5050D Tractor",
      startDate: "2025-01-05",
      days: 7,
      location: "Pune, Maharashtra",
      amount: 17500,
    },
  ];

  const previousOrders = [
    {
      id: "1",
      type: "Seeds",
      item: "Premium Wheat Seeds",
      quantity: 50,
      date: "2024-12-15",
      amount: 22500,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your rentals and orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                <Tractor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Equipment currently rented</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Seeds and products purchased</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹40,000</div>
                <p className="text-xs text-muted-foreground">Lifetime spending</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="rentals" className="w-full">
            <TabsList>
              <TabsTrigger value="rentals">Active Rentals</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="rentals" className="space-y-4 mt-6">
              {activeRentals.map((rental) => (
                <Card key={rental.id}>
                  <CardHeader>
                    <CardTitle>{rental.equipment}</CardTitle>
                    <CardDescription>Rental ID: {rental.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Started: {rental.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Duration: {rental.days} days</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{rental.location}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Total: ₹{rental.amount}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="orders" className="space-y-4 mt-6">
              {previousOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle>{order.item}</CardTitle>
                    <CardDescription>Order ID: {order.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Type: </span>
                        <span>{order.type}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Quantity: </span>
                        <span>{order.quantity} kg</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Date: </span>
                        <span>{order.date}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Total: ₹{order.amount}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto">
                      Reorder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">Rajesh Kumar</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">rajesh@example.com</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <p className="text-sm text-muted-foreground">Pune, Maharashtra</p>
                  </div>
                  <Button>Edit Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
