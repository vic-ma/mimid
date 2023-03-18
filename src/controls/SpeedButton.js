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

import PlayerAPIConnector from "../PlayerAPIConnector";

import Button from "@mui/material/Button";

import { useState } from "react";
import { useEffect } from "react";

// The current state vs. next state problem could make this button confusing
// Maybe use some light-up mechanic? Maybe with a snail / tortoise?
export default function SpeedButton({ altSpeed }) {
  useEffect(
    () =>
      PlayerAPIConnector.addEventListener(
        "onPlaybackRateChange",
        handlePlaybackRateChange
      ),
    [] // eslint-disable-line
  );

  const [currentSpeed, setCurrentSpeed] = useState(1);
  return (
    <Button className="SpeedButton" onClick={handleClick} variant="contained">
      {currentSpeed + "X"}
    </Button>
  );

  function handleClick() {
    const newSpeed = currentSpeed === 1 ? altSpeed : 1;
    PlayerAPIConnector.PlayerAPI.setPlaybackRate(newSpeed);
    setCurrentSpeed(newSpeed);
  }

  function handlePlaybackRateChange(event) {
    setCurrentSpeed(event.data === 1 ? 1 : event.data);
  }
}
