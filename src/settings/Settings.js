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

import "./Settings.scss";

import SettingsHeader from "./SettingsHeader";
import SwitchSetting from "./SwitchSetting";
import SliderSetting from "./SliderSetting";
import ControlsGridSetting from "./ControlsGridSetting";
import {
  AUTO_PASTE_SETTING_NAME,
  SLOW_SPEED_SETTING_NAME,
  SKIP_BACKWARD_LONG_SETTING_NAME,
  SKIP_BACKWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_LONG_SETTING_NAME,
} from "./constants";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings({ open, onClose }) {
  return (
    <Dialog
      className="Settings"
      fullScreen
      disableRestoreFocus
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <div className="settings-inner-div">
        <SettingsHeader onClose={onClose} />
        <SwitchSetting
          label="Auto-paste Video URL"
          settingName={AUTO_PASTE_SETTING_NAME}
        ></SwitchSetting>
        <SliderSetting
          label="Slow Speed"
          settingName={SLOW_SPEED_SETTING_NAME}
          min={0.25}
          max={0.95}
          step={0.05}
        ></SliderSetting>
        <SliderSetting
          label="Skip Backward Long"
          settingName={SKIP_BACKWARD_LONG_SETTING_NAME}
          min={0.5}
          max={10}
          step={0.5}
        ></SliderSetting>
        <SliderSetting
          label="Skip Backward Short"
          settingName={SKIP_BACKWARD_SHORT_SETTING_NAME}
          min={0.5}
          max={10}
          step={0.5}
        ></SliderSetting>
        <SliderSetting
          label="Skip Forward Short"
          settingName={SKIP_FORWARD_SHORT_SETTING_NAME}
          min={0.5}
          max={10}
          step={0.5}
        ></SliderSetting>
        <SliderSetting
          label="Skip Foward Long"
          settingName={SKIP_FORWARD_LONG_SETTING_NAME}
          min={0.5}
          max={10}
          step={0.5}
        ></SliderSetting>
        <ControlsGridSetting></ControlsGridSetting>
      </div>
    </Dialog>
  );
}
