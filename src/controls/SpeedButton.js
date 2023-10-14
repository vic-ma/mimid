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
      aria-label={getAriaLabel()}
    >
      {getIcon()}
    </Button>
  );

  function getAriaLabel() {
    if (currentSpeed === 1) {
      return "enable slow speed";
    }
    return "disable slow speed";
  }

  function getIcon() {
    let path;
    if (currentSpeed === 1) {
      path = (
        <path d="M317.652-152.319h324.696v-119.014q0-67.739-47.305-114.71Q547.739-433.014 480-433.014t-115.043 46.971q-47.305 46.971-47.305 114.71v119.014ZM480-526.986q67.739 0 115.043-47.304 47.305-47.304 47.305-115.044v-118.347H317.652v118.347q0 67.74 47.305 115.044Q412.261-526.986 480-526.986ZM144.173-64.173v-88.146h85.334v-118.883q0-65.914 33.435-121.849Q296.376-448.985 353.42-480q-57.044-31.681-90.478-87.616-33.435-55.935-33.435-121.849v-118.216h-85.334v-88.523h672.031v88.523H730.87v118.216q0 65.914-33.341 121.849-33.34 55.935-90.572 87.616 57.232 31.015 90.572 86.949 33.341 55.935 33.341 121.849v118.883h85.334v88.146H144.173ZM480-152.32Zm0-655.362Z" />
      );
    } else {
      path = (
        <path d="m835.87-26.681-37.68-37.492H144.173v-88.146h85.334v-118.883q0-65.247 33.768-121.704Q297.043-449.362 353.42-480q-38.377-22.333-68.413-59.138-30.037-36.805-44.066-82.472L23.884-838.667l52.565-52.565L888.435-79.246 835.87-26.681ZM598.725-473.478l-65.276-65.508q47.348-16.232 78.123-57.813 30.776-41.582 30.776-92.535v-118.347H317.652v53.463l-38.608-38.796v-14.667h-14.667l-88.146-88.523h639.973v88.523H730.87v118.347q0 68.001-36.109 126.421t-96.036 89.435ZM317.652-152.319h324.696v-67.904L436.117-426.246q-51.682 14.913-85.073 58.067-33.392 43.154-33.392 96.846v119.014Zm413.218 0h14.667l-14.667-14.667v14.667Z" />
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
        {path}
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
