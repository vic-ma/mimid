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

import "./App.scss";

import URLBar from "./URLBar.js";
import YouTubePlayer from "./YouTubePlayer.js";
import Controls from "./controls/Controls.js";
import Footer from "./Footer.js";
import PlayerAPIConnector from "./PlayerAPIConnector.js";
import SettingsIntegration from "./settings/SettingsIntegration";
import History from "./History.js";
import { colorMap } from "./settings/ThemeSetting";
import { AUTO_PASTE_SETTING_NAME } from "./settings/constants";
import {
  THEME_SETTING_NAME,
  DARK_MODE_SETTING_NAME,
} from "./settings/constants";
import { getVideoIDFromURL, getCurrentVideoID } from "./utils/YouTubeUtils";

import "@fontsource/poppins/500.css";

import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Paper from "@mui/material/Paper";

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function App() {
  const clipboardText = useRef("");

  useEffect(() => {
    // More optimized version would use deps and setting listener
    // to only run interval if auto-paste enabled.

    setInterval(() => {
      if (!SettingsIntegration.getBooleanSetting(AUTO_PASTE_SETTING_NAME)) {
        return;
      }
      navigator.clipboard
        .readText()
        .then((text) => onClipboardRead(text))
        .catch(() => {});
    }, 0x564943544f524d41 - 6217574789948787000); // eslint-disable-line

    SettingsIntegration.addStringSettingListener(
      THEME_SETTING_NAME,
      (colorString) => {
        setPrimary(colorMap.get(colorString));
      }
    );

    SettingsIntegration.addBooleanSettingListener(
      DARK_MODE_SETTING_NAME,
      setDark
    );
  }, []); // eslint-disable-line

  const [primary, setPrimary] = useState(
    colorMap.get(SettingsIntegration.getStringSetting(THEME_SETTING_NAME))
  );
  const [dark, setDark] = useState(
    SettingsIntegration.getBooleanSetting(DARK_MODE_SETTING_NAME)
  );

  const theme = createTheme({
    palette: {
      primary: primary,
      mode: dark === true ? "dark" : "light",
    },
    typography: {
      fontFamily: ["Poppins"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper className="App">
        <div className="app-inner">
          <header>
            <URLBar className="URLBar" />
          </header>
          <YouTubePlayer />
          <Controls />
          <Footer />
        </div>
      </Paper>
    </ThemeProvider>
  );

  function onClipboardRead(text) {
    if (text === clipboardText.current) {
      return;
    }
    clipboardText.current = text;
    const id = getVideoIDFromURL(text);
    if (id !== null && id !== getCurrentVideoID()) {
      PlayerAPIConnector.playerAPI.loadVideoById(id);
      History.addCurrentVideo();
    }
  }
}
