/*
Copyright 2023 Victor Ma

This file is part of Musician's Remote.

Musician's Remote is free software: you can redistribute it and/or modify it
under the terms of the GNU Affero General Public License as published by the
Free Software Foundation, either version 3 of the License, or (at your option)
any later version.

Musician's Remote is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
more details.

You should have received a copy of the GNU Affero General Public License along
with Musician's Remote. If not, see <https://www.gnu.org/licenses/>.
*/

import "./App.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import YouTubePlayer from "./YouTubePlayer.js";
import Paper from "@mui/material/Paper";

function App() {
  return (
    <div className="App">
      {/* FIXME: Only used to simulate mobile device */}
      <Grid container xs={4} spacing={2}>
        <Grid container xs={4} columns={4}>
          <Grid xs={4}>
            <TextField />
          </Grid>
          <Grid xs={4}>
            <YouTubePlayer />
          </Grid>
          <Grid container xs={1} columns={4} direction="column">
            <Grid>
              <Paper>Loop 1</Paper>
            </Grid>
            <Grid>
              <Paper>Loop 2</Paper>
            </Grid>
          </Grid>
          <Grid container xs={2} columns={4} direction="column">
            <Grid>
              <Paper>Play</Paper>
            </Grid>
          </Grid>
          <Grid container xs={1} columns={4} direction="column">
            <Grid>
              <Paper>Speed 1</Paper>
            </Grid>
            <Grid>
              <Paper>Speed 2</Paper>
            </Grid>
            <Grid>
              <Paper>Speed 3</Paper>
            </Grid>
            <Grid>
              <Paper>Speed 4</Paper>
            </Grid>
          </Grid>
          <Grid xs={1}>
            <Paper>Back long</Paper>
          </Grid>
          <Grid xs={1}>
            <Paper>Back short</Paper>
          </Grid>
          <Grid xs={1}>
            <Paper>Forward short</Paper>
          </Grid>
          <Grid xs={1}>
            <Paper>Forward long</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
