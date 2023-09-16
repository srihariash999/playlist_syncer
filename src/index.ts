import { google, youtube_v3 } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import readline from "readline";
import fs from "fs";
import { fetchSpotifyPlaylistTracks } from "./spotify";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  TOKEN_PATH,
  SCOPES,
  myYtPlaylistId,
  useUnofficial,
} from "./constants";
import { YoutubeSearchResult } from "./models";
const youtubesearchapi = require("youtube-search-api");

// Create an OAuth2 client
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

//  Authorization function that reads existing token at TOKEN_PATH
//  and if that does not work, starts the process of getting new token.
const authorize = async () => {
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    console.log(" token " + token);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    console.log(" Auth initialised for youtube client ");
    return true;
  } catch (err) {
    console.log(" error authenticating from token.json " + err);
    await getAccessToken();
  }
};

// Function to get a new access token and store it at TOKEN_PATH
const getAccessToken = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<void>((resolve) => {
    rl.question("Enter the code from that page here: ", async (code) => {
      rl.close();
      try {
        const tokenResponse = await oAuth2Client.getToken(code);
        const token = tokenResponse.tokens;
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        resolve();
      } catch (err) {
        console.error("Error retrieving access token:", err);
      }
    });
  });
};

const youtubeClient: youtube_v3.Youtube = google.youtube({
  version: "v3",
  auth: oAuth2Client,
});

const searchSongByNameYoutubeOfficial = async (songName: string) => {
  try {
    let p: youtube_v3.Params$Resource$Search$List = {
      q: songName,
      type: ["video"],
      part: ["id"],
      maxResults: 1, // You can adjust this number as needed
    };

    const searchResponse = await youtubeClient.search.list(p);

    const searchResults = searchResponse.data.items;

    if (!searchResults) return;

    if (searchResults?.length === 0) {
      console.log("No videos found for the given song name.");
      return;
    }

    if (!searchResults[0].id) return;

    return searchResults[0].id.videoId;
  } catch (e) {
    console.error(
      "error while searching for video by name.(Youtube Official) ",
      e
    );
    return null;
  }
};

const searchSongByNameUnofficial = async (songName: string) => {
  try {
    var res: YoutubeSearchResult = await youtubesearchapi.GetListByKeyword(
      songName,
      false,
      1,
      {
        type: "video",
      }
    );

    if (res.items.length > 0) return res.items[0].id;
  } catch (e) {
    console.error("error while searching for video by name.(Unofficial) ", e);
    return null;
  }
};

const addSongToYoutubePlaylist = async (
  videoId: string,
  playlistId: string
) => {
  try {
    const addVideoResponse = await youtubeClient.playlistItems.insert({
      part: ["snippet"],
      mine: true,
      resource: {
        snippet: {
          playlistId: playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId: videoId,
          },
        },
      },
    } as youtube_v3.Params$Resource$Playlistitems$Insert);

    console.log(
      `Added the video to the playlist: ${addVideoResponse.data.snippet?.title}`
    );
  } catch (error) {
    console.error(
      "Error searching for and adding the song to the playlist:",
      error
    );
  }
};

async function fetchUserPlaylists() {
  const youtube = google.youtube({
    version: "v3",
    auth: oAuth2Client,
  });

  try {
    const response = await youtube.playlists.list({
      part: ["snippet"],
      mine: true,
    });

    const playlists = response.data.items;
    return playlists;
  } catch (error) {
    console.error("Error fetching user playlists:", error);
  }
}

const searchAndAddSongToPlaylist = async (
  songName: string,
  playlistId: string
) => {
  // Step 1: Search for the song by its name
  let videoId: string | null | undefined;
  if (useUnofficial) {
    videoId = await searchSongByNameUnofficial(songName);
  } else {
    videoId = await searchSongByNameYoutubeOfficial(songName);
  }

  if (!videoId) {
    console.log(
      ` Cannot find the video with search term (${songName}) so not adding it.`
    );
    return;
  }
  // Step 2: Add the found video to the specified playlist
  addSongToYoutubePlaylist(videoId, playlistId);
};

const main = async () => {
  // Get playlist from spotify.
  const spotifyPlaylist = await fetchSpotifyPlaylistTracks();

  if (!spotifyPlaylist) {
    console.log(" Cannot fetch spotify playlist, exiting.");
    return;
  }

  await authorize();

  for (var element of spotifyPlaylist.tracks.items) {
    console.log(" Trying to add song : " + element.track.name);
    const songName = `${element.track.name} ${element.track.artists[0].name}`;
    await searchAndAddSongToPlaylist(songName, myYtPlaylistId);
    await delay(5000);
  }
};

main();
