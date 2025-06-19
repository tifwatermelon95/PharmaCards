
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import Confetti from "react-confetti";

// Sample questions data
const generateQuestions = (categories: string[], questionTypes: string[], count: number) => {
  const sampleQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'cardiovascular',
      question: 'Which medication is a first-line treatment for hypertension?',
      options: ['Amlodipine', 'Morphine', 'Aspirin', 'Insulin'],
      correct: 'Amlodipine',
      explanation: 'Amlodipine is a calcium channel blocker commonly used as first-line therapy for hypertension.'
    },
    {
      id: 2,
      type: 'true-false',
      category: 'analgesics',
      question: 'Morphine is an opioid analgesic used for severe pain management.',
      correct: 'true',
      explanation: 'Morphine is indeed an opioid analgesic used for managing severe pain.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: 'antiinfectives',
      question: 'What is the mechanism of action of penicillin?',
      options: ['Protein synthesis inhibition', 'Cell wall synthesis inhibition', 'DNA replication inhibition', 'Membrane disruption'],
      correct: 'Cell wall synthesis inhibition',
      explanation: 'Penicillin inhibits bacterial cell wall synthesis by targeting peptidoglycan formation.'
    },
    {
      id: 4,
      type: 'fill-blank',
      category: 'endocrine',
      question: 'The hormone _____ is produced by the pancreas and regulates blood glucose levels.',
      correct: 'insulin',
      explanation: 'Insulin is produced by beta cells in the pancreas and helps regulate blood glucose levels.'
    },
    {
      id: 5,
      type: 'multi-answer',
      category: 'respiratory',
      question: 'Which of the following are bronchodilators? (Select all that apply)',
      options: ['Albuterol', 'Salmeterol', 'Prednisone', 'Ipratropium'],
      correct: ['Albuterol', 'Salmeterol', 'Ipratropium'],
      explanation: 'Albuterol, Salmeterol, and Ipratropium are all bronchodilators. Prednisone is a corticosteroid.'
    }
  ];

  // Generate questions based on selected parameters
  return Array.from({ length: count }, (_, index) => ({
    ...sampleQuestions[index % sampleQuestions.length],
    id: index + 1
  }));
};

interface StudySessionProps {
  categories: string[];
  settings: {
    questionTypes: string[];
    numberOfCards: number;
  };
  onComplete: (score: number) => void;
  onBack: () => void;
}

const StudySession = ({ categories, settings, onComplete, onBack }: StudySessionProps) => {
  const [questions] = useState(() => 
    generateQuestions(categories, settings.questionTypes, settings.numberOfCards)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const checkAnswer = () => {
    let isCorrect = false;
    
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false' || currentQuestion.type === 'fill-blank') {
      isCorrect = selectedAnswer.toString().toLowerCase() === currentQuestion.correct.toString().toLowerCase();
    } else if (currentQuestion.type === 'multi-answer') {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
      const correct = Array.isArray(currentQuestion.correct) ? currentQuestion.correct : [currentQuestion.correct];
      isCorrect = selected.length === correct.length && selected.every(ans => correct.includes(ans));
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswered(true);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setAnswered(false);
    } else {
      setSessionComplete(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onComplete(score);
      }, 3000);
    }
  };

  const handleMultiAnswerChange = (option: string) => {
    const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    setSelectedAnswer(updated);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => setSelectedAnswer(option)}
                disabled={answered}
              >
                {option}
              </Button>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option.toLowerCase() ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => setSelectedAnswer(option.toLowerCase())}
                disabled={answered}
              >
                {option}
              </Button>
            ))}
          </div>
        );

      case 'multi-answer':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                variant={Array.isArray(selectedAnswer) && selectedAnswer.includes(option) ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleMultiAnswerChange(option)}
                disabled={answered}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 border-2 rounded ${
                    Array.isArray(selectedAnswer) && selectedAnswer.includes(option) 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {Array.isArray(selectedAnswer) && selectedAnswer.includes(option) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </Button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Type your answer here..."
              disabled={answered}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (sessionComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <>
        {showConfetti && <Confetti />}
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Trophy className="h-24 w-24 text-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold text-yellow-800">Congratulations!</h2>
              <div className="space-y-4">
                <div className="text-6xl font-bold text-yellow-600">{percentage}%</div>
                <p className="text-xl text-yellow-700">
                  You scored {score} out of {questions.length} questions correctly!
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">
                  +{score} points earned
                </Badge>
              </div>
              <Button
                onClick={() => onComplete(score)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Categories</span>
        </Button>
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            Score: {score}/{questions.length}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card className="p-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className="bg-blue-100 text-blue-800 capitalize">
              {currentQuestion.type.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {currentQuestion.category}
            </Badge>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderQuestion()}

          {showResult && (
            <div className={`p-4 rounded-lg ${answered ? (
              selectedAnswer.toString().toLowerCase() === currentQuestion.correct.toString().toLowerCase() ||
              (Array.isArray(selectedAnswer) && Array.isArray(currentQuestion.correct) && 
               selectedAnswer.length === currentQuestion.correct.length && 
               selectedAnswer.every(ans => currentQuestion.correct.includes(ans)))
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            ) : ''}`}>
              <div className="flex items-center space-x-2 mb-2">
                {selectedAnswer.toString().toLowerCase() === currentQuestion.correct.toString().toLowerCase() ||
                 (Array.isArray(selectedAnswer) && Array.isArray(currentQuestion.correct) && 
                  selectedAnswer.length === currentQuestion.correct.length && 
                  selectedAnswer.every(ans => currentQuestion.correct.includes(ans))) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
                <span className="font-semibold">
                  {selectedAnswer.toString().toLowerCase() === currentQuestion.correct.toString().toLowerCase() ||
                   (Array.isArray(selectedAnswer) && Array.isArray(currentQuestion.correct) && 
                    selectedAnswer.length === currentQuestion.correct.length && 
                    selectedAnswer.every(ans => currentQuestion.correct.includes(ans))) 
                    ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            {!answered ? (
              <Button 
                onClick={checkAnswer} 
                disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700">
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudySession;
