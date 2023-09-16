### Playlist Syncer

#### Simple project that fetches the tracks in a spotify playlist, searches them one by one on YT and adds them to a YT Music Playlist.

### Installation

0. Create a project on [google cloud console](https://console.cloud.google.com/welcome) to get the secrets. Also create a [dev account for spotify](https://developer.spotify.com/) to get those secrets too.
1. Clone the repo

```sh
git clone https://github.com/srihariash999/playlist_syncer.git
```

2. Install NPM packages using bun (recommended)
   ```sh
   bun install
   ```
3. If you don't want to use bun, use npm
   ```sh
   npm install
   ```
4. Copy the contents from [`sample.json`](https://github.com/srihariash999/playlist_syncer/blob/main/config/sample.env) to a new file named `.env` and place it at the root of the project.
5. Replace the default values filled in the file with real Ids and Secrets. Project can use either youtube's search API to search for a track or can use a webscraping method (which can save API quota costing). Using offical is recommended and the variable `useUnofficial` determines which is used. This variable having value "0" makes use of official search API and value "1" will use unofficial(web scraping) method.
6. Run the program using bun:

   ```sh
   bun src/index.ts
   ```

   Or usign ts-node:

   ```sh
   ts-node src/index.ts
   ```

   Or using nodemon:

   ```sh
   nodemon src/index.ts
   ```

## Questions or issues ?

If you have general question about the project. Feel free to open an issue regarding your query/issue.
