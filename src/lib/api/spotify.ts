import SpotifyWebApi from "spotify-web-api-js"
import type { Track } from "../types";

const spotify = new SpotifyWebApi();
spotify.setAccessToken("BQDxLzZkwV6x6UQ0Grh2Ny1vXwlxd_ydX2zVkYa8Umh4kx9ffPqQHyouJ4zVqmCn57sNNDw71AoXDQEx_z9ylN-YMKW8LVVsu2Ax1G2PlOuPsQWSPhXG2k0C-d6Vb-rM78-jNxfejO13yoapGr2pPTS756WNYiCnbGEtkyHhsLBq4iPc8m9q6BOCX2LeiPg")

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
