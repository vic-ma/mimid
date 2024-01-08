/*
Copyright 2023 Victor Ma

This file is part of Mimid.

Mimid is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

Mimid is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with Mimid. If not, see <https://www.gnu.org/licenses/>.
*/

import PlayerAPIConnector from "./PlayerAPIConnector";

const DELIMITER = "`";
const HISTORY_LIMIT = 100;

const History = {
  addCurrentVideo: function () {
    const intervalId = setInterval(() => {
      let videoData;

      // WARNING: getVideoData() does not appear to be officially supported.
      // Need this try-catch block in case this interval runs before the API is ready.
      try {
        videoData = PlayerAPIConnector.playerAPI.getVideoData();
      } catch (error) {
        // eslint-disable-next-line
      }

      if (videoData) {
        this.addVideo(videoData);
        this.notifyListeners();
        clearInterval(intervalId);
      }
    }, 1000);
  },

  addVideo: function (videoData) {
    const videoID = videoData.video_id;
    const title = videoData.title;
    const entry = videoID + " " + title;

    if (title == null || title === "") {
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
      }
      historyArray.unshift(entry);
      if (historyArray.length > HISTORY_LIMIT) {
        historyArray.pop();
      }
      localStorage.setItem("history", historyArray.join(DELIMITER));
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

  getAutocompleteOptions: function () {
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

  addHistoryChangeListener: function (handler) {
    window.addEventListener("history", () => handler());
  },

  notifyListeners: function () {
    window.dispatchEvent(new Event("history"));
  },
};

export default History;
