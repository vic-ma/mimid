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

import "./global.scss";
import "./App.scss";

import URLBar from "./URLBar.js";
import YouTubePlayer from "./YouTubePlayer.js";
import Controls from "./Controls.js";

/* TODO
 * All: lock zoom
 * Phone: lock orientation to portrait
 * Targeted padding for more aspect ratios
 */

export default function App() {
  return (
    <div className="App">
      <URLBar />
      <YouTubePlayer />
      <Controls />
    </div>
  );
}
