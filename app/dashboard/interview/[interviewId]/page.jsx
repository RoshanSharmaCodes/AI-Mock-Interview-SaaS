"use client";
import { db } from "@/config/db";
import { MockInterviewSchema } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Interview({ params }) {
  const [interviewId, setInterviewId] = useState("");
  const [interviewJson, setInterviewJson] = useState();
  const [webCamEnable, setWebCamEnable] = useState(false);
  const { user } = useUser();

  const handleGetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterviewSchema)
      .where(
        and(
          eq(
            user?.primaryEmailAddress?.emailAddress,
            MockInterviewSchema.createdBy
          ),
          eq(interviewId, MockInterviewSchema.mockId)
        )
      );
    console.log("Interview Details", result);
    setInterviewJson(result[0]);
  };

  useEffect(() => {
    async function handleParams() {
      const param = await params;
      setInterviewId(param.interviewId);
    }
    handleParams();
  }, []);

  useEffect(() => {
    user && handleGetInterviewDetails();
    console.log("Interview Json", interviewJson);
  }, [user]);
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position</strong>:{" "}
              {interviewJson?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description</strong>: {interviewJson?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Relevant Experience</strong>:{" "}
              {interviewJson?.jobExperience}
            </h2>
          </div>
          <div className="border p-3 border-red-400 bg-yellow-200 rounded-md">
            <h2 className="flex gap-2 mb-2 text-red-500">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="text-gray-500">
              This AI Mock Interview is a simulated environment designed to
              provide practice and feedback, but it does not guarantee success
              in actual interviews. Responses and evaluations are based on AI
              algorithms and should be complemented with personalized learning
              and human mentoring.
            </h2>
          </div>
        </div>
        <div className="flex flex-col">
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="w-full h-72 p-10 bg-secondary rounded-md border mb-3" />
              <Button
                variant="secondary"
                className="border"
                onClick={() => setWebCamEnable(true)}
              >
                Enable Camera & Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link
          target="_blank"
          href={`/dashboard/interview/${interviewId}/start`}
        >
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}
