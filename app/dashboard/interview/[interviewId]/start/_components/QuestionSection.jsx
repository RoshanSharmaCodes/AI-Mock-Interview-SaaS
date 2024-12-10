import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

export default function QuestionSection({ interviewQueJson, activeQueIndex }) {
  const handleTextToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
        alert("Your browser does not support speech.")
    }
  };
  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {interviewQueJson &&
          interviewQueJson.map((item, index) => (
            <h2
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQueIndex === index
                  ? " bg-primary text-white"
                  : "bg-secondary"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">
        Q. {interviewQueJson && interviewQueJson[activeQueIndex].question}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() => handleTextToSpeech(interviewQueJson && interviewQueJson[activeQueIndex].question)}
      />
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-600">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-blue-600 my-2">
          Click on Record Answer when you want to answer the questions. And at
          the end of the interview we will give you the feedback along with
          correct answer for each of question and your answer to compare it.
        </h2>
      </div>
    </div>
  );
}
