"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Survey() {
  const router = useRouter();
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const questions = [
    {
      id: 1,
      text: "Timely delivery of PT item:",
      type: "number" as const,
    },
    {
      id: 2,
      text: "Packaging",
      type: "number" as const,
    },
    {
      id: 3,
      text: "Homogeneity of PT item",
      type: "number" as const,
    },
    {
      id: 4,
      text: "Timely delivery of PT report",
      type: "number" as const,
    },
    {
      id: 5,
      text: "Cordiality of PT staff:",
      type: "number" as const,
    },
    {
      id: 6,
      text: "User friendliness of PT report:",
      type: "number" as const,
    },
  ];

  const handleRatingClick = (questionId: number, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [questionId]: rating,
    }));
  };

  const handleSubmit = () => {
    console.log("Survey ratings:", ratings);
    // Handle submission logic here
    alert("Thank you for your feedback!");
    router.push("/dashboard");
  };

  const renderNumberRating = (questionId: number) => {
    const selectedRating = ratings[questionId] || 0;
    const hasRating = selectedRating > 0;
    
    return (
      <div className="flex items-center gap-[10px] flex-nowrap">
        {[1, 2, 3, 4, 5].map((num) => {
          // After clicking, show yellow stars instead of numbers (like Packaging question)
          if (hasRating) {
            const isFilled = num <= selectedRating;
            return (
              <Button
                key={num}
                type="button"
                onClick={() => handleRatingClick(questionId, num)}
                className="flex items-center justify-center w-[106px] h-11 rounded-lg border border-[#D2D2D2] px-[10px] py-[10px] transition-all shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] bg-white shrink-0"
              >
                <Star
                  className={`w-6 h-6 ${
                    isFilled
                      ? "text-[#FFD700] fill-[#FFD700]"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            );
          }
          
          // Show numbers before selection with primary blue hover
          // Button specifications: Width: 106px, Height: Hug (44px), Radius: 8px, Border: 1px #D2D2D2, Padding: 10px, Shadow: 0 2px 1px rgba(0,0,0,0.1)
          const isSelected = selectedRating === num && selectedRating > 0;
          return (
            <Button
              key={num}
              type="button"
              onClick={() => handleRatingClick(questionId, num)}
              className={`flex items-center justify-center w-[106px] h-11 rounded-lg border px-[10px] py-[10px] transition-all text-sm font-semibold shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] shrink-0 ${
                isSelected
                  ? questionId === 1
                    ? "bg-[#FFD700] border-[#FFD700] text-white"
                    : "bg-[#002A80] border-[#002A80] text-white"
                  : "bg-white border-[#D2D2D2] text-gray-700 hover:bg-[#002A80] hover:border-[#002A80] hover:text-white"
              }`}
            >
              {num}
            </Button>
          );
        })}
      </div>
    );
  };

  const renderStarRating = (questionId: number) => {
    const selectedRating = ratings[questionId] || 0;

    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <Button
            key={num}
            type="button"
            onClick={() => handleRatingClick(questionId, num)}
            className={`transition-all ${
              num <= selectedRating
                ? "text-[#FFD700]"
                : "text-gray-300"
            }`}
          >
            <Star
              className={`w-6 h-6 ${
                num <= selectedRating ? "fill-current" : ""
              }`}
            />
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-white px-4 pb-2 pt-1">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Review Your Experience with Us
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Section - Feedback Form */}
          <div className="px-4 py-4 overflow-y-auto  border-gray-300">
            <div className="max-w-2xl mx-auto space-y-3">
              {/* Introductory Box */}
              <div className="pl-30">
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 text-center max-w-md mx-auto">
                  <p className="font-bold text-lg text-gray-800 mb-2">
                    Thank you for taking part
                  </p>
                  <p className="text-sm text-gray-600">
                    Please complete this document to help us improve future sessions.
                  </p>
                </div>
              </div>

              {/* Rating Questions */}
              <div className="space-y-2.5 pl-30">
                {questions.map((question) => (
                  <div key={question.id} className="space-y-1.5">
                    <div className="flex items-start">
                      <span className="font-medium text-sm text-gray-800 w-6 shrink-0">
                        {question.id}.
                      </span>
                      <p className="font-bold text-sm text-gray-800">
                        {question.text}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      {renderNumberRating(question.id)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-center">
                <Button
                  onClick={handleSubmit}
                  className="bg-[#002A80] hover:bg-[#002A80]/90 text-white px-6 py-4 text-sm"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Scientist Image */}
          <div className="px-4 py-4 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <div className="border-2 border-[#002A80] rounded-lg p-2">
                <img
                  src="/images/scientist.png"
                  alt="Scientist working in laboratory"
                  className="w-full h-auto max-w-[420px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

