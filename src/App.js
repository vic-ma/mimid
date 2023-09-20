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

import "./App.scss";

import URLBar from "./URLBar.js";
import YouTubePlayer from "./YouTubePlayer.js";
import Controls from "./controls/Controls.js";
import Footer from "./Footer.js";
import PlayerAPIConnector from "./PlayerAPIConnector.js";
import SettingsIntegration from "./settings/SettingsIntegration";

import { AUTO_PASTE_SETTING_NAME } from "./settings/constants";
import { PREVIOUS_VIDEO_LS_KEY } from "./constants";

import Paper from "@mui/material/Paper";

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

// TODO: Analytics

export default function App() {
  const clipboardText = useRef("");

  // More optimized version would use deps and setting listener
  // to only run interval if auto-paste enabled.
  useEffect(() => {
    setInterval(() => {
      if (!SettingsIntegration.getBooleanSetting(AUTO_PASTE_SETTING_NAME)) {
        return;
      }
      navigator.clipboard
        .readText()
        .then((text) => onClipboardRead(text))
        .catch(() => {});
    }, 1000);
  }, []); // eslint-disable-line

  const [errorURLBar, setErrorURLBar] = useState(false);

  return (
    <Paper className="App">
      <div className="app-inner">
        <URLBar onChange={handleChangeURLBar} error={errorURLBar} />
        <YouTubePlayer />
        <Controls />
        <Footer />
      </div>
    </Paper>
  );

  function onClipboardRead(text) {
    if (text === clipboardText.current) {
      return;
    }
    clipboardText.current = text;
    const id = getVideoIDFromURL(text);
    if (id !== null && id !== getCurrentVideoID()) {
      setErrorURLBar(false);
      PlayerAPIConnector.playerAPI.loadVideoById(id);
      localStorage.setItem(PREVIOUS_VIDEO_LS_KEY, id);
    }
  }

  function handleChangeURLBar(event) {
    const url = event.target.value;
    const id = getVideoIDFromURL(url);
    if (id !== null) {
      setErrorURLBar(false);
      if (id === getCurrentVideoID()) {
        return;
      }
      PlayerAPIConnector.playerAPI.loadVideoById(id);
      localStorage.setItem(PREVIOUS_VIDEO_LS_KEY, id);
    } else if (url === "") {
      setErrorURLBar(false);
    } else {
      setErrorURLBar(true);
    }
  }

  function getCurrentVideoID() {
    return getVideoIDFromURL(PlayerAPIConnector.playerAPI.getVideoUrl());
  }

  // https://stackoverflow.com/a/27728417
  function getVideoIDFromURL(url) {
    const regex =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    const match = url.match(regex);
    return match !== null ? match[1] : null;
  }
}
