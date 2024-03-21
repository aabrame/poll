'use client'
import { User } from "@/models/user.model";
import { Avatar, Button, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
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
              <ListItem key={u.id} 
              secondaryAction={
                <>
                  <Button>
                    <Link href={"/users/" + u.id}>
                      Details
                    </Link>
                  </Button>
                  {/* <IconButton edge="end" aria-label="details">
                    <Link href={"/users/" + u.id}>
                      <ReadMoreIcon />
                    </Link>
                  </IconButton>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton> */}
                  <ActionButton aria-label="delete" action={() => handleDelete(u.id)}>
                    <DeleteIcon />
                  </ActionButton>
                  </>
              }>
                <ListItemAvatar>
                  <Avatar> <PersonIcon /> </Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.name} secondary={u.email} />
              </ListItem>
            ))}
          </List>
        </Paper>
  );
}
