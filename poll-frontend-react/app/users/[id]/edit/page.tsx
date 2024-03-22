'use client'
import UserForm from "@/components/userForm";
import { User } from "@/models/user.model";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserEdit({ params }: { params: {id: number}}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    axios.get<User>(process.env.NEXT_PUBLIC_BACK_URL + "users/" + params.id).then(resp => setUser(resp.data));
  }, [params.id]);

  const handleSubmit = async (u: Partial<User>) => {
    return axios.put(process.env.NEXT_PUBLIC_BACK_URL + "users/" + u?.id, u)
      .then(() => router.push("/users"))
  }
  
  return (user === undefined)
  ? <LinearProgress />
  : (
    <UserForm title={'Edit user ' + user.id} submit={handleSubmit} editedUser={user}></UserForm>
  );
}
