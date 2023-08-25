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

import "./SwitchSetting.scss";

import Typography from "@mui/material/Typography";
import SettingsIntegration from "./SettingsIntegration.js";

import Switch from "@mui/material/Switch";

import { useEffect } from "react";
import { useState } from "react";

export default function SwitchSetting({
  label,
  settingName,
  defaultChecked = false,
}) {
  useEffect(
    () => setChecked(SettingsIntegration.getBooleanSetting(settingName)),
    [] // eslint-disable-line
  );

  const [checked, setChecked] = useState(
    SettingsIntegration.getBooleanSetting(settingName)
  );

  return (
    <div className="SwitchSetting">
      <Typography className="SwitchSettingLabel" variant="h6">
        {label}
      </Typography>
      <Switch
        className="SwitchSettingSwitch"
        onChange={handleChange}
        checked={checked}
      />
      ;
    </div>
  );

  function handleChange(event) {
    const checked = event.target.checked;
    setChecked(checked);
    SettingsIntegration.addUnsavedChange(checked);
  }
}
