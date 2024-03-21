'use client'
import { User } from "@/models/user.model";
import { Button, LinearProgress, Paper } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserDetails({ params }: { params: {id: number}}) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    axios.get<User>(process.env.NEXT_PUBLIC_BACK_URL + "users/" + params.id).then(resp => setUser(resp.data));
  }, [params.id]);

  return (user === undefined)
  ? <LinearProgress />
  : (
    <Paper elevation={3}  sx={{ width: '100%', maxWidth: 1080, bgcolor: 'background.paper', margin: '15px auto' }}>
      { user.name }
      <Button>
        <Link href="/users">
          Back
        </Link>
      </Button>
    </Paper>
);
}
