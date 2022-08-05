import SpotifyWebApi from "spotify-web-api-js"
import type { Track } from "../types";

const spotify = new SpotifyWebApi();
spotify.setAccessToken("BQBmvG8aCZ_gXOFSZgBQrBkWGGp23baCfl8Ge6C5OQFTIvOrLQewfG2xzxuKFskdGE-9jFLljqyqfha-b4ZjR6AanAmpOw4c0ddefrPbiHzHEhIvhW35bZ69gE3p_jS6D5xTSkK32kaT_0uTXZqGwVeq3QU5euMCe_QQ6tmdSXeTG9RJtnZnK72d1grU83s")

export const getTracksByGenre = async (genres: string[]): Promise<Track[]> => {
  if (genres.length === 0) return getTracksByGenre(['acoustic'])
  const tracks: Track[] = [];
  const response = await spotify.getRecommendations({ seed_genres: genres });
  response.tracks.forEach((track) => {
    let artist = track.artists.map((artist) => artist.name).join(', ');
    let name = track.name;
    tracks.push({ name, artist, url: track.external_urls.spotify });
  })
  return tracks;
}

export const getTracksByArtist = async (artist: string): Promise<Track[]> => {
  if (artist === '') return getTracksByGenre(['rock'])
  const tracks: Track[] = [];
  const response = await spotify.search(artist, ["artist"]);
  if (response.artists) {
    const id = response.artists.items.at(0).id;
    const response2 = await spotify.getRecommendations({ seed_artists: [id] })
    response2.tracks.forEach((track) => {
      let artist = track.artists.map((artist) => artist.name).join(', ');
      let name = track.name;
      tracks.push({ name, artist, url: track.external_urls.spotify });
    })
  } else {
    return getTracksByGenre(['rock'])
  }
  return tracks;
}
