import React from 'react';
import { FormControl, Input, InputLabel, Button, Grid } from '@mui/material';

export default function Form() {

    return (
        <>
            <h1>New Project Form</h1>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Project name</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </Grid>
                    {/* TODO: Fill fields here */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}