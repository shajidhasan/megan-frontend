import { responses } from "./data";
import type { InstructionType } from "./types";

const waitPhrases = ['Hold on.', 'Please wait.', 'Give me a few seconds.'] as const;
const helloPhrases = ['Greetings. I hope you\'re doing good today.', 'Hi! Good evening.', 'Hello. I hope you\'re having a good day!'] as const;

const musicGenres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const parseInstruction = (text: string): InstructionType => {
  text = text.toLowerCase();
  if (text.includes('local news')) {
    return 'news';
  } else if (text.includes('search')) {
    return 'search'
  } else if (text.includes('hello')) {
    return 'hello'
  } else if (text.includes('current stats') || text.includes('dashboard')) {
    return 'dashboard'
  } else if (text.includes('data')) {
    return 'need-data'
  } else if (text.includes('route')) {
    return 'route'
  } else if (text.includes('notes')) {
    return 'read-notes'
  } else if (text.includes('note')) {
    return 'add-note'
  } else if (text.includes('music') || (text.includes('song'))) {
    return 'music'
  }
  return 'unknown';
}

export const artistOrGenre = (text: string) => {
  const genres = []
  for (const genre of musicGenres) {
    if (text.includes(genre)) {
      genres.push(genre);
    }
  }
  if (genres.length > 0)
    return 'genre';
  return 'artist';
}

export const getGenres = (text: string): string[] => {
  const genres: string[] = []
  for (const genre of musicGenres) {
    if (text.includes(genre)) {
      genres.push(genre);
    }
  }
  return genres;
}

export const getArtist = (text: string): string => {
  if (text.includes('like')) {
    return text.substring(text.indexOf('like') + 5);
  }
  return '';
}

export const getRandomResponse = (iType: InstructionType): string => {
  const list = responses.get(iType);
  return list[Math.floor(Math.random() * list.length)]
}

export const randomWaitPhrase = (): string => {
  return waitPhrases[Math.floor(Math.random() * waitPhrases.length)];
}

export const randomHelloPhrase = (): string => {
  return helloPhrases[Math.floor(Math.random() * helloPhrases.length)];
}


