/*
Copyright 2023 Victor Ma

This file is part of Mimid.

Mimid is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

Mimid is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with Mimid. If not, see <https://www.gnu.org/licenses/>.
*/

import PlayerAPIConnector from "./PlayerAPIConnector";
import History from "./History";
import { getVideoIDFromURL, getCurrentVideoID } from "./utils/YouTubeUtils";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";

export default function URLBar() {
  useEffect(() => {
    History.addHistoryChangeListener(() =>
      setRerender((currentState) => !currentState)
    );
  }, []); // eslint-disable-line

  const [rerender, setRerender] = useState(0);

  return (
    <Autocomplete
      className="URLBar"
      size="small"
      options={History.getAutocompleteOptions()}
      renderInput={(params) => <TextField {...params} label="Video" />}
      onInputChange={handleInputChange}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      freeSolo
      disableClearable
      fullWidth
      autoComplete
      autoHighlight
      blurOnSelect
    />
  );

  // User enters URL manually
  function handleInputChange(event, newInputValue) {
    if (newInputValue === "CLEAR_HISTORY") {
      localStorage.removeItem("history");
      setRerender(!rerender);
      return;
    } else if (newInputValue === "CLEAR_COOKIES") {
      localStorage.clear();
      setRerender(!rerender);
      return;
    }

    const url = newInputValue;
    const id = getVideoIDFromURL(url);
    if (id == null || id === getCurrentVideoID()) {
      return;
    }
    PlayerAPIConnector.playerAPI.loadVideoById(id);
    History.addCurrentVideo();
  }
}

// User selects from dropdown or presses enter
function handleChange(event, value) {
  if (value.id != null && value.id !== getCurrentVideoID()) {
    PlayerAPIConnector.playerAPI.loadVideoById(value.id);
    History.addCurrentVideo();
  }
}
