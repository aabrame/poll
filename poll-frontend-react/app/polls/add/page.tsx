'use client'
import PollForm from "@/components/pollForm";
import { Poll } from "@/models/poll.model";
import { ValidatorFn, Validators } from "@/validators/validators";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function PollAdd() {
  const router = useRouter();

  const handleSubmit= (u: Partial<Poll>) => {
    return axios.post(process.env.NEXT_PUBLIC_BACK_URL + "polls", u)
      .then(() => router.push("/polls"));
  }

  return (
    <>
      <PollForm 
      title="New poll" 
      submit={handleSubmit}></PollForm>
    </>
  );
}
