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

import { THEME_COLOR_SETTING_NAME, DARK_MODE_SETTING_NAME } from "./constants";
import SettingsIntegration from "./SettingsIntegration";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useState } from "react";

import "./ThemeSetting.scss";

export const colorMap = new Map();
colorMap.set("Black", { main: "#000000" });
colorMap.set("Jet", { main: "#343434" });
colorMap.set("White", { main: "#FFFFFF" });
colorMap.set("Dark Red", { main: "#8B0000" });
colorMap.set("Red", { main: "#FF0000" });
colorMap.set("Deep Pink", { main: "#FF1493" });
colorMap.set("Hot Pink", { main: "#FF69B4" });
colorMap.set("Pink", { main: "#FFC0CB" });
colorMap.set("Dark Brown", { main: "#5C4033" });
colorMap.set("Chocolate", { main: "#D2691E" });
colorMap.set("Tan", { main: "#D2B48C" });
colorMap.set("Orange Red", { main: "#FF4500" });
colorMap.set("Orange", { main: "#FFA500" });
colorMap.set("Gold", { main: "#FFD700" });
colorMap.set("Khaki", { main: "#F0E68C" });
colorMap.set("Yellow", { main: "#FFFF00" });
colorMap.set("Light Yellow", { main: "#FFFFE0" });
colorMap.set("Green", { main: "#008000" });
colorMap.set("Olive", { main: "#808000" });
colorMap.set("Lime", { main: "#00FF00" });
colorMap.set("Pale Green", { main: "#98FB98" });
colorMap.set("Dark Khaki", { main: "#BDB76B" });
colorMap.set("Teal", { main: "#008080" });
colorMap.set("Cyan", { main: "#00FFFF" });
colorMap.set("Light Cyan", { main: "#E0FFFF" });
colorMap.set("Navy", { main: "#000080" });
colorMap.set("Azure", { main: "#0080FF" });
colorMap.set("Deep Sky Blue", { main: "#00BFFF", contrastText: "#FFFFFF" });
colorMap.set("Light Sky Blue", { main: "#87CEFA", contrastText: "#FFFFFF" });
colorMap.set("Indigo", { main: "#4B0082" });
colorMap.set("Purple", { main: "#800080" });
colorMap.set("Dark Violet", { main: "#9400D3" });
colorMap.set("Magenta", { main: "#FF00FF" });
colorMap.set("Violet", { main: "#EE82EE" });

export default function ThemeSetting() {
  const [color, setColor] = useState(
    SettingsIntegration.getStringSetting(THEME_COLOR_SETTING_NAME)
  );
  const [mode, setMode] = useState(
    SettingsIntegration.getStringSetting(DARK_MODE_SETTING_NAME)
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
    <div className="ThemeSetting">
      <Typography className="ThemeSettingLabel" variant="h6">
        Theme
      </Typography>
      <FormControl fullWidth>
        <InputLabel>{"Color"}</InputLabel>
        <Select label={"Color"} onChange={handleColorChange} value={color}>
          {colorMenuItems}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>{"Mode"}</InputLabel>
        <Select label={"Mode"} onChange={handleModeChange} value={mode}>
          <MenuItem value={"light"}>{"Light"}</MenuItem>
          <MenuItem value={"dark"}>{"Dark"}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  function handleColorChange(event) {
    setColor(event.target.value);
    SettingsIntegration.addUnsavedChange(
      THEME_COLOR_SETTING_NAME,
      event.target.value
    );
  }

  function handleModeChange(event) {
    setMode(event.target.value);
    SettingsIntegration.addUnsavedChange(
      DARK_MODE_SETTING_NAME,
      event.target.value
    );
  }
}
