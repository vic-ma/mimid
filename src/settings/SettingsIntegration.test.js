/*
Copyright 2023 Victor Ma

This file is part of Mimid.

Mimid is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

Mimid is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with Mimid. If not, see <https://www.gnu.org/licenses/>.
*/

import LocalStorageMock from "../utils/localStorageMock";
import SettingsIntegration from "./SettingsIntegration";

let stateSetter;

beforeEach(() => {
  stateSetter = jest.fn();
  SettingsIntegration.unsavedChanges = new Map();
  SettingsIntegration.controlsGridChanged = false;
  window.localStorage = new LocalStorageMock();
});

test("String setting", () => {
  SettingsIntegration.addStringSettingListener("foo", stateSetter);
  SettingsIntegration.addUnsavedChange("foo", "bar");
  SettingsIntegration.addUnsavedChange("foo", "baz");
  SettingsIntegration.saveUnsavedChanges();

  expect(stateSetter.mock.calls.length).toBe(1);
  expect(stateSetter.mock.calls[0].length).toBe(1);
  expect(stateSetter.mock.calls[0][0]).toBe("baz");
  expect(window.localStorage.getItem("foo")).toBe("baz");
  expect(SettingsIntegration.getStringSetting("foo")).toBe("baz");
});

test("Boolean setting", () => {
  SettingsIntegration.addBooleanSettingListener("foo", stateSetter);
  SettingsIntegration.addUnsavedChange("foo", "true");
  SettingsIntegration.addUnsavedChange("foo", "false");
  SettingsIntegration.saveUnsavedChanges();

  expect(stateSetter.mock.calls.length).toBe(1);
  expect(stateSetter.mock.calls[0].length).toBe(1);
  expect(stateSetter.mock.calls[0][0]).toBe(false);
  expect(window.localStorage.getItem("foo")).toBe("false");
  expect(SettingsIntegration.getBooleanSetting("foo")).toBe(false);
});

test("Float setting", () => {
  SettingsIntegration.addFloatSettingListener("foo", stateSetter);
  SettingsIntegration.addUnsavedChange("foo", 3.14);
  SettingsIntegration.addUnsavedChange("foo", 6.28);
  SettingsIntegration.saveUnsavedChanges();

  expect(stateSetter.mock.calls.length).toBe(1);
  expect(stateSetter.mock.calls[0].length).toBe(1);
  expect(stateSetter.mock.calls[0][0]).toBe(6.28);
  expect(window.localStorage.getItem("foo")).toBe("6.28");
  expect(SettingsIntegration.getFloatSetting("foo")).toBe(6.28);
});
