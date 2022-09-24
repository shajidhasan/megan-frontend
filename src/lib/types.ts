export const enum State {
  Idle,
  Music,
  News,
  Search,
  RoutePlanning,
  AddNote,
  ShowNotes,
  NeedData,
  Dashboard
}

export const enum MeganState {
  Idle,
  Listening,
  Speaking,
  Busy,
}


export interface SearchItem {
  title: string;
  link: string;
  description: string;
}

export interface SearchResult {
  title: string;
  link: string;
  description: string;
}

export interface Track {
  name: string;
  artist: string;
  url: string;
}

export const instructions = ['search', 'news', 'note', 'route', 'music', 'add-note', 'read-notes', 'hello', 'need-data', 'dashboard', 'unknown'] as const;
export type InstructionType = typeof instructions[number];

export interface Point {
  lat: number;
  lng: number;
}
