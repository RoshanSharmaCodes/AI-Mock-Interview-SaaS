"use client";
import { db } from "@/config/db";
import { FeedbackSchema } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Feedback({ params }) {
  const { interviewId } = params;
  const [feedbackList, setFeedbackList] = useState([]);
  const handleGetFeedbackData = async () => {
    const result = await db
      .select()
      .from(FeedbackSchema)
      .where(eq(FeedbackSchema.mockIdRef, params.interviewId))
      .orderBy(FeedbackSchema.id);
    if (result) {
      setFeedbackList(result);
    }
  };

  useEffect(() => {
    handleGetFeedbackData();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">
        Congratulations, You have completed your interview!
      </h2>
      <h2 className="text-gray-600 text-2xl">
        Here's you interview feedback...
      </h2>
      <h2 className="my-3 text-lg text-primary">
        Your over all rating is <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview questions with your answer and the expected answer
        with feedback.
      </h2>
      {feedbackList.length>0?<div>
        {feedbackList &&
          feedbackList.map((item, index) => (
            <Collapsible className="w-full mb-3">
              <CollapsibleTrigger className="w-full p-2 my-2 bg-primary text-white items-center rounded-lg flex justify-between text-left">
                {item.question} <ChevronsUpDown width={10} height={10} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mb-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating: </strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-800">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-800">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-800">
                    <strong>Feedback: </strong>
                    {item.correctAns}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
      </div>: <h2>No Feedback Found!</h2>}
      
      <Link href={"/dashboard"}>
        <Button variant="outline" className="border border-primary text-primary hover:text-white hover:bg-primary">Go Home</Button>
      </Link>
    </div>
  );
}
