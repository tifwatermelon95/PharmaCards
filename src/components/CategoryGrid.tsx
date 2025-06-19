
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const categories = [
  { id: 'allergy', name: 'Allergy and anaphylaxis', color: 'bg-red-100 text-red-800', count: 45 },
  { id: 'anaesthetics', name: 'Anaesthetics', color: 'bg-purple-100 text-purple-800', count: 38 },
  { id: 'analgesics', name: 'Analgesics', color: 'bg-orange-100 text-orange-800', count: 52 },
  { id: 'anticancer', name: 'Anticancer drugs', color: 'bg-pink-100 text-pink-800', count: 67 },
  { id: 'antidotes', name: 'Antidotes and antivenoms', color: 'bg-green-100 text-green-800', count: 23 },
  { id: 'antiinfectives', name: 'Anti-infectives', color: 'bg-blue-100 text-blue-800', count: 89 },
  { id: 'blood', name: 'Blood and electrolytes', color: 'bg-red-100 text-red-800', count: 34 },
  { id: 'cardiovascular', name: 'Cardiovascular drugs', color: 'bg-rose-100 text-rose-800', count: 76 },
  { id: 'dermatological', name: 'Dermatological drugs', color: 'bg-yellow-100 text-yellow-800', count: 41 },
  { id: 'ear', name: 'Ear, nose and throat drugs', color: 'bg-teal-100 text-teal-800', count: 29 },
  { id: 'endocrine', name: 'Endocrine drugs', color: 'bg-indigo-100 text-indigo-800', count: 58 },
  { id: 'eye', name: 'Eye drugs', color: 'bg-cyan-100 text-cyan-800', count: 36 },
  { id: 'gastrointestinal', name: 'Gastrointestinal drugs', color: 'bg-lime-100 text-lime-800', count: 49 },
  { id: 'genitourinary', name: 'Genitourinary drugs', color: 'bg-emerald-100 text-emerald-800', count: 42 },
  { id: 'immunomodulators', name: 'Immunomodulators and anti-inflammatories', color: 'bg-violet-100 text-violet-800', count: 31 },
  { id: 'neurological', name: 'Neurological drugs', color: 'bg-slate-100 text-slate-800', count: 84 },
  { id: 'obstetric', name: 'Obstetric and gynaecological drugs', color: 'bg-fuchsia-100 text-fuchsia-800', count: 27 },
  { id: 'psychotropic', name: 'Psychotropic drugs', color: 'bg-purple-100 text-purple-800', count: 63 },
  { id: 'respiratory', name: 'Respiratory drugs', color: 'bg-sky-100 text-sky-800', count: 39 },
  { id: 'vaccines', name: 'Vaccines', color: 'bg-green-100 text-green-800', count: 18 }
];

const questionTypes = [
  { id: 'multiple-choice', name: 'Multiple Choice', description: 'Choose the correct answer from 4 options' },
  { id: 'true-false', name: 'True/False', description: 'Determine if statements are correct' },
  { id: 'multi-answer', name: 'Multiple Answer', description: 'Select all correct options' },
  { id: 'fill-blank', name: 'Fill in the Blank', description: 'Complete the missing information' }
];

interface CategoryGridProps {
  onStartStudy: (categories: string[], settings: any) => void;
}

const CategoryGrid = ({ onStartStudy }: CategoryGridProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['multiple-choice']);
  const [numberOfCards, setNumberOfCards] = useState([10]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleQuestionType = (typeId: string) => {
    setSelectedQuestionTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleStartStudy = () => {
    if (selectedCategories.length > 0 && selectedQuestionTypes.length > 0) {
      onStartStudy(selectedCategories, {
        questionTypes: selectedQuestionTypes,
        numberOfCards: numberOfCards[0]
      });
    }
  };

  return (
    <div className="space-y-8 px-4 pb-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Choose Your Study Categories</h2>
        <p className="text-blue-600 max-w-2xl mx-auto text-sm md:text-base">
          Select the pharmaceutical categories you want to study and customize your learning experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border-2 rounded-xl ${
              selectedCategories.includes(category.id)
                ? 'border-blue-500 shadow-lg bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => toggleCategory(category.id)}
          >
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm md:text-base font-semibold text-blue-900 leading-tight flex-1 pr-2">
                  {category.name}
                </CardTitle>
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => {}}
                  className="ml-2 flex-shrink-0"
                />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <Badge className={`${category.color} text-xs rounded-full`}>
                {category.count} cards
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center justify-center space-x-2 w-full sm:w-auto rounded-xl">
                <Settings className="h-4 w-4" />
                <span>Customize Study Session</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-4 rounded-xl">
              <DialogHeader>
                <DialogTitle>Study Session Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Question Types</h4>
                  <div className="space-y-2">
                    {questionTypes.map((type) => (
                      <div key={type.id} className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedQuestionTypes.includes(type.id)}
                          onCheckedChange={() => toggleQuestionType(type.id)}
                        />
                        <div>
                          <div className="font-medium text-sm">{type.name}</div>
                          <div className="text-xs text-gray-600">{type.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Number of Cards: {numberOfCards[0]}</h4>
                  <Slider
                    value={numberOfCards}
                    onValueChange={setNumberOfCards}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleStartStudy}
            disabled={selectedQuestionTypes.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 w-full sm:w-auto rounded-xl"
          >
            <Play className="h-4 w-4" />
            <span>Start Study Session</span>
            <Badge variant="secondary" className="ml-2 bg-white text-blue-600 rounded-full">
              {selectedCategories.length}
            </Badge>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
