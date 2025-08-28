import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFireworks } from "@/hooks/useFireworks";

export default function FireworkTest() {
  const { triggerFireworks, FireworksComponent } = useFireworks();
  const [testCount, setTestCount] = useState(0);

  const handleTest = () => {
    triggerFireworks();
    setTestCount(prev => prev + 1);
  };

  return (
    <>
      <FireworksComponent />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                🎆 Firework Test Page 🎆
              </CardTitle>
              <p className="text-gray-600">
                Test the custom firework effect to make sure it's working properly
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button 
                  onClick={handleTest}
                  size="lg"
                  className="text-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Launch Fireworks! 🚀
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">What to expect:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Multiple colorful particle explosions across the screen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Success message overlay with celebration text
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Particles fall with gravity and fade out naturally
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Effect lasts for about 3 seconds
                  </li>
                </ul>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Tests run:</strong> {testCount}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Each test creates 150 particles across 5 explosion points
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Integration Info:</h4>
                <p className="text-sm text-yellow-700">
                  This firework effect is also triggered when:
                </p>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• Applying coupon code "1234" in the cart</li>
                  <li>• Completing a successful payment</li>
                  <li>• Any other success actions throughout the app</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  ← Go Back
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "/cart"}
                  className="w-full"
                >
                  Test in Cart →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
