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

import "./YouTubePlayer.scss";

// See: https://jameshfisher.com/2017/08/30/how-do-i-make-a-full-width-iframe/
//      https://css-tricks.com/aspect-ratio-boxes/

export default function YouTubePlayer() {
  return (
    <div className="YouTubePlayer">
      <div className="youtube-player-inner-div" id="youtube-player-inner-div" />
    </div>
  );
}
