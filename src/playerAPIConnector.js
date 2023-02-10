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

/* Trying to create a YT.Player on an iframe without a YouTube src will make
 * that iframe unable to be controlled with the YouTube API forever, even if
 * a valid YouTube src is added later on.
 *
 * Creating a YT.Player on an iframe with a YouTube src will make that iframe
 * controllable with the YouTube API forever, even if the src becomes
 * invalid and then valid again.
 */

// TODO: Some sort of error handling if polling for API ready takes too long

const playerAPIConnector = {
  playerAPI: null,

  // Maybe pass in player parameters here?
  connect: function (playerElementID) {
    const intervalID = setInterval(() => {
      if (window.isYouTubeIframeAPIReady === true) {
        this.playerAPI = new window.YT.Player(playerElementID);
        clearInterval(intervalID);
      }
    });
  },
};

export default playerAPIConnector;
