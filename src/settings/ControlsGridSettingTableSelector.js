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

import Typography from "@mui/material/Typography";
import SettingsIntegration from "./SettingsIntegration.js";

import {
  PLAY_BUTTON_GRID_AREA,
  SPEED_BUTTON_GRID_AREA,
  LOOP_BUTTON_GRID_AREA,
  SKIP_BACKWARD_LONG_BUTTON_GRID_AREA,
  SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_LONG_BUTTON_GRID_AREA,
} from "../controls/constants.js";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useEffect } from "react";
import { useState } from "react";

export default function ControlsGridSettingTableSelector() {
  const [gridArea, setGridArea] = useState("");

  return (
    <FormControl>
      <Select
        value={gridArea}
        onChange={(event) => setGridArea(event.target.value)}
      >
        <MenuItem value={PLAY_BUTTON_GRID_AREA}>Play</MenuItem>
        <MenuItem value={SPEED_BUTTON_GRID_AREA}>Speed</MenuItem>
        <MenuItem value={LOOP_BUTTON_GRID_AREA}>Loop</MenuItem>
        <MenuItem value={SKIP_BACKWARD_LONG_BUTTON_GRID_AREA}>
          Skip Backward Long
        </MenuItem>
        <MenuItem value={SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA}>
          Skip Backward Short
        </MenuItem>
        <MenuItem value={SKIP_FORWARD_SHORT_BUTTON_GRID_AREA}>
          Skip Forward Short
        </MenuItem>
        <MenuItem value={SKIP_FORWARD_LONG_BUTTON_GRID_AREA}>
          Skip Forward Long
        </MenuItem>
      </Select>
    </FormControl>
  );
}
