"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/config/aimodal";
import { Loader2Icon } from "lucide-react";
import { db } from "@/config/db";
import { MockInterviewSchema } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function CreateInterview() {
  const [openModal, setOpenModal] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleInterviewCreation = async (e) => {
    e.preventDefault();
    setLoading(true);
    const PROMPT = `Job role: ${jobRole}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}.
Depends on this information please give me 7 Interview Questions and answers in json format. Give question and answer as field in json.
And make sure to not put any comments anywhere in json. Just a clean and formatted json.`;
    const resp = await chatSession.sendMessage(PROMPT);
    const cleanData = resp?.response
      ?.text()
      .replace("```json", "")
      .replace("```", "");
    setJsonResponse(cleanData);
    console.log(cleanData);
    if (cleanData) {
      const result = await db
        .insert(MockInterviewSchema)
        .values({
          jsonMockResponse: cleanData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          jobPosition: jobRole,
          jobDesc: jobDesc,
          jobExperience: jobExp,
          mockId: uuidv4(),
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterviewSchema.mockId });
        router.push("/dashboard/interview/"+result[0]?.mockId)
    } else {
        console.log("Error: CleanUp Data was wrong")
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        onClick={() => setOpenModal(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openModal} className="max-w-2xl">
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us about the job description!
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleInterviewCreation}>
                <div>
                  <h2 className="">
                    Fill out the details accurately to get the best of it.
                  </h2>
                  <div className="mt-10 my-2">
                    <label>Job Role / Job Position </label>
                    <Input
                      placeholder="Ex: Frontend Developer, UI/UX Engineer"
                      onChange={(e) => setJobRole(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-5 my-2">
                    <label>Job Description / Tech Stack</label>
                    <Textarea
                      placeholder="Paste the job description if you have or tell us about the job skills required."
                      onChange={(e) => setJobDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-5 my-2">
                    <label>No. of Experience</label>
                    <Input
                      placeholder="Ex: 2, 3, 5"
                      type="number"
                      onChange={(e) => setJobExp(e.target.value)}
                      max="30"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end my-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">
                    {" "}
                    {isLoading ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
