'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, User, Image, TrendingUp, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-yellow-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-yellow-900">
                    Share Your Culinary Creations
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our community of food lovers and share your favorite recipes and food photos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-10 bg-yellow-500 text-yellow-900 px-8 shadow transition-colors hover:bg-yellow-600">
                    Get Started
                  </Button>
                  <Button className="h-10 bg-transparent border border-yellow-500 text-yellow-900 px-8 shadow-sm transition-colors hover:bg-yellow-500 hover:text-yellow-900">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/picsum/200/300"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-900">Explore Trending Recipes</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the hottest recipes shared by our community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" />
                    <AvatarFallback>TR</AvatarFallback>
                  </Avatar>
                  <CardTitle>Chocolate Cake</CardTitle>
                  <CardDescription>By John Doe</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="Recipe" className="rounded-md object-cover" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
                    <Heart className="mr-2" /> Like
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" />
                    <AvatarFallback>TR</AvatarFallback>
                  </Avatar>
                  <CardTitle>Pasta Carbonara</CardTitle>
                  <CardDescription>By Jane Smith</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" alt="Recipe" className="rounded-md object-cover" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
                    <Heart className="mr-2" /> Like
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" />
                    <AvatarFallback>TR</AvatarFallback>
                  </Avatar>
                  <CardTitle>Avocado Toast</CardTitle>
                  <CardDescription>By Emily Davis</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="Recipe" className="rounded-md object-cover" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
                    <Heart className="mr-2" /> Like
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-900">Join Our Community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with other food enthusiasts and share your recipes.
                </p>
              </div>
              <Button className="bg-yellow-500 text-yellow-900 px-8 py-3 shadow-md hover:bg-yellow-600">
                <User className="mr-2" /> Sign Up Now
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-900">Download Our App</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the full experience by downloading our mobile app.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="h-10 bg-yellow-500 text-yellow-900 px-8 shadow transition-colors hover:bg-yellow-600">
                  <Image className="mr-2" /> App Store
                </Button>
                <Button className="h-10 bg-yellow-500 text-yellow-900 px-8 shadow transition-colors hover:bg-yellow-600">
                  <Image className="mr-2" /> Google Play
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-yellow-200 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#" className="text-yellow-900">Features</a>
            <a href="#" className="text-yellow-900">Integrations</a>
            <a href="#" className="text-yellow-900">Pricing</a>
            <a href="#" className="text-yellow-900">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#" className="text-yellow-900">About Us</a>
            <a href="#" className="text-yellow-900">Careers</a>
            <a href="#" className="text-yellow-900">Blog</a>
            <a href="#" className="text-yellow-900">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#" className="text-yellow-900">Documentation</a>
            <a href="#" className="text-yellow-900">Help Center</a>
            <a href="#" className="text-yellow-900">Community</a>
            <a href="#" className="text-yellow-900">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#" className="text-yellow-900">Privacy Policy</a>
            <a href="#" className="text-yellow-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;