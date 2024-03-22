'use client'
import PollForm from "@/components/pollForm";
import { Poll } from "@/models/poll.model";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PollEdit({ params }: { params: {id: number}}) {
  const [poll, setPoll] = useState<Poll | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    axios.get<Poll>(process.env.NEXT_PUBLIC_BACK_URL + "polls/" + params.id).then(resp => setPoll(resp.data));
  }, [params.id]);

  const handleSubmit = async (u: Partial<Poll>) => {
    return axios.put(process.env.NEXT_PUBLIC_BACK_URL + "polls/" + u?.id, u)
      .then(() => router.push("/polls"))
  }
  
  return (poll === undefined)
  ? <LinearProgress />
  : (
    <PollForm title={'Edit poll ' + poll.id} submit={handleSubmit} editedPoll={poll}></PollForm>
  );
}
