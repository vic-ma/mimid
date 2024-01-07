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

import "./Settings.scss";

import SettingsHeader from "./SettingsHeader";
import SwitchSetting from "./SwitchSetting";
import SliderSetting from "./SliderSetting";
import ControlsGridSetting from "./ControlsGridSetting";
import {
  AUTO_PASTE_SETTING_NAME,
  SCALE_SKIPS_SETTING_NAME,
  AUTO_PAUSE_SETTING_NAME,
  SLOW_SPEED_SETTING_NAME,
  LOOP_DELAY_SETTING_NAME,
  SKIP_BACKWARD_LONG_SETTING_NAME,
  SKIP_BACKWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_LONG_SETTING_NAME,
  CONTROLS_OFFSET_SETTING_NAME,
  DARK_MODE_SETTING_NAME,
} from "./constants";
import ThemeSetting from "./ThemeSetting";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings({ open, onClose, onReset }) {
  return (
    <Dialog
      className="Settings"
      fullScreen
      disableRestoreFocus
      open={open}
      TransitionComponent={Transition}
      scroll="body"
    >
      <SettingsHeader onClose={onClose} onReset={onReset} />
      <List className="SettingsList">
        <ListItem className="SettingsListItem">
          <SwitchSetting
            label="Auto-paste Video URL"
            settingName={AUTO_PASTE_SETTING_NAME}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SwitchSetting
            label="Scale Skips by Speed"
            settingName={SCALE_SKIPS_SETTING_NAME}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SwitchSetting
            label="Skip Back Auto-Pause"
            settingName={AUTO_PAUSE_SETTING_NAME}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Slow Speed"
            settingName={SLOW_SPEED_SETTING_NAME}
            min={0.25}
            max={0.95}
            step={0.05}
            valueLabelFormat={speedSettingValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Delay Between Loops"
            settingName={LOOP_DELAY_SETTING_NAME}
            min={0}
            max={10}
            step={0.5}
            valueLabelFormat={secondsValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Skip Backward Long"
            settingName={SKIP_BACKWARD_LONG_SETTING_NAME}
            min={0.5}
            max={10}
            step={0.5}
            valueLabelFormat={secondsValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Skip Backward Short"
            settingName={SKIP_BACKWARD_SHORT_SETTING_NAME}
            min={0.5}
            max={10}
            step={0.5}
            valueLabelFormat={secondsValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Skip Forward Short"
            settingName={SKIP_FORWARD_SHORT_SETTING_NAME}
            min={0.5}
            max={10}
            step={0.5}
            valueLabelFormat={secondsValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Skip Foward Long"
            settingName={SKIP_FORWARD_LONG_SETTING_NAME}
            min={0.5}
            max={10}
            step={0.5}
            valueLabelFormat={secondsValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SliderSetting
            label="Controls Offset"
            settingName={CONTROLS_OFFSET_SETTING_NAME}
            min={0}
            max={20}
            step={1}
            valueLabelFormat={offsetSettingValueLabelFormat}
          />
        </ListItem>
        <ListItem className="SettingsListItem">
          <ControlsGridSetting />
        </ListItem>
        <ListItem className="SettingsListItem">
          <ThemeSetting />
        </ListItem>
        <ListItem className="SettingsListItem">
          <SwitchSetting
            label="Dark Mode"
            settingName={DARK_MODE_SETTING_NAME}
          />
        </ListItem>
      </List>
    </Dialog>
  );

  function secondsValueLabelFormat(value) {
    return `${value} s`;
  }

  function speedSettingValueLabelFormat(value) {
    return `${value}x`;
  }

  function offsetSettingValueLabelFormat(value) {
    return `${value} vh`;
  }
}
