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

import PlayerAPIConnector from "./PlayerAPIConnector";

const DELIMITER = "`";

const History = {
  startEventListener: function () {
    PlayerAPIConnector.addEventListener("onStateChange", (event) => {
      if (event.data === PlayerAPIConnector.UNSTARTED) {
        this.tryAddCurrentVideo();
      }
    });
  },

  tryAddCurrentVideo: function () {
    const intervalId = setInterval(() => {
      const videoData = PlayerAPIConnector.playerAPI.getVideoData();
      if (videoData) {
        this.addCurrentVideo();
        clearInterval(intervalId);
      }
    }, 1000);
  },

  addCurrentVideo: function () {
    // WARNING: This method does not appear to be officially supported.
    const videoData = PlayerAPIConnector.playerAPI.getVideoData();
    const videoID = videoData.video_id;
    const title = videoData.title;
    const entry = videoID + " " + title;

    if (title == null) {
      return;
    }

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
  },

  getLastVideoID: function () {
    const history = localStorage.getItem("history");
    if (!history) {
      return null;
    } else {
      return history.split(DELIMITER)[0].split(" ")[0];
    }
  },

  getAutoCompleteOptions: function () {
    const history = localStorage.getItem("history");
    if (!history) {
      return [];
    } else {
      const historyArray = history.split(DELIMITER);
      const options = [];
      for (const entry of historyArray) {
        const videoID = entry.split(" ")[0];
        const title = entry.split(" ").slice(1).join(" ");
        options.push({ label: title, id: videoID });
      }
      return options;
    }
  },
};

export default History;
