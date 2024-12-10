"use client";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "sonner";
import { chatSession } from "@/config/aimodal";
import { db } from "@/config/db";
import { FeedbackSchema } from "@/config/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

export default function RecordAnswerSection({
  interviewQueJson,
  activeQueIndex,
  interviewJson,
}) {
  const [userAnswer, setUserAnswer] = useState(
    "spring boot is a javascript based framework"
  );

  const { user } = useUser();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser does not support speech recognition");
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleUserAnswer = async () => {
    if (listening) {
      console.log("Stopping recording...");
      SpeechRecognition.stopListening();
      //   setUserAnswer(transcript);
      const FEEDBACK_PROMPT = `Question: ${interviewQueJson[activeQueIndex].question}, Given Answer: ${userAnswer}. Depends on the question and the answer given by user I want you to provide rating and feedback of 3-4 lines. Evaluate the answers as they were asked in professional interview. Return you feedback in JSON format with rating and feedback as field. And make sure to put no comments in the json.`;
      const feedbackJson = await chatSession.sendMessage(FEEDBACK_PROMPT);
      const cleanFeedbackJSON = feedbackJson?.response
        ?.text()
        .replace("```json", "")
        .replace("```", "");

        console.log("Interview JSON", interviewJson)
        console.log("Interview Question",interviewQueJson[activeQueIndex]?.question)
      const JSONResponse = JSON.parse(cleanFeedbackJSON);
      const resp = await db.insert(FeedbackSchema).values({
        mockIdRef: interviewJson.mockId,
        question: interviewQueJson[activeQueIndex]?.question,
        correctAns: interviewQueJson[activeQueIndex]?.answer,
        userAns: userAnswer,
        feedback: JSONResponse?.feedback,
        rating: JSONResponse?.rating,
        createdAt: moment().format("DD-MM-yyyy"),
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      if(resp){
        toast("User Answer Recorded Successfully!");
        setUserAnswer("")
      }
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center mt-20 justify-center flex-col bg-black w-full h-96">
        <Image alt="Webcam" src={"/webcam.png"} width={200} height={200} />
      </div>
      <Button
        onClick={handleUserAnswer}
        variant="secondary"
        className="border my-5 border-primary text-primary bg-white hover:text-white hover:bg-primary"
      >
        {listening ? (
          <h2 className="text-primary flex gap-2">
            <Mic />
            'Recording...'
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show Record</Button> */}
    </div>
  );
}
