import { Card, CardContent } from "@/components/ui/card";
import { Grid3X3, Images, ChevronLeft, ChevronRight } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Grid3X3,
      title: "Grid View",
      description: "See all your bookmarks at once in a clean, organized grid. Perfect for quick scanning and finding what you're looking for.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Images,
      title: "Gallery View", 
      description: "Experience your tweets as a beautiful visual gallery. Focus on images, videos, and rich content in an immersive layout.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: ChevronRight,
      title: "Slider Navigation",
      description: "Browse through your bookmarks one by one with smooth left/right navigation. Perfect for deep reading and focused consumption.",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="py-24 bg-feature">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Three Ways to View,
            <span className="text-primary"> Infinite Possibilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every person browses differently. That's why we've created three distinct viewing modes 
            to match your unique style and needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-soft">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};