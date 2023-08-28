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

import "./SettingsHeader.scss";

import SettingsIntegration from "./SettingsIntegration";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SettingsHeader({ onClose }) {
  return (
    <AppBar className="SettingsHeader">
      <Toolbar>
        <Button
          className="SettingsHeaderClose"
          variant="text"
          onClick={onClose}
        >
          X
        </Button>
        <Typography className="SettingsHeaderLabel" variant="h5">
          Settings
        </Typography>
        <Button
          className="SettingsHeaderReset"
          variant="text"
          onClick={onReset}
        >
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  );

  // Ideally, it doesn't close, and instead every setting
  // resets their states by gettting their setting.
  function onReset() {
    SettingsIntegration.reset();
    onClose();
  }
}
