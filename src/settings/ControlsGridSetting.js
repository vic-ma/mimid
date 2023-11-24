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
  const [numRows, setNumRows] = useState(
    ControlsGridSettingIntegration.numRows
  );
  const [numColumns, setNumColumns] = useState(
    ControlsGridSettingIntegration.numColumns
  );

  // This can happen if reset button is pressed.
  if (numRows !== ControlsGridSettingIntegration.numRows) {
    setNumRows(ControlsGridSettingIntegration.numRows);
  }
  if (numColumns !== ControlsGridSettingIntegration.numColumns) {
    setNumColumns(ControlsGridSettingIntegration.numColumns);
  }

  return (
    <div className="ControlsGridSetting">
      <Typography className="ControlsGridSettingLabel" variant="h6">
        Control Layout
      </Typography>

      <ControlsGridSettingDimensionSelector
        label="Rows"
        onChange={handleRowDimensionSelectorChange}
        initialValue={ControlsGridSettingIntegration.numRows}
      />
      <ControlsGridSettingDimensionSelector
        label="Columns"
        onChange={handleColumnDimensionSelectorChange}
        initialValue={ControlsGridSettingIntegration.numColumns}
      />

      <ControlsGridSettingTable numRows={numRows} numColumns={numColumns} />
    </div>
  );

  function handleRowDimensionSelectorChange(event) {
    const newNumRows = event.target.value;
    setNumRows(newNumRows);
    ControlsGridSettingIntegration.setNumRows(newNumRows);
  }
  function handleColumnDimensionSelectorChange(event) {
    const newNumColumns = event.target.value;
    setNumColumns(newNumColumns);
    ControlsGridSettingIntegration.setNumColumns(newNumColumns);
  }
}
