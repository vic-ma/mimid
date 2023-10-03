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

import Button from "@mui/material/Button";
import PlayerAPIConnector from "../PlayerAPIConnector.js";

import { useState } from "react";
import { useEffect } from "react";

export default function PlayButton({ gridArea }) {
  useEffect(
    () =>
      PlayerAPIConnector.addEventListener("onStateChange", handleStateChange),
    []
  );

  const [playerState, setPlayerState] = useState("Unset");

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
    if (
      playerState === PlayerAPIConnector.PLAYING ||
      playerState === PlayerAPIConnector.BUFFERING
    ) {
      return (
        <svg
          className="controls-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="40"
          viewBox="0 -960 960 960"
        >
          <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
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
        <path d="M320-200v-560l440 280-440 280Z" />
      </svg>
    );
  }

  function handleClick() {
    if (playerState === PlayerAPIConnector.PAUSED) {
      PlayerAPIConnector.playerAPI.playVideo();
    } else {
      PlayerAPIConnector.playerAPI.pauseVideo();
    }
  }

  function handleStateChange(event) {
    setPlayerState(event.data);
  }
}
