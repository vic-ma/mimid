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
import LocalStorageMock from "../utils/localStorageMock";

import {
  CONTROLS_GRID_SETTING_NAME,
  CONTROLS_GRID_SETTING_DEFAULT,
} from "./constants";

import {
  PLAY_BUTTON_GRID_AREA,
  LOOP_BUTTON_GRID_AREA,
  SPEED_BUTTON_GRID_AREA,
  SKIP_BACKWARD_LONG_BUTTON_GRID_AREA,
  SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_LONG_BUTTON_GRID_AREA,
} from "../controls/constants";

beforeEach(() => {
  ControlsGridSettingIntegration.numRows = 0;
  ControlsGridSettingIntegration.numColumns = 0;
  ControlsGridSettingIntegration.unsavedGridData = new Map();
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
  const expectedGridTemplateAreas = "'foo'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas = "'foo foo' 'foo foo'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas = "'foo foo' 'foo foo'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas = "'foo foo bar bar' 'foo foo bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas = "'. . .' '. bar .' '. . .'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas =
    "'. . .' '. . .' 'bar bar bar' 'bar bar bar' 'bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas =
    "'. . bar bar bar' '. . bar bar bar' '. . bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
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
  const expectedGridTemplateAreas =
    "'. . . . .' '. . . . .' '. . bar bar bar' '. . bar bar bar' '. . bar bar bar'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
});

test("Initialize with localStorage", () => {
  window.localStorage = new LocalStorageMock();
  localStorage.setItem(
    CONTROLS_GRID_SETTING_NAME,
    CONTROLS_GRID_SETTING_DEFAULT
  );
  ControlsGridSettingIntegration.initialize();

  const expectedMap = new Map();
  expectedMap.set(PLAY_BUTTON_GRID_AREA, [
    [0, 0],
    [0, 3],
  ]);
  expectedMap.set(LOOP_BUTTON_GRID_AREA, [
    [1, 0],
    [1, 1],
  ]);
  expectedMap.set(SPEED_BUTTON_GRID_AREA, [
    [1, 2],
    [1, 3],
  ]);
  expectedMap.set(SKIP_BACKWARD_LONG_BUTTON_GRID_AREA, [
    [2, 0],
    [2, 0],
  ]);
  expectedMap.set(SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA, [
    [2, 1],
    [2, 1],
  ]);
  expectedMap.set(SKIP_FORWARD_SHORT_BUTTON_GRID_AREA, [
    [2, 2],
    [2, 2],
  ]);
  expectedMap.set(SKIP_FORWARD_LONG_BUTTON_GRID_AREA, [
    [2, 3],
    [2, 3],
  ]);

  const expectedGrid = [
    [
      PLAY_BUTTON_GRID_AREA,
      PLAY_BUTTON_GRID_AREA,
      PLAY_BUTTON_GRID_AREA,
      PLAY_BUTTON_GRID_AREA,
    ],
    [
      LOOP_BUTTON_GRID_AREA,
      LOOP_BUTTON_GRID_AREA,
      SPEED_BUTTON_GRID_AREA,
      SPEED_BUTTON_GRID_AREA,
    ],
    [
      SKIP_BACKWARD_LONG_BUTTON_GRID_AREA,
      SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA,
      SKIP_FORWARD_SHORT_BUTTON_GRID_AREA,
      SKIP_FORWARD_LONG_BUTTON_GRID_AREA,
    ],
  ];
  const expectedGridTemplateAreas = "'P P P P' 'L L S S' 'BL BS FS FL'";

  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
  expect(ControlsGridSettingIntegration.generateUnsavedGrid()).toEqual(
    expectedGrid
  );
  expect(
    ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
  ).toEqual(expectedGridTemplateAreas);
  expect(
    ControlsGridSettingIntegration.convertGridTemplateAreasToGrid(
      expectedGridTemplateAreas
    )
  ).toEqual(expectedGrid);
});
