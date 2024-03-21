import { Alert, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { ReactNode, useReducer } from "react";

type StatusType = 'idle' | 'loading' | 'error' | 'success';

function reducer(state: StatusType, action: 'load' | 'success' | 'error'): StatusType {
    switch (action) {
        case "load" :
            return 'loading';
        case "error" :
            return "error";
        case "success" : 
            return "success";
    }
}

export default function ActionButton<T>({ action, children, successMessage = "Success :)", errorMessage = "Error :(" }: { children: ReactNode, action: () => Promise<T>, successMessage?: string, errorMessage?: string}) {
    const [state, dispatch] = useReducer(reducer, 'idle');

    function handleClick() {
        dispatch('load');
        action()
            .then(() => dispatch('success'))
            .catch(() => dispatch('error'));
    }

    let buttonSx = {};
    switch (state) {
        case 'success':
            buttonSx = { '&:disabled': { bgcolor: green[500] }};
            break;
        case 'error':
            buttonSx = { '&:disabled': { bgcolor: red[500] }};
            break;
    }

    return (
        <>
        <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={state !== 'idle'}
          onClick={handleClick}
        >
          {children}
        </Button>
        {state === "loading" && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
        {(state === "success" || state === "error") && (
            <Snackbar 
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                autoHideDuration={2000}
                >
                <Alert
                    severity={state}
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    { state === 'success' ? successMessage : errorMessage }
                </Alert>
            </Snackbar>
        )}
        </>
    )
}