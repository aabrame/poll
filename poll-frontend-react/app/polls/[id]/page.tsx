'use client'
import { Poll } from "@/models/poll.model";
import { Button, LinearProgress, Paper } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PollDetails({ params }: { params: {id: number}}) {
  const [poll, setPoll] = useState<Poll | undefined>(undefined);

  useEffect(() => {
    axios.get<Poll>(process.env.NEXT_PUBLIC_BACK_URL + "polls/" + params.id).then(resp => setPoll(resp.data));
  }, [params.id]);

  return (poll === undefined)
  ? <LinearProgress />
  : (
    <Paper elevation={3}  sx={{ width: '100%', maxWidth: 1080, bgcolor: 'background.paper', margin: '15px auto' }}>
      { poll.name }
      <Button>
        <Link href="/polls">
          Back
        </Link>
      </Button>
    </Paper>
  );
}
