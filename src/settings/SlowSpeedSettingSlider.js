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

import "./SlowSpeedSettingSlider.scss";

import SettingsIntegration from "./SettingsIntegration.js";
import { SLOW_SPEED_SETTING_NAME } from "./constants";

import Slider from "@mui/material/Slider";

import { useEffect } from "react";
import { useState } from "react";

export default function SlowSpeedSettingSlider() {
  useEffect(
    () =>
      setValue(SettingsIntegration.getFloatSetting(SLOW_SPEED_SETTING_NAME)),
    []
  );
  const [value, setValue] = useState(
    SettingsIntegration.getFloatSetting(SLOW_SPEED_SETTING_NAME)
  );
  return (
    <Slider
      className="SlowSpeedSettingSlider"
      aria-label="Slow speed"
      onChange={handleChange}
      value={value}
      min={0.25}
      max={0.95}
      step={0.05}
      marks={true}
      valueLabelDisplay="auto"
    ></Slider>
  );

  function handleChange(event, value) {
    setValue(value);
    SettingsIntegration.addUnsavedChange(SLOW_SPEED_SETTING_NAME, value);
  }
}
