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

import { SvgIcon } from "@mui/material";
import PlayerAPIConnector from "../PlayerAPIConnector.js";
import SettingsIntegration from "../settings/SettingsIntegration.js";

import { SCALE_SKIPS_SETTING_NAME } from "../settings/constants.js";

import Button from "@mui/material/Button";

import { useState } from "react";
import { useEffect } from "react";

export default function SkipButton({ settingName, direction, gridArea }) {
  useEffect(() => {
    SettingsIntegration.addFloatSettingListener(settingName, setSkipAmount);
  }, []); // eslint-disable-line

  const [skipAmount, setSkipAmount] = useState(
    SettingsIntegration.getFloatSetting(settingName)
  );

  return (
    <Button
      style={{ gridArea: gridArea }}
      onClick={onClick}
      variant="contained"
    >
      {getIcon()}
    </Button>
  );

  function getIcon() {
    const text = (
      <text
        x="50%"
        y="-43%"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="200px"
      >
        {skipAmount}
      </text>
    );

    let path;
    if (direction > 0) {
      path = (
        <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800h6l-62-62 56-58 160 160-160 160-56-58 62-62h-6q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440h80q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" />
      );
    } else {
      path = (
        <path d="m 480,-80 q 75,0 140.5,-28.5 65.5,-28.5 114,-77 48.5,-48.5 77,-114 Q 840,-365 840,-440 q 0,-75 -28.5,-140.5 -28.5,-65.5 -77,-114 -48.5,-48.5 -114,-77 Q 555,-800 480,-800 h -6 l 62,-62 -56,-58 -160,160 160,160 56,-58 -62,-62 h 6 q 117,0 198.5,81.5 81.5,81.5 81.5,198.5 0,117 -81.5,198.5 Q 597,-160 480,-160 363,-160 281.5,-241.5 200,-323 200,-440 h -80 q 0,75 28.5,140.5 28.5,65.5 77,114 48.5,48.5 114,77 Q 405,-80 480,-80 Z" />
      );
    }

    return (
      <SvgIcon className="controls-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          {path}
          {text}
        </svg>
      </SvgIcon>
    );
  }

  function onClick() {
    const currentTime = PlayerAPIConnector.playerAPI.getCurrentTime();
    PlayerAPIConnector.playerAPI.seekTo(
      currentTime + getSkipAmount() * direction,
      true
    );
  }

  function getSkipAmount() {
    if (!SettingsIntegration.getBooleanSetting(SCALE_SKIPS_SETTING_NAME)) {
      return skipAmount;
    }
    return skipAmount * PlayerAPIConnector.playerAPI.getPlaybackRate();
  }
}
