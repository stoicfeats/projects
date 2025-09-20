import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-primary-gradient text-white relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Bookmarks?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Upload your Twitter JSON export and see your bookmarks come to life 
            in beautiful, organized views.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="secondary" size="lg" className="group bg-white text-primary hover:bg-white/90">
              <Upload className="mr-2 h-5 w-5" />
              Upload Your JSON
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-white/80">
            No account needed • Works instantly • 100% private
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </section>
  );
};