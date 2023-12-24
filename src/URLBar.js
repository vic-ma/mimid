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
      options={History.getAutoCompleteOptions()}
      renderInput={(params) => <TextField {...params} label="Video" />}
      onInputChange={handleInputChange}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      freeSolo
      disableClearable
      fullWidth
    />
  );

  // User enters URL manually
  function handleInputChange(event, newInputValue) {
    if (newInputValue === "CLEAR_HISTORY") {
      localStorage.removeItem("history");
      setRerender(!rerender);
    } else if (newInputValue === "CLEAR_COOKIES") {
      localStorage.clear();
      setRerender(!rerender);
    }

    const url = newInputValue;
    const id = getVideoIDFromURL(url);
    if (id != null) {
      if (id === getCurrentVideoID()) {
        return;
      }
      PlayerAPIConnector.playerAPI.loadVideoById(id);
      History.addCurrentVideo();
    }
  }

  // User selects from dropdown or presses enter
  function handleChange(event, value) {
    console.log(value);
    PlayerAPIConnector.playerAPI.loadVideoById(value.id);
    History.addCurrentVideo();
  }
}
