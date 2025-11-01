import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tractor, Wheat, Clock, Shield, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-farm.jpg";

const Home = () => {
  const features = [
    {
      icon: Tractor,
      title: "Modern Equipment",
      description: "Access to latest tractors and agricultural machinery",
    },
    {
      icon: Clock,
      title: "Flexible Rentals",
      description: "Rent by the hour, day, or month based on your needs",
    },
    {
      icon: Wheat,
      title: "Quality Seeds",
      description: "Certified seeds for maximum yield and crop health",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe transactions with Razorpay integration",
    },
  ];

  const stats = [
    { value: "500+", label: "Equipment Available" },
    { value: "10,000+", label: "Happy Farmers" },
    { value: "50+", label: "Seed Varieties" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Empowering Farmers with
            <br />
            <span className="text-accent">Modern Agriculture Solutions</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Rent tractors and machinery, buy quality seeds - all in one platform designed for Indian farmers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link to="/equipment">
              <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary-hover">
                <Tractor className="mr-2 h-5 w-5" />
                Rent Equipment
              </Button>
            </Link>
            <Link to="/seeds">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Wheat className="mr-2 h-5 w-5" />
                Buy Seeds
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AgroRent?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive agricultural solutions to help you grow your farm business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Farm?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who trust AgroRent for their agricultural needs
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
