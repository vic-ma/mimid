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

import HistoryDialog from "./HistoryDialog";

import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import PlayerAPIConnector from "./PlayerAPIConnector";

export default function HistoryButton() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <IconButton onClick={handleHistoryButtonClick} aria-label="history">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
        </svg>
      </IconButton>
      <HistoryDialog
        open={historyOpen}
        onClose={handleHistoryClose}
      ></HistoryDialog>
    </>
  );

  function handleHistoryButtonClick() {
    console.log(PlayerAPIConnector.playerAPI.getVideoData().title);
    setHistoryOpen(true);
  }

  function handleHistoryClose() {
    setHistoryOpen(false);
  }
}
