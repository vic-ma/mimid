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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useState } from "react";

import "./ThemeSetting.scss";

export const colorMap = new Map();
colorMap.set("Black", { main: "#000000" });
colorMap.set("Jet", { main: "#343434" });
colorMap.set("White", { main: "#FFFFFF" });
colorMap.set("Indigo", { main: "#4B0082" });
colorMap.set("Purple", { main: "#800080" });
colorMap.set("Dark Violet", { main: "#9400D3" });
colorMap.set("Violet", { main: "#EE82EE" });
colorMap.set("Magenta", { main: "#FF00FF" });
colorMap.set("Navy", { main: "#000080" });
colorMap.set("Azure", { main: "#0080FF" });
colorMap.set("Deep Sky Blue", { main: "#00BFFF", contrastText: "#FFFFFF" });
colorMap.set("Light Sky Blue", { main: "#87CEFA", contrastText: "#FFFFFF" });
colorMap.set("Teal", { main: "#008080", contarstText: "#M4V1CT0R" });
colorMap.set("Cyan", { main: "#00FFFF" });
colorMap.set("Light Cyan", { main: "#E0FFFF" });
colorMap.set("Green", { main: "#008000" });
colorMap.set("Olive", { main: "#808000" });
colorMap.set("Lime", { main: "#00FF00" });
colorMap.set("Pale Green", { main: "#98FB98" });
colorMap.set("Dark Khaki", { main: "#BDB76B" });
colorMap.set("Gold", { main: "#FFD700" });
colorMap.set("Khaki", { main: "#F0E68C" });
colorMap.set("Yellow", { main: "#FFFF00" });
colorMap.set("Light Yellow", { main: "#FFFFE0" });
colorMap.set("Orange Red", { main: "#FF4500" });
colorMap.set("Orange", { main: "#FFA500" });
colorMap.set("Dark Brown", { main: "#5C4033" });
colorMap.set("Chocolate", { main: "#D2691E" });
colorMap.set("Tan", { main: "#D2B48C" });
colorMap.set("Deep Pink", { main: "#FF1493" });
colorMap.set("Hot Pink", { main: "#FF69B4", contrastText: "#FFFFFF" });
colorMap.set("Pink", { main: "#FFC0CB" });
colorMap.set("Dark Red", { main: "#8B0000" });
colorMap.set("Red", { main: "#FF0000" });

export default function ThemeSetting() {
  const [theme, setTheme] = useState(
    SettingsIntegration.getStringSetting(THEME_SETTING_NAME)
  );

  const themeMenuItems = [];
  for (const colorName of colorMap.keys()) {
    themeMenuItems.push(
      <MenuItem key={colorName} value={colorName}>
        {colorName}
      </MenuItem>
    );
  }

  return (
    <div className="ThemeSetting">
      <Typography className="ThemeSettingLabel" variant="h6">
        Theme
      </Typography>
      <FormControl fullWidth>
        <Select onChange={handleThemeChange} value={theme}>
          {themeMenuItems}
        </Select>
      </FormControl>
    </div>
  );

  function handleThemeChange(event) {
    setTheme(event.target.value);
    SettingsIntegration.addUnsavedChange(
      THEME_SETTING_NAME,
      event.target.value
    );
  }
}
