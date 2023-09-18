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

import "./Footer.scss";

import SettingsButton from "./settings/SettingsButton.js";
import Settings from "./settings/Settings.js";
import SettingsIntegration from "./settings/SettingsIntegration.js";

import FooterAlert from "./FooterAlert";

import Button from "@mui/material/Button";

import { useState } from "react";

const PRIVACY_SEEN_LS_KEY = "privacy-seen";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(
    localStorage.getItem(PRIVACY_SEEN_LS_KEY) === null
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <footer className="Footer">
      <Button onClick={handlePrivacyButtonClick} variant="text">
        Privacy
      </Button>

      <FooterAlert
        title={"Privacy"}
        open={privacyOpen}
        onClose={handlePrivacyClose}
      ></FooterAlert>
      <SettingsButton onClick={handleSettingsButtonClick} />
      <Settings
        open={settingsOpen}
        onClose={handleSettingsClose}
        onReset={handleSettingsReset}
      />

      <a href="https://docs.mimid.app" target="_blank" rel="noreferrer">
        <Button variant="text">About</Button>
      </a>
    </footer>
  );

  function handlePrivacyButtonClick() {
    setPrivacyOpen(true);
  }

  function handlePrivacyClose() {
    localStorage.setItem(PRIVACY_SEEN_LS_KEY, "true");
    setPrivacyOpen(false);
  }

  function handleSettingsButtonClick() {
    setSettingsOpen(true);
  }

  function handleSettingsClose() {
    SettingsIntegration.saveUnsavedChanges();
    setSettingsOpen(false);
  }

  // Ideally, it doesn't close, and instead every setting
  // resets their states by gettting their setting.
  function handleSettingsReset() {
    SettingsIntegration.reset();
    setSettingsOpen(false);
  }
}
