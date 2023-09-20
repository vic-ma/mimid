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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import PlayerAPIConnector from "./PlayerAPIConnector.js";
import reportWebVitals from "./reportWebVitals";
import ControlsGridSettingIntegration from "./settings/ControlsGridSettingIntegration";

import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    //mode: "dark",
  },
});

ControlsGridSettingIntegration.initialize();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

PlayerAPIConnector.connect("youtube-player-inner-div");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
