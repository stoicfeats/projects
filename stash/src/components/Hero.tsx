import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-hero-gradient pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Transform Your
            <span className="bg-primary-gradient bg-clip-text text-transparent block">
              Twitter Bookmarks
            </span>
            Into Visual Stories
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop losing track of your saved tweets. Our intelligent viewer transforms your Twitter bookmarks 
            into beautiful, organized galleries you'll actually want to browse.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="lg" className="group">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="group bg-white/10 border-white/20 text-foreground hover:bg-white/20">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            No sign-up required • Works with any Twitter JSON export • Free forever
          </div>
        </div>
      </div>
      
      {/* Floating decoration */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-primary-glow/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
    </section>
  );
};