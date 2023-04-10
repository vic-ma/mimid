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

const ControlsGridSettingIntegration = {
  maxRows: 0,
  maxColumns: 0,

  // TODO: get map from localstorage via function
  unsavedGridData: new Map(),

  setMaxRows: function (maxRows) {
    this.maxRows = maxRows;
  },
  setMaxColumns: function (maxColumns) {
    this.maxColumns = maxColumns;
  },

  getUnsavedGrid: function () {
    if (this.maxRows === undefined || this.maxColumns === undefined) {
      throw new Error("Missing arguments.");
    }
    const unsavedGrid = new Array(this.maxRows);
    for (let row = 0; row < this.maxRows; row++) {
      unsavedGrid[row] = new Array(this.maxColumns);
      for (let column = 0; column < this.maxColumns; column++) {
        unsavedGrid[row][column] = "";
      }
    }
    for (const [gridArea, [[top, left], [bottom, right]]] of this
      .unsavedGridData) {
      for (let row = top; row <= bottom; row++) {
        for (let column = left; column <= right; column++) {
          unsavedGrid[row][column] = gridArea;
        }
      }
    }
    return unsavedGrid;
  },

  addUnsavedClear: function () {
    this.unsavedGridData.clear();
  },

  addUnsavedChange: function (gridArea, row, column) {
    this.updateGridArea(gridArea, row, column);
    this.removeOverlapping(gridArea);
  },

  updateGridArea: function (gridArea, row, column) {
    if (!this.unsavedGridData.has(gridArea)) {
      this.unsavedGridData.set(gridArea, [
        [row, column],
        [row, column],
      ]);
    }

    const [topLeftCorner, bottomRightCorner] =
      this.unsavedGridData.get(gridArea);
    const [top, left] = topLeftCorner;

    if (this.contains(topLeftCorner, bottomRightCorner, row, column)) {
      return;
    }

    // top-left quardrant
    if (row <= top && column <= left) {
      this.unsavedGridData.set(gridArea, [[row, column], topLeftCorner]);
    }
    // top-right quadrant
    else if (row <= top && column >= left) {
      this.unsavedGridData.set(gridArea, [
        [row, left],
        [top, column],
      ]);
    }
    // bottom-left quadrant
    else if (row >= top && column <= left) {
      this.unsavedGridData.set(gridArea, [
        [top, column],
        [row, left],
      ]);
    }
    // bottom-right quadrant
    else if (row >= top && column >= left) {
      this.unsavedGridData.set(gridArea, [topLeftCorner, [row, column]]);
    }
  },

  removeOverlapping: function (gridArea) {
    const [topLeftCorner, bottomRightCorner] =
      this.unsavedGridData.get(gridArea);

    for (const [currentgridArea, [currentTopLeft, currentBottomRight]] of this
      .unsavedGridData) {
      if (currentgridArea === gridArea) {
        continue;
      }
      if (
        this.overlaps(
          topLeftCorner,
          bottomRightCorner,
          currentTopLeft,
          currentBottomRight
        )
      ) {
        this.removegridArea(currentgridArea);
      }
    }
  },

  overlaps: function (topLeftOne, bottomRightOne, topLeftTwo, bottomRightTwo) {
    const [topOne, leftOne] = topLeftOne;
    const [bottomOne, rightOne] = bottomRightOne;
    const [topTwo, leftTwo] = topLeftTwo;
    const [bottomTwo, rightTwo] = bottomRightTwo;

    return !(
      bottomOne < topTwo ||
      bottomTwo < topOne ||
      rightOne < leftTwo ||
      rightTwo < leftOne
    );
  },

  contains: function (topLeftCorner, bottomRightCorner, row, column) {
    const [top, left] = topLeftCorner;
    const [bottom, right] = bottomRightCorner;
    return top <= row && row <= bottom && left <= column && column <= right;
  },

  removegridArea: function (gridArea) {
    this.unsavedGridData.delete(gridArea);
  },
};

export default ControlsGridSettingIntegration;
