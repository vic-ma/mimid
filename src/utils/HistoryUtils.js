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

const DELIMITER = "`";

export function addCurrentVideo() {
  const videoData = PlayerAPIConnector.playerAPI.getVideoData();
  const videoID = videoData.video_id;
  const title = videoData.title;
  const entry = videoID + " " + title;

  const history = localStorage.getItem("history");

  if (!history) {
    localStorage.setItem("history", entry);
  } else {
    let historyArray = history.split(DELIMITER);
    const index = historyArray.indexOf(entry);
    if (index !== -1) {
      historyArray.splice(index, 1);
      localStorage.setItem(
        "history",
        entry + DELIMITER + historyArray.join(DELIMITER)
      );
    } else {
      localStorage.setItem("history", entry + DELIMITER + history);
    }
  }
}
