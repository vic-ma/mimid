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

import { useState } from "react";

/* TODO
 * All: lock zoom
 * Phone: lock orientation to portrait
 * Targeted padding for more aspect ratios
 */

export default function App() {
  const [YouTubePlayerSrc, setYouTubePlayerSrc] = useState("");
  const [URLBarError, setURLBarError] = useState(false);
  return (
    <div className="App">
      <URLBar onChange={URLBarOnChange} error={URLBarError} />
      <YouTubePlayer src={YouTubePlayerSrc} />
      <Controls />
    </div>
  );

  // transformation, verification
  function URLBarOnChange(event) {
    const url = event.target.value;
    const id = getVideoIDFromURL(url);
    if (id !== null) {
      setURLBarError(false);
      setYouTubePlayerSrc(getEmbedURLFromVideoID(id));
    } else if (url === "") {
      setURLBarError(false);
      setYouTubePlayerSrc("");
    } else {
      setURLBarError(true);
      setYouTubePlayerSrc("");
    }
  }

  // https://stackoverflow.com/a/27728417
  function getVideoIDFromURL(url) {
    const regex =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    const match = url.match(regex);
    return match !== null ? match[1] : null;
  }

  function getEmbedURLFromVideoID(id) {
    return "https://www.youtube.com/embed/" + id;
  }
}
