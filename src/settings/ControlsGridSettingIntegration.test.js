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
  ControlsGridSettingIntegration.maxRows = 0;
  ControlsGridSettingIntegration.maxColumns = 0;
});

test("Add one-cell grid area", () => {
  ControlsGridSettingIntegration.setMaxRows(1);
  ControlsGridSettingIntegration.setMaxColumns(1);
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
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Add 2x2 grid area", () => {
  ControlsGridSettingIntegration.setMaxRows(2);
  ControlsGridSettingIntegration.setMaxColumns(2);
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
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Redundant changes", () => {
  ControlsGridSettingIntegration.setMaxRows(2);
  ControlsGridSettingIntegration.setMaxColumns(2);
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
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Add two adjacent grid areas", () => {
  ControlsGridSettingIntegration.setMaxRows(2);
  ControlsGridSettingIntegration.setMaxColumns(4);
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
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Overlap centre", () => {
  ControlsGridSettingIntegration.setMaxRows(3);
  ControlsGridSettingIntegration.setMaxColumns(3);
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
    ["", "", ""],
    ["", "bar", ""],
    ["", "", ""],
  ];
  const expectedGridString = "'1fr 1fr 1fr' '1fr bar 1fr' '1fr 1fr 1fr'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Overlap top and bottom", () => {
  ControlsGridSettingIntegration.setMaxRows(5);
  ControlsGridSettingIntegration.setMaxColumns(3);
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
    ["", "", ""],
    ["", "", ""],
    ["bar", "bar", "bar"],
    ["bar", "bar", "bar"],
    ["bar", "bar", "bar"],
  ];
  const expectedGridString =
    "'1fr 1fr 1fr' '1fr 1fr 1fr' 'bar bar bar' 'bar bar bar' 'bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Overlap left and right", () => {
  ControlsGridSettingIntegration.setMaxRows(3);
  ControlsGridSettingIntegration.setMaxColumns(5);
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
    ["", "", "bar", "bar", "bar"],
    ["", "", "bar", "bar", "bar"],
    ["", "", "bar", "bar", "bar"],
  ];
  const expectedGridString =
    "'1fr 1fr bar bar bar' '1fr 1fr bar bar bar' '1fr 1fr bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});

test("Overlap corner", () => {
  ControlsGridSettingIntegration.setMaxRows(5);
  ControlsGridSettingIntegration.setMaxColumns(5);
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
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "bar", "bar", "bar"],
    ["", "", "bar", "bar", "bar"],
    ["", "", "bar", "bar", "bar"],
  ];
  const expectedGridString =
    "'1fr 1fr 1fr 1fr 1fr' '1fr 1fr 1fr 1fr 1fr' '1fr 1fr bar bar bar' '1fr 1fr bar bar bar' '1fr 1fr bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid()).toEqual(expectedGrid);
  expect(ControlsGridSettingIntegration.getUnsavedGridString()).toEqual(
    expectedGridString
  );
});
