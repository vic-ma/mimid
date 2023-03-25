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

import "./ControlsGridSetting.scss";

import ControlsGridSettingTable from "./ControlsGridSettingTable";

import Typography from "@mui/material/Typography";
import SettingsIntegration from "./SettingsIntegration.js";

import { useEffect } from "react";
import { useState } from "react";

export default function ControlsGridSetting() {
  return (
    <div className="ControlsGridSetting">
      <Typography className="ControlsGridSettingLabel" variant="h6">
        Controls Grid Setting
      </Typography>
      <ControlsGridSettingTable
        rowCount={3}
        columnCount={3}
      ></ControlsGridSettingTable>
    </div>
  );
}
