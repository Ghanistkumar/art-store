import React from 'react';
import { Button, TextField, Grid, Link } from '@mui/material';

interface Props {
    toggleView: () => void;
}

const LoginForm: React.FC<Props> = ({ toggleView }) => {
    return (
        <form>
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" fullWidth variant="contained" style={{backgroundColor :'black'}}>
                Login
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" onClick={toggleView} variant="body2">
                        Don't have an account? Sign up
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};

export default LoginForm;
