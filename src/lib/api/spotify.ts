import SpotifyWebApi from "spotify-web-api-js"
import type { Track } from "../types";

const spotify = new SpotifyWebApi();
spotify.setAccessToken("BQAow584t8u-9gDRWct7KD0cii6Ovj0-K1IjilWjN76VMfvZf66c-uA9oaK58224Gfpzl0YZ8v7JslOpqze0bVSV8Uw1GUPKcwLs4ZlmSkYu6c3H9ho7ScxukGL_3bwanCPqATbKxlH0_Aw5vra8wd3NE8vvWyN9Vq8q7RtrXU41PpOmvFaJvX7je9W6USw")

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
  if (artist === '') return getTracksByGenre(['acoustic'])
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
    return getTracksByGenre(['acoustic'])
  }
  return tracks;
}
