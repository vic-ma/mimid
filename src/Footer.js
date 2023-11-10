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

import FooterDialog from "./FooterDialog";

import KofiImage from "./kofi.png";

import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";

import { useState } from "react";

const PRIVACY_SEEN_LS_KEY = "privacy-seen";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(
    localStorage.getItem(PRIVACY_SEEN_LS_KEY) === null
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <footer className="Footer">
      <Button onClick={handlePrivacyButtonClick} variant="text">
        Privacy
      </Button>
      <FooterDialog
        title={"Privacy Policy"}
        open={privacyOpen}
        onClose={handlePrivacyClose}
      >
        <DialogContentText>
          <Typography variant="h6">Mimid</Typography>
          Mimid does not collect any data. However, Mimid uses third-party
          services that do collect data. These are detailed below.
          <br />
          <br />
          <Typography variant="h6">YouTube</Typography>
          Mimid contains an embedded YouTube player, and Mimid uses YouTube API
          Services to control this player. By using Mimid, you agree to be bound
          by the{" "}
          <a
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noreferrer"
          >
            YouTube Terms of Service
          </a>
          .
          <br />
          <br />
          YouTube collects data and uses cookies in accordance with the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google Privacy Policy
          </a>
          .
          <br />
          <br />
          <Typography variant="h6">Plausible</Typography>
          Analytics Mimid uses Plausible Analytics to collect anonymized web
          analytics data. Plausible Analytics collects data in accordance with
          the{" "}
          <a
            href="https://plausible.io/data-policy"
            target="_blank"
            rel="noreferrer"
          >
            Plausible Data Policy
          </a>
          .
          <br />
          <br />
          <Typography variant="h6">GitHub</Typography>
          Pages Mimid is hosted by GitHub Pages. GitHub Pages collects data in
          accordance with the{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Privacy Statement
          </a>
          .
        </DialogContentText>
      </FooterDialog>

      <SettingsButton onClick={handleSettingsButtonClick} />
      <Settings
        open={settingsOpen}
        onClose={handleSettingsClose}
        onReset={handleSettingsReset}
      />

      <Button onClick={handleAboutButtonClick} variant="text">
        About
      </Button>
      <FooterDialog title={"About"} open={aboutOpen} onClose={handleAboutClose}>
        <DialogContentText>
          Mimid is a music player designed for learning songs by ear.
          <br />
          <br />
          <a href="https://docs.mimid.app" target="_blank" rel="noreferrer">
            Documentation
          </a>
          <br />
          <br />
          <a
            href="https://github.com/vic-ma/mimid"
            target="_blank"
            rel="noreferrer"
          >
            Source Code
          </a>
          <br />
          <br />
          <a href="https://ko-fi.com/mimid" target="_blank" rel="noreferrer">
            Support Mimid
          </a>
        </DialogContentText>
      </FooterDialog>
    </footer>
  );

  function handlePrivacyButtonClick() {
    setPrivacyOpen(true);
  }

  function handlePrivacyClose() {
    localStorage.setItem(PRIVACY_SEEN_LS_KEY, "true");
    setPrivacyOpen(false);
  }

  function handleAboutButtonClick() {
    setAboutOpen(true);
  }

  function handleAboutClose() {
    setAboutOpen(false);
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
