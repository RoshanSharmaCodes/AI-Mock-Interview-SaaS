"use client";
import { db } from "@/config/db";
import { MockInterviewSchema } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function StartInterview({ params }) {
  const [interviewId, setInterviewId] = useState("");
  const [interviewJson, setInterviewJson] = useState();
  const [interviewQues, setInterviewQues] = useState();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const handleGetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterviewSchema)
      .where(eq(interviewId, MockInterviewSchema.mockId));
    console.log("Result", result);
    setInterviewJson(result[0]);
    if (result[0]?.jsonMockResponse) {
      setInterviewQues(JSON.parse(result[0]?.jsonMockResponse));
    }
  };

  useEffect(() => {
    async function handleParams() {
      const param = await params;
      setInterviewId(param.interviewId);
    }
    handleParams();
  }, []);

  useEffect(() => {
    handleGetInterviewDetails();
    console.log("Interview Json", interviewJson);
  }, [interviewId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Question */}
      <div>
        {interviewQues && (
          <QuestionSection
            activeQueIndex={activeQuestionIdx}
            interviewQueJson={interviewQues}
          />
        )}
      </div>

      {/* Webcam */}
      <div>
        <RecordAnswerSection
          activeQueIndex={activeQuestionIdx}
          interviewQueJson={interviewQues}
          interviewJson={interviewJson}
        />
        <div className="flex justify-center gap-3 mb-2">
          {activeQuestionIdx != 0 && (
            <Button
              onClick={() =>
                setActiveQuestionIdx((activeIndex) => activeIndex - 1)
              }
            >
              {" "}
              <ChevronLeft /> Previous Question
            </Button>
          )}
          {activeQuestionIdx != interviewQues?.length && (
            <Button
              onClick={() =>
                setActiveQuestionIdx((activeIndex) => activeIndex + 1)
              }
            >
              Next Question <ChevronRight />
            </Button>
          )}
          <Link href={"/dashboard/interview/" + interviewId + "/feedback"}>
            <Button className="bg-green-500 hover:bg-green-600">
              End Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
