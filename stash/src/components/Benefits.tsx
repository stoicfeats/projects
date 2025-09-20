import { CheckCircle, Zap, Shield, Heart } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Upload your JSON file and see your bookmarks organized instantly. No waiting, no processing delays."
    },
    {
      icon: Shield,
      title: "Privacy First", 
      description: "Your data stays with you. We process everything locally in your browser - no servers, no tracking."
    },
    {
      icon: Heart,
      title: "Designed for Humans",
      description: "Beautiful, intuitive interface that makes browsing your bookmarks a joy, not a chore."
    }
  ];

  const highlights = [
    "Import any Twitter JSON export",
    "Switch between views instantly", 
    "Search and filter your content",
    "Works completely offline",
    "No account required",
    "Mobile-friendly responsive design"
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Why Choose Our
              <span className="text-primary"> Bookmark Viewer?</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-semibold mb-6">Everything You Need</h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};