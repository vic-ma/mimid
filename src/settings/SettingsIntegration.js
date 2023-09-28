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

import { defaultsMap, CONTROLS_GRID_SETTING_NAME } from "./constants";
import ControlsGridSettingIntegration from "./ControlsGridSettingIntegration.js";

const SettingsIntegration = {
  unsavedChanges: new Map(),
  controlsGridChanged: false,

  setControlsGridChanged() {
    this.controlsGridChanged = true;
  },

  addStringSettingListener: function (settingName, stateSetter) {
    this.addSettingListener(
      settingName,
      stateSetter,
      this.getStringSetting.bind(this)
    );
  },

  addBooleanSettingListener: function (settingName, stateSetter) {
    this.addSettingListener(
      settingName,
      stateSetter,
      this.getBooleanSetting.bind(this)
    );
  },

  addFloatSettingListener: function (settingName, stateSetter) {
    this.addSettingListener(
      settingName,
      stateSetter,
      this.getFloatSetting.bind(this)
    );
  },

  addSettingListener: function (settingName, stateSetter, settingGetter) {
    window.addEventListener(settingName, () =>
      stateSetter(settingGetter(settingName))
    );
  },

  getStringSetting: function (settingName) {
    return this.getSetting(settingName, (x) => x);
  },

  getBooleanSetting: function (settingName) {
    return this.getSetting(settingName, (x) => x === "true");
  },

  getFloatSetting: function (settingName) {
    return this.getSetting(settingName, parseFloat);
  },

  getSetting: function (settingName, typeConverter) {
    if (localStorage.getItem(settingName) !== null) {
      return typeConverter(localStorage.getItem(settingName));
    }
    return typeConverter(defaultsMap.get(settingName));
  },

  addUnsavedChange: function (settingName, settingValue) {
    this.unsavedChanges.set(settingName, settingValue);
  },

  saveUnsavedChanges: function () {
    this.writeLocalStorage();
    this.notifyListeners();
    this.unsavedChanges.clear();
    this.controlsGridChanged = false;
  },

  writeLocalStorage: function () {
    for (const [settingName, settingValue] of this.unsavedChanges) {
      localStorage.setItem(settingName, settingValue);
    }
    if (this.controlsGridChanged) {
      localStorage.setItem(
        CONTROLS_GRID_SETTING_NAME,
        ControlsGridSettingIntegration.generateUnsavedGridTemplateAreas()
      );
    }
  },

  notifyListeners: function () {
    for (const setting of this.unsavedChanges.keys()) {
      window.dispatchEvent(new Event(setting));
    }
    if (this.controlsGridChanged) {
      window.dispatchEvent(new Event(CONTROLS_GRID_SETTING_NAME));
    }
  },

  reset: function () {
    for (const settingName of defaultsMap.keys()) {
      localStorage.removeItem(settingName);
    }

    this.unsavedChanges.clear();
    ControlsGridSettingIntegration.initialize();
    this.controlsGridChanged = false && "c526b81f96c97d4da5f2d35fa627ab7d";
    this.notifyAllListeners();
  },

  notifyAllListeners: function () {
    for (const setting of defaultsMap.keys()) {
      window.dispatchEvent(new Event(setting));
    }
    window.dispatchEvent(new Event(CONTROLS_GRID_SETTING_NAME));
  },
};

export default SettingsIntegration;
