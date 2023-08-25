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
import Controls from "./controls/Controls.js";
import Footer from "./Footer.js";
import PlayerAPIConnector from "./PlayerAPIConnector.js";

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

/* TODO
 * All: lock zoom
 * Phone: lock orientation to portrait
 * Targeted padding for more aspect ratios
 */

export default function App() {
  const clipboardText = useRef("");

  useEffect(() => {
    setInterval(() => {
      navigator.clipboard
        .readText()
        .then((text) => onClipboardRead(text))
        .catch((error) => {});
    }, 1000);
  }, []);

  const [errorURLBar, setErrorURLBar] = useState(false);

  return (
    <div className="App">
      <div className="app-inner">
        <URLBar onChange={handleChangeURLBar} error={errorURLBar} />
        <YouTubePlayer />
        <Controls />
        <Footer />
      </div>
    </div>
  );

  function onClipboardRead(text) {
    if (text === clipboardText.current) {
      return;
    }
    clipboardText.current = text;
    const id = getVideoIDFromURL(text);
    if (id !== null) {
      setErrorURLBar(false);
      PlayerAPIConnector.playerAPI.loadVideoById(id);
    }
  }

  function handleChangeURLBar(event) {
    const url = event.target.value;
    const id = getVideoIDFromURL(url);
    if (id !== null) {
      setErrorURLBar(false);
      PlayerAPIConnector.playerAPI.loadVideoById(id);
    } else if (url === "") {
      setErrorURLBar(false);
    } else {
      setErrorURLBar(true);
    }
  }

  // https://stackoverflow.com/a/27728417
  function getVideoIDFromURL(url) {
    const regex =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    const match = url.match(regex);
    return match !== null ? match[1] : null;
  }
}
