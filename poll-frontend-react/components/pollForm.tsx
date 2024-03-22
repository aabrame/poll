'use client'
import { Poll } from "@/models/poll.model";
import { ValidatorFn, Validators } from "@/validators/validators";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function PollForm<T>({ 
    title, 
    submit, 
    editedPoll = { name: "", options: []}
  } : { 
    title: string, 
    submit: (u: Partial<Poll>) => Promise<T> 
    editedPoll?: Partial<Poll>
  }) {
  const [poll, setPoll] = useState(editedPoll);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [validationMessage, setValidationMessage] = useState<{ [key: string]: any }>({});
  const router = useRouter();
  const validators: { [key: string]: ValidatorFn[] } = {
    name: [ Validators.required, Validators.forbiddenValue("aurelien")],
  }

  const handleSubmit = () => {
    setErrorMessage(undefined);
    submit(poll)
      .catch(e => setErrorMessage("error : " + e));
  }

  const handleCancel = () => router.push("/polls");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPoll({ ...poll, [e.target.name]: e.target.value });
    const errors = validators[e.target.name]
      .map(vfn => vfn(e.target.value))
      .reduce((pv, cv) => ({ ...pv, ...cv}), {});
    setValidationMessage({ ...validationMessage, [e.target.name]: errors })
  }

  const handleInputOptionChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPoll({
      ...poll,
      options: poll.options!.map((o, i) => (i === index)
        ? { ...o, [e.target.name]: e.target.value }
        : o)
    });
  }

  const handleAddOption = () => {
    setPoll({
      ...poll,
      options : [ ...poll.options!, { id: 0, name: '', votes: 0}]
    });
  }

  const handleDeleteOption = (index: number) => {
    setPoll({
      ...poll,
      options: [ ...poll.options!.filter((_,i) => i !== index)]
    });
  }

  return (
    <>
    <h1>{title}</h1>
      <TextField 
        label="Name"
        variant="outlined" 
        name="name" 
        onChange={handleInputChange} 
        value={poll.name}
        error={validationMessage['name'] && Object.values(validationMessage['name']).length !== 0}
        helperText={validationMessage['name'] && Object.values(validationMessage['name']).join(', ')}
        />

      {poll.options!.map((o, i) => (

        <TextField 
          key={i}
          label="Option name"
          variant="outlined" 
          name={`name`}
          onChange={e => handleInputOptionChange(i, e)} 
          value={o.name}
          InputProps={{
            endAdornment: <InputAdornment position="start">
              <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleDeleteOption(i)}
                    edge="end"
                  >
                    <DeleteIcon></DeleteIcon>
              </IconButton>
            </InputAdornment>,
          }}/>
      ))}
      <Button variant="contained" onClick={handleAddOption}>Add option</Button>


      {/* {validationMessage['name'] && <span>{Object.values(validationMessage['name']).join(', ')}</span>} */}
      {/* <br/> */}
      {/* <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={poll.email}/><br/>
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={poll.password}/><br/>
      { errorMessage && <div>{errorMessage}</div>} */}
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
