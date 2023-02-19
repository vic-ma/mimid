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

import "./Controls.scss";

import LoopStartButton from "./buttons/LoopStartButton.js";
import PlayButton from "./buttons/PlayButton.js";
import SpeedButton from "./buttons/SpeedButton.js";
import SkipButton from "./buttons/SkipButton.js";

export default function Controls() {
  return (
    <div className="Controls">
      <div className="controls-grid">
        <LoopStartButton />
        <PlayButton />
        <SpeedButton className="SpeedButton1" speed={0.5} />
        <SkipButton className="SkipButtonBackwardLong" amount={-5} />
        <SkipButton className="SkipButtonBackwardShort" amount={-1} />
        <SkipButton className="SkipButtonForwardShort" amount={1} />
        <SkipButton className="SkipButtonForwardLong" amount={5} />
      </div>
    </div>
  );
}
