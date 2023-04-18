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

import SettingsIntegration from "./SettingsIntegration";

const ControlsGridSettingIntegration = {
  numRows: 0,
  numColumns: 0,

  // TODO: get map from localstorage via function
  unsavedGridData: new Map(),

  setNumRows: function (numRows) {
    this.numRows = numRows;
  },

  setNumColumns: function (numColumns) {
    this.numColumns = numColumns;
  },

  getUnsavedGridTemplate: function () {
    let gridString = "";
    const unsavedGrid = this.getUnsavedGrid();
    for (const row of unsavedGrid) {
      gridString += "'";
      for (const cell of row) {
        gridString += cell + " ";
      }
      gridString = gridString.slice(0, -1);
      gridString += "' ";
    }
    return gridString.slice(0, -1);
  },

  getUnsavedGrid: function () {
    if (this.numRows === undefined || this.numColumns === undefined) {
      throw new Error("Missing arguments.");
    }
    const unsavedGrid = new Array(this.numRows);
    for (let row = 0; row < this.numRows; row++) {
      unsavedGrid[row] = new Array(this.numColumns);
      for (let column = 0; column < this.numColumns; column++) {
        unsavedGrid[row][column] = ".";
      }
    }
    for (const [areaName, [[top, left], [bottom, right]]] of this
      .unsavedGridData) {
      for (let row = top; row <= bottom; row++) {
        for (let column = left; column <= right; column++) {
          unsavedGrid[row][column] = areaName;
        }
      }
    }
    return unsavedGrid;
  },

  addUnsavedClear: function () {
    this.unsavedGridData.clear();
    SettingsIntegration.setControlsGridChanged();
  },

  addUnsavedChange: function (areaName, row, column) {
    this.updateGridArea(areaName, row, column);
    this.removeOverlapping(areaName);
    SettingsIntegration.setControlsGridChanged();
  },

  updateGridArea: function (areaName, row, column) {
    if (!this.unsavedGridData.has(areaName)) {
      this.unsavedGridData.set(areaName, [
        [row, column],
        [row, column],
      ]);
    }

    const [topLeftCorner, bottomRightCorner] =
      this.unsavedGridData.get(areaName);
    const [top, left] = topLeftCorner;

    if (this.areaContains([topLeftCorner, bottomRightCorner], row, column)) {
      return;
    }

    // top-left quardrant
    if (row <= top && column <= left) {
      this.unsavedGridData.set(areaName, [[row, column], topLeftCorner]);
    }
    // top-right quadrant
    else if (row <= top && column >= left) {
      this.unsavedGridData.set(areaName, [
        [row, left],
        [top, column],
      ]);
    }
    // bottom-left quadrant
    else if (row >= top && column <= left) {
      this.unsavedGridData.set(areaName, [
        [top, column],
        [row, left],
      ]);
    }
    // bottom-right quadrant
    else if (row >= top && column >= left) {
      this.unsavedGridData.set(areaName, [topLeftCorner, [row, column]]);
    }
  },

  removeOverlapping: function (areaName) {
    const [topLeftCorner, bottomRightCorner] =
      this.unsavedGridData.get(areaName);

    for (const [currentAreaName, [currentTopLeft, currentBottomRight]] of this
      .unsavedGridData) {
      if (currentAreaName === areaName) {
        continue;
      }
      if (
        this.areasOverlap(
          [topLeftCorner, bottomRightCorner],
          [currentTopLeft, currentBottomRight]
        )
      ) {
        this.removeArea(currentAreaName);
      }
    }
  },
  removeArea: function (areaName) {
    this.unsavedGridData.delete(areaName);
  },

  areasOverlap: function (areaOne, areaTwo) {
    const [[topOne, leftOne], [bottomOne, rightOne]] = areaOne;
    const [[topTwo, leftTwo], [bottomTwo, rightTwo]] = areaTwo;

    return !(
      bottomOne < topTwo ||
      bottomTwo < topOne ||
      rightOne < leftTwo ||
      rightTwo < leftOne
    );
  },
  areaContains: function (area, row, column) {
    const [[top, left], [bottom, right]] = area;
    return top <= row && row <= bottom && left <= column && column <= right;
  },
};

export default ControlsGridSettingIntegration;
