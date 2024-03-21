'use client'
import { ValidatorFn, Validators } from "@/validators/validators";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function UserAdd() {
  const [user, setUser] = useState({ name: "", email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState<string>();
  const [validationMessage, setValidationMessage] = useState<{ [key: string]: any }>({});
  const router = useRouter();
  const validators: { [key: string]: ValidatorFn[] } = {
    name: [ Validators.required, Validators.forbiddenValue("admin")],
    email: [],
    password: [ Validators.required ]
  }

  const handleSubmit= () => {
    setErrorMessage(undefined);
    axios.post(process.env.NEXT_PUBLIC_BACK_URL + "users", user)
      .then(() => router.push("/users"))
      .catch(e => setErrorMessage("error : " + e));
  }

  const handleCancel= () => router.push("/users");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    const errors = validators[e.target.name]
      .map(vfn => vfn(e.target.value))
      .reduce((pv, cv) => ({ ...pv, ...cv}));
    setValidationMessage({ ...validationMessage, [e.target.name]: errors })
  }

  return (
    <>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} value={user.name}/>
      {validationMessage['name'] && <span>{Object.values(validationMessage['name']).join(', ')}</span>}
      <br/>
      <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={user.email}/><br/>
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={user.password}/><br/>
      { errorMessage && <div>{errorMessage}</div>}
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
