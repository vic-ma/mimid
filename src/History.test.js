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

import History from "./History";
import LocalStorageMock from "./utils/localStorageMock";
import PlayerAPIConnector from "./PlayerAPIConnector";

beforeEach(() => {
  localStorage.clear();
});

test("Add single video", () => {
  History.addVideo(generateVideoData("id", "title"));
  expect(History.getLastVideoID()).toBe("id");
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title",
      id: "id",
    },
  ]);
});

test("Add multiple videos", () => {
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id3", "title3"));
  expect(History.getLastVideoID()).toBe("id3");
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title3",
      id: "id3",
    },
    {
      label: "title2",
      id: "id2",
    },
    {
      label: "title1",
      id: "id1",
    },
  ]);
});

test("Add same video simple", () => {
  History.addVideo(generateVideoData("id", "title"));
  History.addVideo(generateVideoData("id", "title"));
  History.addVideo(generateVideoData("id", "title"));
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title",
      id: "id",
    },
  ]);
});

test("Add same video last", () => {
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id3", "title3"));
  expect(History.getLastVideoID()).toBe("id3");
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title3",
      id: "id3",
    },
    {
      label: "title2",
      id: "id2",
    },
    {
      label: "title1",
      id: "id1",
    },
  ]);
});

test("Add same video middle", () => {
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id2", "title2"));
  expect(History.getLastVideoID()).toBe("id2");
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title2",
      id: "id2",
    },
    {
      label: "title3",
      id: "id3",
    },
    {
      label: "title1",
      id: "id1",
    },
  ]);
});

test("Add same video first", () => {
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id1", "title1"));
  expect(History.getLastVideoID()).toBe("id1");
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title1",
      id: "id1",
    },
    {
      label: "title3",
      id: "id3",
    },
    {
      label: "title2",
      id: "id2",
    },
  ]);
});

test("Add same video mixed", () => {
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id1", "title1"));
  History.addVideo(generateVideoData("id2", "title2"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id4", "title4"));
  History.addVideo(generateVideoData("id5", "title5"));
  History.addVideo(generateVideoData("id5", "title5"));
  History.addVideo(generateVideoData("id5", "title5"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id3", "title3"));
  History.addVideo(generateVideoData("id4", "title4"));
  History.addVideo(generateVideoData("id4", "title4"));
  History.addVideo(generateVideoData("id4", "title4"));

  expect(History.getLastVideoID()).toBe("id4");
  expect(History.getAutocompleteOptions()).toEqual([
    {
      label: "title4",
      id: "id4",
    },
    {
      label: "title3",
      id: "id3",
    },
    {
      label: "title5",
      id: "id5",
    },
    {
      label: "title2",
      id: "id2",
    },
    {
      label: "title1",
      id: "id1",
    },
  ]);
});

test("Add max videos", () => {
  for (let i = 1; i <= 101; i++) {
    History.addVideo(generateVideoData("id" + i, "title" + i));
  }
  expect(History.getLastVideoID()).toBe("id101");

  let expectedAutocompleteOptions = [];
  for (let i = 101; i > 1; i--) {
    expectedAutocompleteOptions.push({
      label: "title" + i,
      id: "id" + i,
    });
  }
  expect(History.getAutocompleteOptions()).toEqual(expectedAutocompleteOptions);
});

function generateVideoData(videoID, title) {
  return {
    video_id: videoID,
    title: title,
  };
}
