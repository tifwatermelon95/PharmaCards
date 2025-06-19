
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Flame, Calendar, Target, Award, BookOpen } from "lucide-react";

interface ProfileProps {
  stats: {
    streak: number;
    totalPoints: number;
    level: number;
  };
  onBack: () => void;
}

const Profile = ({ stats, onBack }: ProfileProps) => {
  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first study session', icon: '🎯', earned: true },
    { id: 2, name: 'Week Warrior', description: 'Study for 7 days straight', icon: '🔥', earned: true },
    { id: 3, name: 'Century Club', description: 'Score 100 total points', icon: '💯', earned: true },
    { id: 4, name: 'Perfect Score', description: 'Get 100% on a study session', icon: '⭐', earned: false },
    { id: 5, name: 'Dedication', description: 'Study for 30 days straight', icon: '🏆', earned: false },
    { id: 6, name: 'Knowledge Master', description: 'Reach level 10', icon: '👑', earned: false }
  ];

  const recentActivity = [
    { date: '2024-06-19', category: 'Cardiovascular drugs', score: 8, total: 10 },
    { date: '2024-06-18', category: 'Analgesics', score: 9, total: 15 },
    { date: '2024-06-17', category: 'Anti-infectives', score: 12, total: 12 },
    { date: '2024-06-16', category: 'Endocrine drugs', score: 7, total: 10 }
  ];

  const nextLevelPoints = stats.level * 100;
  const currentLevelProgress = (stats.totalPoints % 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Categories</span>
        </Button>
        <h1 className="text-3xl font-bold text-blue-900">Your Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Overview */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Stats Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.level}</div>
              <div className="text-gray-600">Current Level</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {stats.level + 1}</span>
                  <span>{currentLevelProgress}/100</span>
                </div>
                <Progress value={currentLevelProgress} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Flame className="h-6 w-6 text-orange-500" />
                  <span className="font-medium">Current Streak</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">{stats.streak}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <span className="font-medium">Total Points</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{stats.totalPoints}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  <span className="font-medium">Sessions</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">23</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-500" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="mt-2 bg-green-100 text-green-800">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">{activity.date}</div>
                  <div className="font-medium">{activity.category}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    {activity.score}/{activity.total} correct
                  </Badge>
                  <div className="text-sm font-semibold text-blue-600">
                    {Math.round((activity.score / activity.total) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
