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
  // TODO: get map from localstorage via function
  unsavedGridData: new Map(),

  getUnsavedGrid: function (maxRows, maxColumns) {
    const unsavedGrid = new Array(maxRows);
    for (let row = 0; row < maxRows; row++) {
      unsavedGrid[row] = new Array(maxColumns);
      for (let column = 0; column < maxColumns; column++) {
        unsavedGrid[row][column] = null;
      }
    }
    for (const [button, [[top, left], [bottom, right]]] of this
      .unsavedGridData) {
      for (let row = top; row <= bottom; row++) {
        for (let column = left; column <= right; column++) {
          unsavedGrid[row][column] = button;
        }
      }
    }
    return unsavedGrid;
  },

  addUnsavedChange: function (button, row, column) {
    this.updateButton(button, row, column);
    this.removeOverlapping(button);
  },

  updateButton: function (button, row, column) {
    if (!this.unsavedGridData.has(button)) {
      this.unsavedGridData.set(button, [
        [row, column],
        [row, column],
      ]);
    }

    const [topLeftCorner, bottomRightCorner] = this.unsavedGridData.get(button);
    const [top, left] = topLeftCorner;

    if (this.contains(topLeftCorner, bottomRightCorner, row, column)) {
      return;
    }

    // top-left quardrant
    if (row <= top && column <= left) {
      this.unsavedGridData.set(button, [[row, column], topLeftCorner]);
    }
    // top-right quadrant
    else if (row <= top && column >= left) {
      this.unsavedGridData.set(button, [
        [row, left],
        [top, column],
      ]);
    }
    // bottom-left quadrant
    else if (row >= top && column <= left) {
      this.unsavedGridData.set(button, [
        [top, column],
        [row, left],
      ]);
    }
    // bottom-right quadrant
    else if (row >= top && column >= left) {
      this.unsavedGridData.set(button, [topLeftCorner, [row, column]]);
    }
  },

  removeOverlapping: function (button) {
    const [topLeftCorner, bottomRightCorner] = this.unsavedGridData.get(button);

    for (const [currentButton, [currentTopLeft, currentBottomRight]] of this
      .unsavedGridData) {
      if (currentButton === button) {
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
        this.removeButton(currentButton);
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

  removeButton: function (button) {
    this.unsavedGridData.delete(button);
  },
};

export default ControlsGridSettingIntegration;
