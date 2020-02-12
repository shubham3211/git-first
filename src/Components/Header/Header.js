import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import './Header.css'
import { Typography } from '@material-ui/core';
import Star from '@material-ui/icons/Star';

export default function Header() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box p={7} style={{backgroundColor:'#e9ecef'}}>
          <Box mb={2}>
            <Typography variant="h5" align="center">Search beginner friendly projects on Github</Typography>
          </Box>
          <Typography align="center">
            Repositories can be fetched based on <b>language</b>, <b>label</b> and no of <Star fontSize="small" />.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
