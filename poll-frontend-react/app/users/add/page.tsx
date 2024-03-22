'use client'
import UserForm from "@/components/userForm";
import { User } from "@/models/user.model";
import { ValidatorFn, Validators } from "@/validators/validators";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function UserAdd() {
  const router = useRouter();

  const handleSubmit= (u: Partial<User>) => {
    return axios.post(process.env.NEXT_PUBLIC_BACK_URL + "users", u)
      .then(() => router.push("/users"));
  }

  return (
    <>
      <UserForm 
      title="New user" 
      submit={handleSubmit}></UserForm>
    </>
  );
}
