import axios from "axios";
import { AccessTokenModel, PlaylistRoot } from "./models";
import {
  spotifyPlaylistId,
  spotify_client_id,
  spotify_client_secret,
} from "./constants";

const authorize = async () => {
  try {
    console.log(" spotify_client_id " + spotify_client_id);
    console.log(" spotify_client_secret " + spotify_client_secret);

    const authOptions = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            spotify_client_id.toString() +
              ":" +
              spotify_client_secret.toString()
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials",
    };

    const response = await axios<AccessTokenModel>(authOptions);

    if (response.status !== 200) {
      console.log(" Cannot fetch access token.");
      console.error(response.data);
      return null;
    }

    console.log("Fetched access token succesfully.");
    return response.data.access_token;
  } catch (e) {
    console.log(" Cannot fetch access token.");
    console.error(e);
  }
};

const fetchPlaylist = async (token: string) => {
  const playlistId = spotifyPlaylistId;

  console.log("Trying to fetch data for playlist : " + playlistId);

  const getPlaylistRequest = {
    method: "get",
    url: `https://api.spotify.com/v1/playlists/${playlistId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const playlistResponse = await axios<PlaylistRoot>(getPlaylistRequest);

  if (playlistResponse.status !== 200) {
    console.error(
      `Cannot fetch playlist <${playlistId}> `,
      playlistResponse.data
    );
    return null;
  }

  return playlistResponse.data;
};

export async function fetchSpotifyPlaylistTracks(): Promise<PlaylistRoot | null> {
  const token = await authorize();

  if (token == null) return null;
  return fetchPlaylist(token);
}
