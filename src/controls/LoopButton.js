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

export default function LoopButton({ gridArea }) {
  useEffect(
    () =>
      PlayerAPIConnector.addEventListener("onStateChange", handleStateChange),
    [] // eslint-disable-line
  );

  const stages = {
    SET_START: 1,
    SET_END: 2,
    DELETE: 3,
  };

  const [nextStage, setNextStage] = useState(stages.SET_START);

  const startTime = useRef(null);
  const endTime = useRef(null);
  const intervalID = useRef(null);

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
    let inner;

    if (nextStage === stages.SET_START) {
      inner = "A";
    } else if (nextStage === stages.SET_END) {
      inner = "B";
    } else {
      inner = "X";
    }

    return (
      <svg
        className="controls-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        viewBox="0 -960 960 960"
      >
        <path d="M280-75.478 115.478-240 280-404.522 326.522-356l-82.609 82.609h452.696v-160h66.782v226.782H243.913L326.522-124 280-75.478Zm-83.391-451.131v-226.782h520.043L633.478-836 680-884.522 844.522-720 680-555.478 633.478-604l83.174-82.609H263.391v160h-66.782Z" />
        <text
          x="50%"
          y="-50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="250"
          fontWeight="bold"
        >
          {inner}
        </text>
      </svg>
    );
  }

  function handleClick() {
    switch (nextStage) {
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
          }
        }, PlayerAPIConnector.STANDARD_DELAY);
        break;
      case stages.DELETE:
        deleteLoop();
        break;
      default:
        throw new Error("Invalid LoopButton stage.");
    }

    if (nextStage === stages.DELETE) {
      setNextStage(stages.SET_START);
    } else {
      setNextStage(nextStage + 1);
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
      setNextStage(stages.SET_START);
    }
  }
}
