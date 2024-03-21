import { SecurityContext } from "@/app/layout";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";


export function NavBar() {
    const { connectedUser, logout } = useContext(SecurityContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ marginRight: "15px" }}>
                        Polls
                    </Typography>
                    <Link href="/users" passHref><Button sx={{ color: "white" }}>Users</Button></Link>
                    <Link href="/polls" passHref><Button sx={{ color: "white" }}>Polls</Button></Link>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    { (connectedUser === undefined) ? (
                            <Link href="/login" passHref><Button sx={{ color: "white" }}>Login</Button></Link>
                        ) : (
                            <>
                                <span>Hello {connectedUser?.name} !</span>
                                <Button color="inherit" onClick={() => logout()}>Logout</Button>
                            </>
                        )
                    }


                </Toolbar>
            </AppBar>
        </Box>
    );
}