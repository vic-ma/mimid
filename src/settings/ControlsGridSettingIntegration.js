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

    const topLeftCorner = this.unsavedGridData.get(button)[0];
    const [top, left] = topLeftCorner;

    if (row >= top && column <= left) {
      this.unsavedGridData.set(button, [[row, column], topLeftCorner]);
    } else if (row <= top && column >= left) {
      this.unsavedGridData.set(button, [topLeftCorner, [row, column]]);
    } else if (row >= top && column >= left) {
      this.unsavedGridData.set(button, [
        [row, left],
        [top, column],
      ]);
    } else if (row <= top && column <= left) {
      this.unsavedGridData.set(button, [
        [top, column],
        [row, left],
      ]);
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

  removeButton: function (button) {
    this.unsavedGridData.delete(button);
  },
};

export default ControlsGridSettingIntegration;
