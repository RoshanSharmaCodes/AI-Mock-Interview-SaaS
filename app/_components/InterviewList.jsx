"use client";
import { db } from "@/config/db";
import { FeedbackSchema, MockInterviewSchema } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator"
import InterviewItemCard from "./InterviewItemCard";


export default function InterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  const handleGetAllMockInterviews = async () => {
    const result = await db
      .select()
      .from(MockInterviewSchema)
      .where(
        eq(
          MockInterviewSchema.createdBy,
          user?.primaryEmailAddress?.emailAddress
        )
      );

    if (result) {
      console.log(result);
      setInterviewList(result);
    }
  };

  useEffect(() => {
    user&&handleGetAllMockInterviews();
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-lg font-semibold">Previous Mock Interview</h2>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3">
      {
        interviewList&&interviewList.map((item, index)=><InterviewItemCard cardData={item}/>)
      }
      </div>
    </div>
  );
}
