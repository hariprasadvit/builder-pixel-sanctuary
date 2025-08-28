import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Construction className="w-8 h-8 text-gray-400" />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              {description}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              This page is coming soon! Continue chatting to have me build out this section.
            </p>
            <Button variant="outline" className="w-full">
              Continue Building
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
