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

import SettingsAppBar from "./SettingsAppBar";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings({ open, onClose }) {
  return (
    <Dialog
      fullScreen
      disableRestoreFocus
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <SettingsAppBar onClose={onClose} />
    </Dialog>
  );
}
