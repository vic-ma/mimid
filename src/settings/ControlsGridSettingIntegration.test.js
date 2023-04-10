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

beforeEach(() => ControlsGridSettingIntegration.unsavedGridData.clear());

test("Add one-cell grid area", () => {
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);

  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [0, 0],
  ]);

  const expectedGrid = [["foo"]];

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(1, 1)).toEqual(
    expectedGrid
  );
});

test("Add 2x2 grid area", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(2, 2)).toEqual(
    expectedGrid
  );
});

test("Redundant changes", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(2, 2)).toEqual(
    expectedGrid
  );
});

test("Add two adjacent grid areas", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(2, 4)).toEqual(
    expectedGrid
  );
});

test("Overlap centre", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(3, 3)).toEqual(
    expectedGrid
  );
});

test("Overlap top and bottom", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(5, 3)).toEqual(
    expectedGrid
  );
});

test("Overlap left and right", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(3, 5)).toEqual(
    expectedGrid
  );
});

test("Overlap corner", () => {
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

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.getUnsavedGrid(5, 5)).toEqual(
    expectedGrid
  );
});
