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

import PlayerAPIConnector from "../PlayerAPIConnector.js";
import SettingsIntegration from "../settings/SettingsIntegration.js";

import {
  SCALE_SKIPS_SETTING_NAME,
  AUTO_PAUSE_SETTING_NAME,
} from "../settings/constants.js";

import Button from "@mui/material/Button";

import { useState } from "react";
import { useEffect } from "react";

export default function SkipButton({ settingName, direction, gridArea }) {
  useEffect(() => {
    SettingsIntegration.addFloatSettingListener(settingName, setSkipAmount);
    SettingsIntegration.addBooleanSettingListener(
      AUTO_PAUSE_SETTING_NAME,
      setAutoPause
    );
  }, []); // eslint-disable-line

  const [skipAmount, setSkipAmount] = useState(
    SettingsIntegration.getFloatSetting(settingName)
  );

  const [autoPause, setAutoPause] = useState(
    SettingsIntegration.getBooleanSetting(AUTO_PAUSE_SETTING_NAME)
  );

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
    let label = "skip ";
    if (direction > 0) {
      label += "forward ";
    } else {
      label += "backward ";
    }
    return label + skipAmount + " seconds";
  }

  function getIcon() {
    const text = (
      <text
        x="50%"
        y="-42.5%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={skipAmount.toString().length > 1 ? "240" : "280"}
        fontWeight="bold"
      >
        {skipAmount}
      </text>
    );

    let path;
    if (direction > 0) {
      path = (
        <path d="M480.191-63.043q-78.017 0-146.282-29.01-68.265-29.01-119.418-80.151-51.153-51.141-80.17-119.273-29.017-68.132-29.017-146.145 0-78.251 29.13-146.423 29.131-68.173 80.109-119.151 50.978-50.978 119.354-80.109 68.376-29.13 146.668-29.13h23l-74.043-74.044 54.566-55.131 167.349 166.784-166.784 166.783-55.131-55 69.608-69.609h-23.565q-123.532 0-207.005 85.81t-83.473 208.826q0 123.016 85.992 209.103 85.991 86.087 208.826 86.087 122.834 0 209.204-85.809 86.369-85.808 86.369-209.104h79.218q0 78.391-28.994 146.429-28.995 68.037-80.109 119.022-51.114 50.984-119.249 80.115-68.136 29.13-146.153 29.13Z" />
      );
    } else {
      path = (
        <path d="M480.175-63.043q-78.001 0-146.327-29.13-68.327-29.131-119.441-80.115-51.114-50.985-80.109-119.022-28.994-68.038-28.994-146.429h79.218q0 123.296 86.154 209.104 86.155 85.809 209.223 85.809 122.832 0 208.923-86.019 86.091-86.02 86.091-208.894 0-123.296-83.473-209.105-83.473-85.808-207.005-85.808h-23l69.608 69.609-46.087 46.522-157.74-158.305 157.74-157.74 46.087 46.087-74.608 74.044h23q78.292 0 146.668 29.13 68.376 29.131 119.354 80.109 50.978 50.978 80.109 119.113 29.13 68.136 29.13 146.153t-29.005 146.282q-29.006 68.265-80.139 119.418-51.133 51.153-119.254 80.17-68.121 29.017-146.123 29.017Z" />
      );
    }

    return (
      <svg
        className="controls-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        viewBox="0 -960 960 960"
      >
        {path}
        {text}
      </svg>
    );
  }

  function handleClick() {
    const timeOfSkip = PlayerAPIConnector.playerAPI.getCurrentTime();
    PlayerAPIConnector.playerAPI.seekTo(
      timeOfSkip + getSkipAmount() * direction,
      true
    );

    if (direction < 0 && autoPause) {
      clearTimeout(window.timeoutID);
      window.timeoutID = setTimeout(
        () => PlayerAPIConnector.playerAPI.pauseVideo(), // Needs to be wrapped in arrow function for some reason
        getAutoPauseDuration()
      );
    } else if (autoPause) {
      clearTimeout(window.timeoutID);
    }
    PlayerAPIConnector.playerAPI.playVideo();
  }

  function getAutoPauseDuration() {
    let ERROR_CORRECTION = 125; // By default, the player pauses a bit too early
    if (/android/i.test(navigator.userAgent)) {
      ERROR_CORRECTION = 450;
    } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      ERROR_CORRECTION = 540;
    }
    const playbackRate = PlayerAPIConnector.playerAPI.getPlaybackRate();
    if (
      playbackRate === 1 ||
      SettingsIntegration.getBooleanSetting(SCALE_SKIPS_SETTING_NAME)
    ) {
      return skipAmount * 1000 + ERROR_CORRECTION;
    }
    return (skipAmount / playbackRate) * 1000 + ERROR_CORRECTION;
  }

  function getSkipAmount() {
    if (!SettingsIntegration.getBooleanSetting(SCALE_SKIPS_SETTING_NAME)) {
      return skipAmount;
    }
    return skipAmount * PlayerAPIConnector.playerAPI.getPlaybackRate();
  }
}
