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

import SettingsIntegration from "../settings/SettingsIntegration.js";
import PlayerAPIConnector from "../PlayerAPIConnector.js";
import { SLOW_SPEED_SETTING_NAME } from "../settings/constants.js";

import Button from "@mui/material/Button";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";

import { useState } from "react";
import { useEffect } from "react";

export default function SpeedButton({ gridArea }) {
  useEffect(() => {
    SettingsIntegration.addFloatSettingListener(
      SLOW_SPEED_SETTING_NAME,
      setSlowSpeed
    );
    PlayerAPIConnector.addEventListener(
      "onPlaybackRateChange",
      handlePlaybackRateChange
    );
  }, []);

  const [slowSpeed, setSlowSpeed] = useState(
    SettingsIntegration.getFloatSetting(SLOW_SPEED_SETTING_NAME)
  );
  const [currentSpeed, setCurrentSpeed] = useState(1);

  return (
    <Button
      style={{ gridArea: gridArea }}
      onClick={handleClick}
      variant="contained"
    >
      {getIcon()}
    </Button>
  );

  function getIcon() {
    if (currentSpeed === 1) {
      return <HourglassEmptyIcon />;
    }
    return <HourglassDisabledIcon />;
  }

  function handleClick() {
    const newSpeed = currentSpeed === 1 ? slowSpeed : 1;
    PlayerAPIConnector.playerAPI.setPlaybackRate(newSpeed);
    setCurrentSpeed(newSpeed);
  }

  function handlePlaybackRateChange(event) {
    setCurrentSpeed(event.data === 1 ? 1 : event.data);
  }
}
