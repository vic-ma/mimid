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

import Button from "@mui/material/Button";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

// TODO: handle skipping when paused
export default function LoopButton({ gridArea }) {
  useEffect(
    () =>
      PlayerAPIConnector.addEventListener("onStateChange", handleStateChange),
    [] //eslint-disable-line
  );

  const stages = {
    SET_START: 1,
    SET_END: 2,
    DELETE: 3,
  };

  const [currentStage, setCurrentStage] = useState(stages.SET_START);

  const startTime = useRef(null);
  const endTime = useRef(null);
  const intervalID = useRef(null);

  return (
    <Button
      style={{ gridArea: gridArea }}
      onClick={handleClick}
      variant="contained"
    >
      {currentStage}
    </Button>
  );

  function handleClick() {
    switch (currentStage) {
      case stages.SET_START:
        startTime.current = PlayerAPIConnector.playerAPI.getCurrentTime();
        break;
      case stages.SET_END:
        endTime.current = PlayerAPIConnector.playerAPI.getCurrentTime();
        maybeSwapStartAndEnd();
        intervalID.current = setInterval(() => {
          const currentTime = PlayerAPIConnector.playerAPI.getCurrentTime();
          if (
            currentTime < startTime.current ||
            currentTime > endTime.current
          ) {
            PlayerAPIConnector.playerAPI.seekTo(startTime.current, true);
            PlayerAPIConnector.playerAPI.playVideo();
          }
        }, PlayerAPIConnector.STANDARD_DELAY);
        break;
      case stages.DELETE:
        deleteLoop();
        break;
      default:
        throw new Error("Invalid LoopButton stage.");
    }
    if (currentStage === stages.DELETE) {
      setCurrentStage(stages.SET_START);
    } else {
      setCurrentStage(currentStage + 1);
    }
  }

  function maybeSwapStartAndEnd() {
    if (startTime.current > endTime.current) {
      [startTime.current, endTime.current] = [
        endTime.current,
        startTime.current,
      ];
    }
  }

  function deleteLoop() {
    clearInterval(intervalID.current);
    startTime.current = null;
    endTime.current = null;
    intervalID.current = null;
  }

  function handleStateChange(event) {
    if (event.data === PlayerAPIConnector.UNSTARTED) {
      deleteLoop();
      setCurrentStage(stages.SET_START);
    }
  }
}
