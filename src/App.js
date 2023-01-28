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

import "./global.scss";
import "./App.scss";

import URLBar from "./URLBar.js";
import YouTubePlayer from "./YouTubePlayer.js";
import Controls from "./Controls.js";

import { useRef, useState } from "react";
import { useEffect } from "react";

/* global isYouTubeIframeAPIReady, YT */

/* TODO
 * All: lock zoom
 * Phone: lock orientation to portrait
 * Targeted padding for more aspect ratios
 */

export default function App() {
  const [embedURL, setEmbedURL] = useState("");
  const [errorURLBar, setErrorURLBar] = useState(false);
  const playerRef = useRef(null);

  /* Trying to create a YT.Player on an iframe without a YouTube src will make
   * that iframe unable to be controlled with the YouTube API forever, even if
   * a valid YouTube src is added later on.
   *
   * Creating a YT.Player on an iframe with a YouTube src will make that iframe
   * controllable with the YouTube API forever, even if the src becomes
   * invalid and then valid again.
   */
  useEffect(() => {
    if (
      playerRef.current === null &&
      isYouTubeIframeAPIReady &&
      embedURL !== ""
    ) {
      playerRef.current = new YT.Player("youtube-player-iframe");
    }
  }, [embedURL]);

  return (
    <div className="App">
      <URLBar onChange={URLBarOnChange} error={errorURLBar} />
      <YouTubePlayer src={embedURL} />
      <Controls />
    </div>
  );

  function URLBarOnChange(event) {
    const url = event.target.value;
    const id = getVideoIDFromURL(url);
    if (id !== null) {
      setErrorURLBar(false);
      setEmbedURL(getEmbedURLFromVideoID(id));
    } else if (url === "") {
      setErrorURLBar(false);
      setEmbedURL("");
    } else {
      setErrorURLBar(true);
      setEmbedURL("");
    }
  }

  // https://stackoverflow.com/a/27728417
  function getVideoIDFromURL(url) {
    const regex =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    const match = url.match(regex);
    return match !== null ? match[1] : null;
  }

  // TODO: other options
  function getEmbedURLFromVideoID(id) {
    return "https://www.youtube.com/embed/" + id + "?enablejsapi=1";
  }
}
