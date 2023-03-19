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

import { defaultsMap } from "./constants";

const SettingsIntegration = {
  unsavedChanges: new Map(),

  getFloatSetting: function (settingName) {
    return window.localStorage.getItem(settingName) !== null
      ? parseFloat(window.localStorage.getItem(settingName))
      : defaultsMap.get(settingName);
  },

  addFloatSettingListener: function (settingName, stateSetter) {
    window.addEventListener(settingName, (event) =>
      stateSetter(parseFloat(window.localStorage.getItem(settingName)))
    );
    //this.addSettingListener(settingName, stateSetter, parseFloat);
  },

  addSettingListener: function (settingName, stateSetter, typeConverter) {
    window.addEventListener(settingName, (event) =>
      stateSetter(typeConverter(window.localStorage.getItem(settingName)))
    );
  },

  addUnsavedChange: function (settingName, settingValue) {
    this.unsavedChanges.set(settingName, settingValue);
  },

  writeLocalStorage: function () {
    for (const [settingName, settingValue] of this.unsavedChanges) {
      window.localStorage.setItem(settingName, settingValue);
    }
  },

  notifyListeners: function () {
    for (const setting of this.unsavedChanges.keys()) {
      window.dispatchEvent(new Event(setting));
    }
  },

  saveUnsavedChanges: function () {
    this.writeLocalStorage();
    this.notifyListeners();
    this.unsavedChanges.clear();
  },
};

export default SettingsIntegration;
