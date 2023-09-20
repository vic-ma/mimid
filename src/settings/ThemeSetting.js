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

import { THEME_SETTING_NAME } from "./constants";
import SettingsIntegration from "./SettingsIntegration";

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

const RED = "Red";
const PINK = "Pink";
const PURPLE = "Purple";
const DEEP_PURPLE = "Deep Purple";
const INDIGO = "Indigo";
const BLUE = "Blue";
const LIGHT_BLUE = "Light Blue";
const CYAN = "Cyan";
const TEAL = "Teal";
const GREEN = "Green";
const LIGHT_GREEN = "Light Green";
const LIME = "Lime";
const YELLOW = "Yellow";
const AMBER = "Amber";
const ORANGE = "Orange";
const DEEP_ORANGE = "Deep Orange";
const BROWN = "Brown";
const GREY = "Grey";
const BLUE_GREY = "Blue Grey";

export const colorMap = new Map();
colorMap.set(RED, red);
colorMap.set(PINK, pink);
colorMap.set(PURPLE, purple);
colorMap.set(DEEP_PURPLE, deepPurple);
colorMap.set(INDIGO, indigo);
colorMap.set(BLUE, blue);
colorMap.set(LIGHT_BLUE, lightBlue);
colorMap.set(CYAN, cyan);
colorMap.set(TEAL, teal);
colorMap.set(GREEN, green);
colorMap.set(LIGHT_GREEN, lightGreen);
colorMap.set(LIME, lime);
colorMap.set(YELLOW, yellow);
colorMap.set(AMBER, amber);
colorMap.set(ORANGE, orange);
colorMap.set(DEEP_ORANGE, deepOrange);
colorMap.set(BROWN, brown);
colorMap.set(GREY, grey);
colorMap.set(BLUE_GREY, blueGrey);

export default function ThemeSetting() {
  const [color, setColor] = useState(
    SettingsIntegration.getStringSetting(THEME_SETTING_NAME)
  );

  const colorMenuItems = [];
  for (const colorString of colorMap.keys()) {
    colorMenuItems.push(
      <MenuItem key={colorString} value={colorString}>
        {colorString}
      </MenuItem>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{"Theme"}</InputLabel>
      <Select label={"Theme"} onChange={handleChange} value={color}>
        {colorMenuItems}
      </Select>
    </FormControl>
  );

  function handleChange(event) {
    setColor(event.target.value);
    SettingsIntegration.addUnsavedChange(
      THEME_SETTING_NAME,
      event.target.value
    );
  }
}
