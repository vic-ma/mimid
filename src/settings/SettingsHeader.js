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

import "./SettingsHeader.scss";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";

export default function SettingsHeader({ onClose, onReset }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          className="SettingsHeaderClose"
          size="large"
          edge="start"
          onClick={onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
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
}
