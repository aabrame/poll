'use client'
import { Poll } from "@/models/poll.model";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Avatar, Box, Button, FormControlLabel, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import ActionButton from "@/components/actionButton";
import { setTimeout } from "timers";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SecurityContext } from "../layout";

export default function PollList() {
  const [polls, setPolls] = useState<Poll[] | undefined>(undefined);
  const { connectedUser } = useContext(SecurityContext);

  useEffect(() => {
    axios.get<Poll[]>(process.env.NEXT_PUBLIC_BACK_URL + "polls").then(resp => setPolls(resp.data));
  }, [])

  const handleDelete = (id: number) =>
    axios.delete(process.env.NEXT_PUBLIC_BACK_URL + "polls/" + id)
      .then(() => setTimeout(() => setPolls(polls?.filter(u => u.id !== id)), 2000));


  return (polls === undefined)
    ? <LinearProgress />
    : (
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 1080, bgcolor: 'background.paper', margin: '15px auto' }}>
        <Link href="/polls/add">Add</Link>
        {polls.map(p => (
          <Accordion key={p.id}>
            <AccordionSummary>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div><strong>{p.name}</strong></div>
              </Box>

            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {p.options.map(o => (
                  <FormControlLabel key={o.id} value={o.id} control={<Radio />} label={o.name + " - " + o.votes + " votes"} />
                ))}
              </RadioGroup>
            </AccordionDetails>
            <AccordionActions>
              <Link href={"/polls/" + p.id} passHref>
                <Button variant="contained">
                  Details
                </Button>
              </Link>
              {connectedUser?.id === p.creator.id && (
                <>
                  <Link href={"/polls/" + p.id + "/edit"} passHref style={{ marginLeft: '5px' }}>
                    <Button variant="contained">
                      Edit
                    </Button>
                  </Link>
                  <ActionButton aria-label="delete" action={() => handleDelete(p.id)}>
                    Delete
                  </ActionButton>
                </>
              )}
            </AccordionActions>
          </Accordion>
        ))}
      </Paper>
    );
}
