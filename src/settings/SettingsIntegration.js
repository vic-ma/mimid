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

  getSetting: function (settingName, typeConverter) {
    return window.localStorage.getItem(settingName) !== null
      ? typeConverter(window.localStorage.getItem(settingName))
      : defaultsMap.get(settingName);
  },

  getStringSetting: function (settingName) {
    return this.getSetting(settingName, (x) => x);
  },

  getFloatSetting: function (settingName) {
    return this.getSetting(settingName, parseFloat);
  },

  addSettingListener: function (settingName, stateSetter, typeConverter) {
    window.addEventListener(settingName, () =>
      stateSetter(typeConverter(window.localStorage.getItem(settingName)))
    );
  },

  addStringSettingListener: function (settingName, stateSetter) {
    this.addSettingListener(settingName, stateSetter, (x) => x);
  },

  addFloatSettingListener: function (settingName, stateSetter) {
    this.addSettingListener(settingName, stateSetter, parseFloat);
  },

  addUnsavedChange: function (settingName, settingValue) {
    this.unsavedChanges.set(settingName, settingValue);
  },

  saveUnsavedChanges: function () {
    this.writeLocalStorage();
    this.notifyListeners();
    this.unsavedChanges.clear();
    this.gridTemplateChanged = false;
  },

  writeLocalStorage: function () {
    for (const [settingName, settingValue] of this.unsavedChanges) {
      window.localStorage.setItem(settingName, settingValue);
    }
    window.localStorage.setItem(
      CONTROLS_GRID_SETTING_NAME,
      ControlsGridSettingIntegration.getUnsavedGridTemplate()
    );
  },

  notifyListeners: function () {
    for (const setting of this.unsavedChanges.keys()) {
      window.dispatchEvent(new Event(setting));
    }
    if (this.controlsGridChanged) {
      window.dispatchEvent(new Event(CONTROLS_GRID_SETTING_NAME));
    }
  },
};

export default SettingsIntegration;
