"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateInterview() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div onClick={()=> setOpenModal(true)} className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog  open={openModal}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us more about the job description!</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <div className="flex gap-5 justify-end">
                <Button variant="ghost" onClick={()=> setOpenModal(false)}>Cancel</Button>
                <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
