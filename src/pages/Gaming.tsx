import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RewardsSystem } from "@/components/gaming/rewards-system";
import { Achievements } from "@/components/gaming/achievements";
import { Leaderboard } from "@/components/gaming/leaderboard";
import { VolunteerProjects } from "@/components/gaming/volunteer-projects";
import { SkillsDevelopment } from "@/components/gaming/skills-development";
import { NawahWallet } from "@/components/gaming/nawah-wallet";
import { 
  Trophy, 
  Star, 
  Gift, 
  Heart, 
  BookOpen,
  Target,
  Users,
  TrendingUp,
  Wallet
} from "lucide-react";

const Gaming = () => {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-space-grotesk mb-4 bg-gradient-primary bg-clip-text text-transparent">
            منصة تمكين الشباب والمرأة
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            طور مهاراتك، شارك في مشاريع تطوعية، واكسب مكافآت قيمة من خلال ألعاب تفاعلية تعليمية
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">نقاطك الحالية</p>
                  <p className="text-2xl font-bold">2,450</p>
                </div>
                <Gift className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">إنجازاتك</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <Trophy className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">المشاريع التطوعية</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <Heart className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">ترتيبك</p>
                  <p className="text-2xl font-bold text-primary">#127</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Gaming Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🎮 مركز الألعاب التعليمية</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-6 lg:w-auto">
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">المحفظة</span>
                </TabsTrigger>
                <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className="hidden sm:inline">المكافآت</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span className="hidden sm:inline">الإنجازات</span>
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">المتصدرون</span>
                </TabsTrigger>
                <TabsTrigger value="volunteer" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">التطوع</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">المهارات</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wallet" className="space-y-6">
                <NawahWallet />
              </TabsContent>

              <TabsContent value="rewards" className="space-y-6">
                <RewardsSystem />
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Achievements />
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <Leaderboard />
              </TabsContent>

              <TabsContent value="volunteer" className="space-y-6">
                <VolunteerProjects />
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <SkillsDevelopment />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default Gaming;
