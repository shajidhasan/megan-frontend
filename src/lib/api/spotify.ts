import SpotifyWebApi from "spotify-web-api-js"
import type { Track } from "../types";

const spotify = new SpotifyWebApi();
spotify.setAccessToken("BQB0nlLil30o8n29_fXahLcfYcsi0qfYJBSNfpoAqEue5jo6X2ElXwQPc1bqyYB5tT1Ir3OwNUoOxeuijdeEoOddTO8mbqExRra3qtVdbPWOtQZ79Ke_RWboX97Y2NElYYcIMJcfjeOe2rOuuYzMOoGkDTDvehnZS3rs")

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
