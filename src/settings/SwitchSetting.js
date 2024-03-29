/*
Copyright 2023 Victor Ma

This file is part of Mimid.

Mimid is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

Mimid is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with Mimid. If not, see <https://www.gnu.org/licenses/>.
*/

import "./SwitchSetting.scss";

import Typography from "@mui/material/Typography";
import SettingsIntegration from "./SettingsIntegration.js";

import Switch from "@mui/material/Switch";

import { useState } from "react";

export default function SwitchSetting({ label, settingName }) {
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
    </div>
  );

  function handleChange(event) {
    const checked = event.target.checked;
    setChecked(checked);
    SettingsIntegration.addUnsavedChange(settingName, checked);
  }
}
