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

import History from "./History";
import PlayerAPIConnector from "./PlayerAPIConnector";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function HistoryDialog({ open, onClose }) {
  return (
    <Dialog open={open}>
      <DialogTitle>History</DialogTitle>
      <Autocomplete
        options={History.getAutoCompleteOptions()}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="Video" />}
      />
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  function handleChange(event, value) {
    PlayerAPIConnector.playerAPI.loadVideoById(value.id);
  }
}
