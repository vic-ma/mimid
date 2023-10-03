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
      return (
        <svg
          className="controls-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="40"
          viewBox="0 -960 960 960"
        >
          <path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z" />
        </svg>
      );
    }
    return (
      <svg
        className="controls-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="40"
        width="40"
        viewBox="0 -960 960 960"
      >
        <path d="m819-28-52-52H160v-80h80v-120q0-61 28.5-114.5T348-480q-32-20-54.5-48T257-590L27-820l57-57L876-85l-57 57ZM602-474l-60-59q45-19 71.5-59t26.5-88v-120H320v45l-45-45-80-80h605v80h-80v120q0 64-31 119t-87 87ZM320-160h320v-47L419-428q-45 19-72 59t-27 89v120Zm400 0Z" />
      </svg>
    );
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
