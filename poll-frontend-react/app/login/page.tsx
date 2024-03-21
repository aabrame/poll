'use client'
import { ChangeEvent, useContext, useState } from "react"
import { SecurityContext } from "../layout"
import { useRouter } from "next/navigation";


export default function Login() {
    const { login } = useContext(SecurityContext);
    const [credentials, setCredentials] = useState({ email: '', password: ''});
    const [error, setError] = useState("");
    const router = useRouter();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        setError('');
        login(credentials.email, credentials.password)
            .then(() => router.push("/users"))
            .catch(e => setError(e?.toString()));
    }

    return (
        <>
        <h1>Login</h1>
        <input type="text" name="email" value={credentials.email} onChange={handleChange} placeholder="Email"/><br/>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password"/><br/>
        <div>{error}</div>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}