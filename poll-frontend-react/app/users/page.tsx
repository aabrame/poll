'use client'
import { User } from "@/models/user.model";
import { Avatar, Button, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import ActionButton from "@/components/actionButton";
import { setTimeout } from "timers";

export default function UserList() {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    axios.get<User[]>(process.env.NEXT_PUBLIC_BACK_URL + "users").then(resp => setUsers(resp.data));
  }, [])

  const handleDelete = (id: number) => 
    axios.delete(process.env.NEXT_PUBLIC_BACK_URL + "users/" + id)
    .then(() => setTimeout(() => setUsers(users?.filter(u => u.id !== id)), 2000));
  
  
  return (users === undefined)
      ? <LinearProgress />
      : (
        <Paper elevation={3}  sx={{ width: '100%', maxWidth: 1080, bgcolor: 'background.paper', margin: '15px auto' }}>
          <Link href="/users/add">Add</Link>
          <List>
            {users.map(u => (
              <ListItem key={u.id}>
                <ListItemAvatar>
                  <Avatar> <PersonIcon /> </Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.name} secondary={u.email} />
                <ListItemSecondaryAction sx={{ display: "flex", alignItems: "center"}}>
                  <Link href={"/users/" + u.id} passHref>
                    <Button variant="contained">
                      Details
                    </Button>
                  </Link>
                  <Link href={"/users/" + u.id + "/edit"} passHref style={{marginLeft: '10px'}}>
                    <Button variant="contained">
                      Edit
                    </Button>
                  </Link>
                  <ActionButton aria-label="delete" action={() => handleDelete(u.id)}>
                    Delete
                  </ActionButton>

                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
  );
}
