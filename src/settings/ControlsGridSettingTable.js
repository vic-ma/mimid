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

import ControlsGridSettingTableSelector from "./ControlsGridSettingTableSelector.js";
import ControlsGridSettingIntegration from "./ControlsGridSettingIntegration.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState } from "react";

import "./ControlsGridSettingTable.scss";

export default function ControlsGridSettingTable({ numRows, numColumns }) {
  const [rerender, setRerender] = useState(false);
  const unsavedGrid = ControlsGridSettingIntegration.generateUnsavedGrid();

  let table = [];
  for (let row = 0; row < numRows; row++) {
    table[row] = [];
  }
  for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumns; column++) {
      table[row][column] = (
        <TableCell key={row + "" + column}>
          <ControlsGridSettingTableSelector
            row={row}
            column={column}
            controlledGridArea={
              unsavedGrid[row][column] === "." ? "" : unsavedGrid[row][column]
            }
            afterChange={afterSelectorChange}
          />
        </TableCell>
      );
    }
    table[row] = <TableRow key={row}>{table[row]}</TableRow>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>{table}</TableBody>
      </Table>
    </TableContainer>
  );

  function afterSelectorChange() {
    setRerender(!rerender);
  }
}
