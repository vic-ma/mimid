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

// NOTE: All defaults must be strings, since localStorage uses only strings,
//       so it keeps the conversion process uniform.

export const defaultsMap = new Map();

export const AUTO_PASTE_SETTING_NAME = "auto-paste";
export const AUTO_PASTE_SETTING_DEFAULT = "false";
defaultsMap.set(AUTO_PASTE_SETTING_NAME, AUTO_PASTE_SETTING_DEFAULT);

export const SCALE_SKIPS_SETTING_NAME = "scale-skips";
export const SCALE_SKIPS_SETTING_DEFAULT = "true";
defaultsMap.set(SCALE_SKIPS_SETTING_NAME, SCALE_SKIPS_SETTING_DEFAULT);

export const AUTO_PAUSE_SETTING_NAME = "auto-pause";
export const AUTO_PAUSE_SETTING_DEFAULT = "false";
defaultsMap.set(AUTO_PAUSE_SETTING_NAME, AUTO_PAUSE_SETTING_DEFAULT);

export const SLOW_SPEED_SETTING_NAME = "slow-speed";
export const SLOW_SPEED_SETTING_DEFAULT = "0.5";
defaultsMap.set(SLOW_SPEED_SETTING_NAME, SLOW_SPEED_SETTING_DEFAULT);

export const LOOP_DELAY_SETTING_NAME = "loop-delay";
export const LOOP_DELAY_SETTING_DEFAULT = "0";
defaultsMap.set(LOOP_DELAY_SETTING_NAME, LOOP_DELAY_SETTING_DEFAULT);

export const SKIP_BACKWARD_LONG_SETTING_NAME = "skip-backward-long";
export const SKIP_BACKWARD_LONG_SETTING_DEFAULT = "5";
defaultsMap.set(
  SKIP_BACKWARD_LONG_SETTING_NAME,
  SKIP_BACKWARD_LONG_SETTING_DEFAULT
);

export const SKIP_BACKWARD_SHORT_SETTING_NAME = "skip-backward-short";
export const SKIP_BACKWARD_SHORT_SETTING_DEFAULT = "2";
defaultsMap.set(
  SKIP_BACKWARD_SHORT_SETTING_NAME,
  SKIP_BACKWARD_SHORT_SETTING_DEFAULT
);

export const SKIP_FORWARD_SHORT_SETTING_NAME = "skip-forward-short";
export const SKIP_FORWARD_SHORT_SETTING_DEFAULT = "2";
defaultsMap.set(
  SKIP_FORWARD_SHORT_SETTING_NAME,
  SKIP_FORWARD_SHORT_SETTING_DEFAULT
);

export const SKIP_FORWARD_LONG_SETTING_NAME = "skip-forward-long";
export const SKIP_FORWARD_LONG_SETTING_DEFAULT = "5";
defaultsMap.set(
  SKIP_FORWARD_LONG_SETTING_NAME,
  SKIP_FORWARD_LONG_SETTING_DEFAULT
);

export const CONTROLS_OFFSET_SETTING_NAME = "controls-offset";
export const CONTROLS_OFFSET_SETTING_DEFAULT = "0";
defaultsMap.set(CONTROLS_OFFSET_SETTING_NAME, CONTROLS_OFFSET_SETTING_DEFAULT);

export const CONTROLS_GRID_SETTING_NAME = "controls-grid-template-areas";
export const CONTROLS_GRID_SETTING_DEFAULT =
  "'P P P P' 'L L S S' 'BL BS FS FL'";
defaultsMap.set(CONTROLS_GRID_SETTING_NAME, CONTROLS_GRID_SETTING_DEFAULT);

export const THEME_SETTING_NAME = "theme-color";
export const THEME_SETTING_DEFAULT = "Black";
defaultsMap.set(THEME_SETTING_NAME, THEME_SETTING_DEFAULT);

export const DARK_MODE_SETTING_NAME = "dark-mode";
export const DARK_MODE_SETTING_DEFAULT = "false";
defaultsMap.set(DARK_MODE_SETTING_NAME, DARK_MODE_SETTING_DEFAULT);
