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
import { useRef } from "react";

export default function ControlsGridSetting() {
  // Using ref as a hack to only use this value once
  const defaultNumRowsRef = useRef(ControlsGridSettingIntegration.numRows);
  const defaultNumColumnsRef = useRef(
    ControlsGridSettingIntegration.numColumns
  );

  const [numRows, setNumRows] = useState(defaultNumRowsRef.current);
  const [numColumns, setNumColumns] = useState(defaultNumColumnsRef.current);

  return (
    <div className="ControlsGridSetting">
      <Typography className="ControlsGridSettingLabel" variant="h6">
        Controls Grid
      </Typography>

      <ControlsGridSettingDimensionSelector
        label="Rows"
        stateSetter={setNumRows}
        handleChange={handleRowDimensionSelectorChange}
        defaultValue={defaultNumRowsRef.current}
      />
      <ControlsGridSettingDimensionSelector
        handleChange={handleColumnDimensionSelectorChange}
        label="Columns"
        stateSetter={setNumColumns}
        defaultValue={defaultNumColumnsRef.current}
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
