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

import "./SliderSetting.scss";

import Typography from "@mui/material/Typography";
import SettingsIntegration from "./SettingsIntegration.js";

import Slider from "@mui/material/Slider";

import { useState } from "react";

export default function SliderSetting({
  label,
  settingName,
  min,
  max,
  step,
  mark = true,
}) {
  const [value, setValue] = useState(
    SettingsIntegration.getFloatSetting(settingName)
  );

  return (
    <div className="SliderSetting">
      <Typography className="SliderSettingLabel" variant="h6">
        {label}
      </Typography>
      <Slider
        className="SliderSettingSlider"
        onChange={handleChange}
        value={value}
        min={min}
        max={max}
        step={step}
        marks={mark}
        valueLabelDisplay="auto"
      />
    </div>
  );

  function handleChange(event, value) {
    setValue(value);
    SettingsIntegration.addUnsavedChange(settingName, value);
  }
}
