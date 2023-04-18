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

import ControlsGridSettingIntegration from "./ControlsGridSettingIntegration";

beforeEach(() => {
  ControlsGridSettingIntegration.unsavedGridData.clear();
  ControlsGridSettingIntegration.numRows = 0;
  ControlsGridSettingIntegration.numColumns = 0;
});

test("Add one-cell grid area", () => {
  ControlsGridSettingIntegration.setNumRows(1);
  ControlsGridSettingIntegration.setNumColumns(1);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);

  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [0, 0],
  ]);
  const expectedGrid = [["foo"]];
  const expectedGridString = "'foo'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Add 2x2 grid area", () => {
  ControlsGridSettingIntegration.setNumRows(2);
  ControlsGridSettingIntegration.setNumColumns(2);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 1, 1);

  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [1, 1],
  ]);
  const expectedGrid = [
    ["foo", "foo"],
    ["foo", "foo"],
  ];
  const expectedGridString = "'foo foo' 'foo foo'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Redundant changes", () => {
  ControlsGridSettingIntegration.setNumRows(2);
  ControlsGridSettingIntegration.setNumColumns(2);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 1, 1);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 1, 1);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 1, 1);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);

  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [1, 1],
  ]);
  const expectedGrid = [
    ["foo", "foo"],
    ["foo", "foo"],
  ];
  const expectedGridString = "'foo foo' 'foo foo'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Add two adjacent grid areas", () => {
  ControlsGridSettingIntegration.setNumRows(2);
  ControlsGridSettingIntegration.setNumColumns(4);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 1, 1);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 0, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 1, 3);

  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [1, 1],
  ]);
  expectedMap.set("bar", [
    [0, 2],
    [1, 3],
  ]);
  const expectedGrid = [
    ["foo", "foo", "bar", "bar"],
    ["foo", "foo", "bar", "bar"],
  ];
  const expectedGridString = "'foo foo bar bar' 'foo foo bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Overlap centre", () => {
  ControlsGridSettingIntegration.setNumRows(3);
  ControlsGridSettingIntegration.setNumColumns(3);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 2, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 1, 1);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 1, 1);

  const expectedMap = new Map();
  expectedMap.set("bar", [
    [1, 1],
    [1, 1],
  ]);
  const expectedGrid = [
    [".", ".", "."],
    [".", "bar", "."],
    [".", ".", "."],
  ];
  const expectedGridString = "'. . .' '. bar .' '. . .'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Overlap top and bottom", () => {
  ControlsGridSettingIntegration.setNumRows(5);
  ControlsGridSettingIntegration.setNumColumns(3);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 2, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 2, 0);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 4, 2);

  const expectedMap = new Map();
  expectedMap.set("bar", [
    [2, 0],
    [4, 2],
  ]);
  const expectedGrid = [
    [".", ".", "."],
    [".", ".", "."],
    ["bar", "bar", "bar"],
    ["bar", "bar", "bar"],
    ["bar", "bar", "bar"],
  ];
  const expectedGridString =
    "'. . .' '. . .' 'bar bar bar' 'bar bar bar' 'bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Overlap left and right", () => {
  ControlsGridSettingIntegration.setNumRows(3);
  ControlsGridSettingIntegration.setNumColumns(5);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 2, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 0, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 2, 4);

  const expectedMap = new Map();
  expectedMap.set("bar", [
    [0, 2],
    [2, 4],
  ]);
  const expectedGrid = [
    [".", ".", "bar", "bar", "bar"],
    [".", ".", "bar", "bar", "bar"],
    [".", ".", "bar", "bar", "bar"],
  ];
  const expectedGridString =
    "'. . bar bar bar' '. . bar bar bar' '. . bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});

test("Overlap corner", () => {
  ControlsGridSettingIntegration.setNumRows(5);
  ControlsGridSettingIntegration.setNumColumns(5);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 2, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 2, 2);
  ControlsGridSettingIntegration.addUnsavedChange("bar", 4, 4);

  const expectedMap = new Map();
  expectedMap.set("bar", [
    [2, 2],
    [4, 4],
  ]);
  const expectedGrid = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", "bar", "bar", "bar"],
    [".", ".", "bar", "bar", "bar"],
    [".", ".", "bar", "bar", "bar"],
  ];
  const expectedGridString =
    "'. . . . .' '. . . . .' '. . bar bar bar' '. . bar bar bar' '. . bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridTemplate()).toEqual(
    expectedGridString
  );
});
