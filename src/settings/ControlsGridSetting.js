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
import ControlsGridSettingDimensionSelector from "./ControlsGridSettingDimensionSelector";
import ControlsGridSettingIntegration from "./ControlsGridSettingIntegration";

import Typography from "@mui/material/Typography";

import { useState } from "react";

export default function ControlsGridSetting() {
  const [numRows, setNumRows] = useState(4); // TODO: fix default
  const [numColumns, setNumColumns] = useState(4);

  return (
    <div className="ControlsGridSetting">
      <Typography className="ControlsGridSettingLabel" variant="h6">
        Controls Grid Setting
      </Typography>

      <ControlsGridSettingDimensionSelector
        label="Rows"
        stateSetter={setNumRows}
        handleChange={handleRowDimensionSelectorChange}
      ></ControlsGridSettingDimensionSelector>
      <ControlsGridSettingDimensionSelector
        handleChange={handleColumnDimensionSelectorChange}
        label="Columns"
        stateSetter={setNumColumns}
      ></ControlsGridSettingDimensionSelector>

      <ControlsGridSettingTable
        numRows={numRows}
        numColumns={numColumns}
      ></ControlsGridSettingTable>
    </div>
  );

  function handleRowDimensionSelectorChange(event) {
    ControlsGridSettingIntegration.addUnsavedClear();
    setNumRows(event.target.value);
  }
  function handleColumnDimensionSelectorChange(event) {
    ControlsGridSettingIntegration.addUnsavedClear();
    setNumColumns(event.target.value);
  }
}
