
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, User } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import StudySession from "@/components/StudySession";
import Profile from "@/components/Profile";
import LoginPage from "@/components/LoginPage";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'categories' | 'study' | 'profile'>('categories');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [studySettings, setStudySettings] = useState({
    questionTypes: ['multiple-choice'],
    numberOfCards: 10
  });
  const [userStats, setUserStats] = useState({
    streak: 7,
    totalPoints: 245,
    level: 3
  });

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'study':
        return (
          <StudySession
            categories={selectedCategories}
            settings={studySettings}
            onComplete={(score) => {
              setUserStats(prev => ({
                ...prev,
                totalPoints: prev.totalPoints + score
              }));
              setCurrentView('categories');
            }}
            onBack={() => setCurrentView('categories')}
          />
        );
      case 'profile':
        return (
          <Profile
            stats={userStats}
            onBack={() => setCurrentView('categories')}
          />
        );
      default:
        return (
          <CategoryGrid
            onStartStudy={(categories, settings) => {
              setSelectedCategories(categories);
              setStudySettings(settings);
              setCurrentView('study');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">PharmaCards</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Level {userStats.level}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-600">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">{userStats.streak} day streak</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-600">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">{userStats.totalPoints} pts</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('profile')}
                className="hover:bg-blue-50"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
    </div>
  );
};

export default Index;
