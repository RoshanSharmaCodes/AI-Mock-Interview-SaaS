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

export default function CreateInterview() {
  const [openModal, setOpenModal] = useState(false);
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
              <form>
                <div>
                  <h2 className="">
                    Fill out the details accurately to get the best of it.
                  </h2>
                  <div className="mt-10 my-2">
                    <label>Job Role / Job Position </label>
                    <Input
                      placeholder="Ex: Frontend Developer, UI/UX Engineer"
                      required
                    />
                  </div>
                  <div className="mt-5 my-2">
                    <label>Job Description / Tech Stack</label>
                    <Textarea
                      placeholder="Paste the job description if you have or tell us about the job skills required."
                      required
                    />
                  </div>
                  <div className="mt-5 my-2">
                    <label>No. of Experience</label>
                    <Input placeholder="Ex: 2, 3, 5" type="number" max="30" required />
                  </div>
                </div>
                <div className="flex gap-5 justify-end my-3">
                  <Button type="button" variant="ghost" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Start Interview</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
