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

import {
  PLAY_BUTTON_GRID_AREA,
  SPEED_BUTTON_GRID_AREA,
  LOOP_BUTTON_GRID_AREA,
  SKIP_BACKWARD_LONG_BUTTON_GRID_AREA,
  SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_SHORT_BUTTON_GRID_AREA,
  SKIP_FORWARD_LONG_BUTTON_GRID_AREA,
} from "./constants.js";

import {
  SKIP_BACKWARD_LONG_SETTING_NAME,
  SKIP_BACKWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_LONG_SETTING_NAME,
} from "../settings/constants";

const SKIP_BACKWARD_DIRECTION = -1;
const SKIP_FORWARD_DIRECTION = 1;

export default function Controls() {
  return (
    <div className="Controls">
      <div className="controls-outer-div">
        <div className="controls-grid">
          <PlayButton gridArea={PLAY_BUTTON_GRID_AREA} />
          <SpeedButton gridArea={SPEED_BUTTON_GRID_AREA} />
          <LoopButton gridArea={LOOP_BUTTON_GRID_AREA} />
          <SkipButton
            settingName={SKIP_BACKWARD_LONG_SETTING_NAME}
            direction={SKIP_BACKWARD_DIRECTION}
            gridArea={SKIP_BACKWARD_LONG_BUTTON_GRID_AREA}
          />
          <SkipButton
            settingName={SKIP_BACKWARD_SHORT_SETTING_NAME}
            direction={SKIP_BACKWARD_DIRECTION}
            gridArea={SKIP_BACKWARD_SHORT_BUTTON_GRID_AREA}
          />
          <SkipButton
            settingName={SKIP_FORWARD_SHORT_SETTING_NAME}
            direction={SKIP_FORWARD_DIRECTION}
            gridArea={SKIP_FORWARD_SHORT_BUTTON_GRID_AREA}
          />
          <SkipButton
            settingName={SKIP_FORWARD_LONG_SETTING_NAME}
            direction={SKIP_FORWARD_DIRECTION}
            gridArea={SKIP_FORWARD_LONG_BUTTON_GRID_AREA}
          />
        </div>
      </div>
    </div>
  );
}
