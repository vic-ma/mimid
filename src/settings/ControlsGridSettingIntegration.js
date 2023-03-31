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
  unsavedGridData: new Map(), // TODO: get map from localstorage via function

  addUnsavedChange: function (button, row, column) {
    this.updateButton(button, row, column);
  },

  updateButton: function (button, row, column) {
    const topLeftCorner = this.unsavedGridData.get(button)[0];
    const [top, left] = topLeftCorner;

    if (row >= top && column <= left) {
      this.unsavedGridData.set(button, [[row, column], topLeftCorner]);
    } else if (row <= top && column >= left) {
      this.unsavedGridData.set(button, topLeftCorner, [[row, column]]);
    } else if (row >= top && column >= left) {
      this.unsavedGridData.set(button, [row, left], [[top, column]]);
    } else if (row <= top && column <= left) {
      this.unsavedGridData.set(button, [top, column], [[row, left]]);
    }
  },

  removeOverlapping: function () {
    //  for (const [currentButton, [topLeftCorner, bottomRightCorner]] of this
    //    .unsavedGridData) {
    //    if (this.cornersContain(topLeftCorner, bottomRightCorner, row, column)) {
    //      this.removeButton(currentButton);
    //    }
    //  }
  },

  removeButton: function (button) {
    this.unsavedGridData.delete(button);
  },

  cornersContain: function (topLeftCorner, bottomRightCorner, row, column) {
    const [top, left] = topLeftCorner;
    const [bottom, right] = bottomRightCorner;
    return bottom <= row && row <= top && left <= column && column <= right;
  },
};

export default ControlsGridSettingIntegration;
