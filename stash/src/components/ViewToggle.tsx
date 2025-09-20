import { Grid, Image, CreditCard } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ViewMode = "grid" | "gallery" | "card";

interface ViewToggleProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onValueChange }: ViewToggleProps) {
  return (
    <ToggleGroup 
      type="single" 
      value={value} 
      onValueChange={(newValue) => newValue && onValueChange(newValue as ViewMode)}
      className="bg-muted rounded-lg p-1"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Grid</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="gallery" aria-label="Gallery view">
        <Image className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Gallery</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="card" aria-label="Card view">
        <CreditCard className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Card</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}