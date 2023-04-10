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

beforeAll(() => ControlsGridSettingIntegration.unsavedGridData.clear());

test("add one-cell button", () => {
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [0, 0],
  ]);
  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
});

test("add 2x2 button", () => {
  ControlsGridSettingIntegration.addUnsavedChange("foo", 0, 0);
  ControlsGridSettingIntegration.addUnsavedChange("foo", 1, 1);
  const expectedMap = new Map();
  expectedMap.set("foo", [
    [0, 0],
    [1, 1],
  ]);
  expect(ControlsGridSettingIntegration.unsavedGridData).toEqual(expectedMap);
});
