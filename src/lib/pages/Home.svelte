<script lang="ts">
  import { fade } from "svelte/transition";
  import {
    artistOrGenre,
    getArtist,
    getGenres,
    parseInstruction,
    randomWaitPhrase,
  } from "../utilities";
  import { MeganState, State, type SearchResult, type Track } from "../types";
  import SearchResults from "../components/search/SearchResults.svelte";
  import MeganAvatar from "../components/MeganAvatar.svelte";
  import ListenButton from "../components/ListenButton.svelte";
  import RoutePlanning from "../components/route-planning/RoutePlanning.svelte";
  import { getLocalNews, getSearchResults } from "../api/search";
  import { getTracksByGenre, getTracksByArtist } from "../api/spotify";
  import { synthesize, recognize } from "../api/speech";
  import { getCoordinates } from "../api/route";
  import Sidebar from "../components/Sidebar.svelte";
  import { addNote, getNotes } from "../api/notes";
  import meganAudio from "../../assets/megan.mp3";

  let state: State = State.Idle;
  let meganState: MeganState = MeganState.Idle;
  let userInstruction = "";
  let meganSpeech = "Hi, I'm Megan!";

  /* search */
  let searchTerm = "";
  let searchResults: SearchResult[] = [];

  /* route */
  let source = "";
  let destination = "";
  let coordinates = [];

  /* add-note */
  let note = "";

  /* read-notes */
  let notes: string[] = [];

  /* music */
  let tracks: Track[] = [];

  /* make life easier */
  const speak = (text: string) => {
    meganSpeech = text;
    meganState = MeganState.Speaking;
    return synthesize(text);
  };

  const listen = async () => {
    await new Audio(meganAudio).play();
    meganState = MeganState.Listening;
    return recognize();
  };

  const giveInstruction = async () => {
    state = State.Idle;
    meganState = MeganState.Listening;
    userInstruction = await listen();

    const iType = parseInstruction(userInstruction);

    if (iType === "news") {
      await speak(randomWaitPhrase());
      meganState = MeganState.Busy;
      searchResults = await getLocalNews();
      state = State.News;
      meganState = MeganState.Speaking;
      await readNews();
      meganState = MeganState.Idle;
    } else if (iType === "search") {
      await speak("Sure! What do you want to search for?");
      searchTerm = await listen();
      await speak(randomWaitPhrase());
      meganState = MeganState.Busy;
      searchResults = await getSearchResults(searchTerm);
      speak("Here are some results.");
      meganState = MeganState.Idle;
      state = State.Search;
    } else if (iType === "route") {
      await speak("Okay! What's the starting location?");
      source = await listen();
      source = source.replace(/[?.]+/, "");
      await speak("Alright. What's the destination?");
      destination = await listen();
      destination = destination.replace(/[?.]+/, "");
      await speak("Finding quickest route now.");
      meganState = MeganState.Busy;
      try {
        const result = await Promise.all([
          getCoordinates(source),
          getCoordinates(destination),
        ]);
        coordinates = [result[0], result[1]];
        speak("I've got it! Showing you on the map.");
        state = State.RoutePlanning;
      } catch (exception) {
        await speak("Sorry! Could not find the locations you mentioned.");
      }
      meganState = MeganState.Idle;
    } else if (iType === "add-note") {
      await speak("Okay! Adding a note now.");
      note = "";
      state = State.AddNote;
      let next = await listen();
      while (2 > 1) {
        if (next.toLowerCase().includes("cancel") && next.length <= 7) {
          await speak("Okay. Cancelling this note.");
          meganState = MeganState.Idle;
          state = State.Idle;
          break;
        }
        if (
          (next.toLowerCase().includes("done") ||
            next.toLowerCase().includes("save")) &&
          next.length <= 5
        ) {
          addNote(note);
          await speak("Okay. Saving this note to the cloud now!");
          meganState = MeganState.Idle;
          state = State.Idle;
          break;
        }
        if (next.length <= 2) {
          await speak("I did not quite get it! Could you say it again?");
        } else {
          note += next + "\n";
        }
        next = await listen();
      }
    } else if (iType === "read-notes") {
      await speak(randomWaitPhrase());
      if (notes.length === 0) {
        meganState = MeganState.Busy;
        notes = await getNotes();
      }
      if (notes.length === 0) {
        await speak(
          "Sorry! You have no notes yet. If you ask me I can add a note."
        );

        meganState = MeganState.Idle;
        state = State.Idle;
      } else {
        await speak("Here are your notes!");
        state = State.ShowNotes;
        meganState = MeganState.Idle;
      }
    } else if (iType === "music") {
      await speak("Okay, let me find some music recommendations for you.");
      meganState = MeganState.Busy;
      const mType = artistOrGenre(userInstruction);
      if (mType === "genre") {
        const genres = getGenres(userInstruction);
        tracks = await getTracksByGenre(genres);
      } else {
        const artist = getArtist(userInstruction);
        tracks = await getTracksByArtist(artist);
      }
      speak("Here are some great songs based on your query.");
      meganState = MeganState.Idle;
      state = State.Music;
    } else {
      await speak(
        "Sorry! I didn't understand that! Here are some search results if it'll help."
      );
      meganState = MeganState.Busy;
      searchResults = await getSearchResults(userInstruction);
      state = State.Search;
      meganState = MeganState.Idle;
    }
  };

  const readNews = async () => {
    for (const newsItem of searchResults) {
      await synthesize(newsItem.title);
    }
  };

  $: {
    if (meganState !== MeganState.Speaking) {
      meganSpeech = "";
    }
  }
</script>

<div class="flex">
  <div
    class="transition-all ease-in-out duration-500 flex flex-col items-center justify-center min-h-screen space-y-4"
    class:w-full={state === State.Idle}
    class:w-half={state !== State.Idle}
  >
    <div class="relative">
      {#if meganSpeech.length > 0}
        <p
          transition:fade
          class="absolute text-xl font-semibold -top-12 -left-12 -right-12 text-center"
        >
          {meganSpeech}
        </p>
      {/if}
      <MeganAvatar {meganState} />
    </div>
    <ListenButton
      listening={meganState !== MeganState.Idle}
      on:click={giveInstruction}
    />
  </div>
</div>
{#if state === State.Search || state === State.News}
  <SearchResults
    {state}
    {searchResults}
    on:close={() => {
      state = State.Idle;
    }}
  />
{:else if state === State.RoutePlanning}
  <RoutePlanning
    {coordinates}
    on:close={() => {
      state = State.Idle;
    }}
  />
{:else if state === State.AddNote}
  <Sidebar
    title="Take a note"
    on:close={() => {
      state = State.Idle;
    }}
  >
    <p>
      When you're done just say "finish" or "save". If you want to cancel this
      note, say "cancel".
    </p>
    <div class="border rounded-lg p-4 whitespace-pre-wrap">
      {note}
    </div>
  </Sidebar>
{:else if state === State.ShowNotes}
  <Sidebar
    title="My notes"
    on:close={() => {
      state = State.Idle;
    }}
  >
    {#each notes as note_}
      <div class="border rounded-lg p-4 whitespace-pre-wrap">
        {note_.trim()}
      </div>
    {/each}
  </Sidebar>
{:else if state === State.Music}
  <Sidebar
    title="Music"
    on:close={() => {
      state = State.Idle;
    }}
  >
    {#each tracks as track}
      <div class="space-y-2">
        <a href={track.url} target="_blank">
          <h1 class="text-2xl font-bold">{track.name}</h1>
        </a>
        <p class="font-semibold text-gray-50">{track.artist}</p>
      </div>
    {/each}
  </Sidebar>
{/if}
