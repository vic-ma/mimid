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
import { getVideoIDFromURL, getCurrentVideoID } from "./utils/YouTubeUtils";

import TextField from "@mui/material/TextField";

import { useState } from "react";

export default function URLBar() {
  const [error, setError] = useState(false);

  return (
    <TextField
      className="URLBar"
      label="YouTube video URL"
      size="small"
      variant="outlined"
      onChange={handleChange}
      error={error}
    />
  );

  function handleChange(event) {
    const url = event.target.value;
    const id = getVideoIDFromURL(url);
    if (id !== null) {
      setError(false);
      if (id === getCurrentVideoID()) {
        return;
      }
      PlayerAPIConnector.playerAPI.loadVideoById(id);
    } else if (url === "") {
      setError(false);
    } else {
      setError(true);
    }
  }
}
