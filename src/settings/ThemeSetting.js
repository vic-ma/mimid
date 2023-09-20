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

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from "@mui/material/colors";

const colorPairs = [
  ["Red", red],
  ["Pink", pink],
  ["Purple", purple],
  ["Deep Purple", deepPurple],
  ["Indigo", indigo],
  ["Blue", blue],
  ["Light Blue", lightBlue],
  ["Cyan", cyan],
  ["Teal", teal],
  ["Green", green],
  ["Light Green", lightGreen],
  ["Lime", lime],
  ["Yellow", yellow],
  ["Amber", amber],
  ["Orange", orange],
  ["Deep Orange", deepOrange],
  ["Brown", brown],
  ["Grey", grey],
  ["Blue Grey", blueGrey],
];

export default function ThemeSetting() {
  const [theme, setTheme] = useState(null);

  const colorMenuItems = [];
  for (const [colorString, colorObject] of colorPairs) {
    colorMenuItems.push(<MenuItem value={colorObject}>{colorString}</MenuItem>);
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{"Theme"}</InputLabel>
      <Select label={"Theme"} onChange={handleChange} value={theme}>
        {colorMenuItems}
      </Select>
    </FormControl>
  );

  function handleChange(event) {
    setTheme(event.target.value);
  }
}
