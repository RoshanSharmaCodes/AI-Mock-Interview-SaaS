import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function InterviewItemCard({ cardData }) {
  return (
    <div className="border shadow-md rounded-lg p-3">
      <h1 className="font-bold text-primary">{cardData?.jobPosition}</h1>
      <h1 className=" text-gray-700 text-sm">
        {cardData?.jobExperience} Years of Experience
      </h1>
      <h1 className="text-gray-500 text-xs">
        Created At: {cardData?.createdAt}
      </h1>
      <div className="flex justify-between mt-2 gap-5">
        <Link
          href={`/dashboard/interview/${cardData.mockId}/feedback`}
          target="_blank"
        >
          <Button size="sm" variant="outline" className="w-full">
            Feedback
          </Button>
        </Link>
        <Link
          href={`/dashboard/interview/${cardData.mockId}/start`}
          target="_blank"
        >
          <Button size="sm" className="w-full">
            Re-Take
          </Button>
        </Link>
      </div>
    </div>
  );
}
