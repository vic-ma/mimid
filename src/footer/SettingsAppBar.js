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

import "./SettingsAppBar.scss";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SettingsAppBar({ onClose }) {
  return (
    <AppBar className="SettingsAppBar">
      <Toolbar className="settings-toolbar">
        <IconButton
          className="settings-toolbar-close"
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <Typography className="settings-toolbar-title" variant="h6">
          Settings
        </Typography>
        <Button color="inherit">Default</Button>
        <Button color="inherit">Save</Button>
      </Toolbar>
    </AppBar>
  );
}
