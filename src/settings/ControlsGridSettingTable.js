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

import Typography from "@mui/material/Typography";
import SettingsIntegration from "./SettingsIntegration.js";
import ControlsGridSettingTableSelector from "./ControlsGridSettingTableSelector.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect } from "react";
import { useState } from "react";

export default function ControlsGridSettingTable({ rowCount, columnCount }) {
  var tableData = new Array(rowCount);
  for (let row = 0; row < rowCount; row++) {
    tableData[row] = new Array(columnCount);
  }

  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      tableData[row][column] = (
        <TableCell>
          <ControlsGridSettingTableSelector></ControlsGridSettingTableSelector>
        </TableCell>
      );
    }
    tableData[row] = <TableRow>{tableData[row]}</TableRow>;
  }
  tableData = <TableBody>{tableData}</TableBody>;

  return (
    <TableContainer component={Paper}>
      <Table>{tableData}</Table>
    </TableContainer>
  );
}
