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

import "./Controls.scss";

import LoopButton from "./LoopButton.js";
import PlayButton from "./PlayButton.js";
import SpeedButton from "./SpeedButton.js";
import SkipButton from "./SkipButton.js";
import SettingsIntegration from "../settings/SettingsIntegration";
import ControlsGridSettingIntegration from "../settings/ControlsGridSettingIntegration";

import {
  PLAY_BUTTON_GRID_AREA,
  SPEED_BUTTON_GRID_AREA,
  LOOP_BUTTON_GRID_AREA,
  SKIP_BACKWARD_LONG_BUTTON_GRID_AREA,
  SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_LONG_BUTTON_GRID_AREA,
  SKIP_BACKWARD_DIRECTION,
  SKIP_FORWARD_DIRECTION,
} from "./constants.js";

import {
  SKIP_BACKWARD_LONG_SETTING_NAME,
  SKIP_BACKWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_LONG_SETTING_NAME,
  CONTROLS_GRID_SETTING_NAME,
} from "../settings/constants";

import { useState } from "react";
import { useEffect } from "react";

export default function Controls() {
  useEffect(() => {
    SettingsIntegration.addStringSettingListener(
      CONTROLS_GRID_SETTING_NAME,
      setGridTemplateAreas
    );
  }, []);

  const [gridTemplateAreas, setGridTemplateAreas] = useState(
    SettingsIntegration.getStringSetting(CONTROLS_GRID_SETTING_NAME)
  );

  let buttons = new Array(7);

  if (ControlsGridSettingIntegration.buttonInGrid(PLAY_BUTTON_GRID_AREA)) {
    buttons.push(<PlayButton key={1} gridArea={PLAY_BUTTON_GRID_AREA} />);
  }
  if (ControlsGridSettingIntegration.buttonInGrid(SPEED_BUTTON_GRID_AREA)) {
    buttons.push(<SpeedButton key={2} gridArea={SPEED_BUTTON_GRID_AREA} />);
  }
  if (ControlsGridSettingIntegration.buttonInGrid(LOOP_BUTTON_GRID_AREA)) {
    buttons.push(<LoopButton key={3} gridArea={LOOP_BUTTON_GRID_AREA} />);
  }
  if (
    ControlsGridSettingIntegration.buttonInGrid(
      SKIP_BACKWARD_LONG_BUTTON_GRID_AREA
    )
  ) {
    buttons.push(
      <SkipButton
        key={4}
        settingName={SKIP_BACKWARD_LONG_SETTING_NAME}
        direction={SKIP_BACKWARD_DIRECTION}
        gridArea={SKIP_BACKWARD_LONG_BUTTON_GRID_AREA}
      />
    );
  }
  if (
    ControlsGridSettingIntegration.buttonInGrid(
      SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA
    )
  ) {
    buttons.push(
      <SkipButton
        key={5}
        settingName={SKIP_BACKWARD_SHORT_SETTING_NAME}
        direction={SKIP_BACKWARD_DIRECTION}
        gridArea={SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA}
      />
    );
  }
  if (
    ControlsGridSettingIntegration.buttonInGrid(
      SKIP_FORWARD_SHORT_BUTTON_GRID_AREA
    )
  ) {
    buttons.push(
      <SkipButton
        key={6}
        settingName={SKIP_FORWARD_SHORT_SETTING_NAME}
        direction={SKIP_FORWARD_DIRECTION}
        gridArea={SKIP_FORWARD_SHORT_BUTTON_GRID_AREA}
      />
    );
  }
  if (
    ControlsGridSettingIntegration.buttonInGrid(
      SKIP_FORWARD_LONG_BUTTON_GRID_AREA
    )
  ) {
    buttons.push(
      <SkipButton
        key={7}
        settingName={SKIP_FORWARD_LONG_SETTING_NAME}
        direction={SKIP_FORWARD_DIRECTION}
        gridArea={SKIP_FORWARD_LONG_BUTTON_GRID_AREA}
      />
    );
  }

  let gridTemplateRows = "";
  for (let i = 1; i <= ControlsGridSettingIntegration.numRows; i++) {
    gridTemplateRows += "1fr ";
  }
  gridTemplateRows = gridTemplateRows.slice(0, -1);

  let gridTemplateColumns = "";
  for (let i = 1; i <= ControlsGridSettingIntegration.numColumns; i++) {
    gridTemplateColumns += "1fr ";
  }
  gridTemplateColumns = gridTemplateColumns.slice(0, -1);

  return (
    <div className="Controls">
      <div className="controls-outer-div">
        <div
          className="controls-grid"
          style={{
            gridTemplateAreas: gridTemplateAreas,
            gridTemplateRows: gridTemplateRows,
            gridTemplateColumns: gridTemplateColumns,
          }}
        >
          {buttons}
        </div>
      </div>
    </div>
  );
}
