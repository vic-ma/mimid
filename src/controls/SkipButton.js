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

import Button from "@mui/material/Button";

import { useState } from "react";
import { useEffect } from "react";

// TODO: Change paused behaviour
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
      {"Skip " + skipAmount}
    </Button>
  );

  function onClick() {
    const currentTime = PlayerAPIConnector.playerAPI.getCurrentTime();
    PlayerAPIConnector.playerAPI.seekTo(
      currentTime + skipAmount * direction,
      true
    );
  }
}
