<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import SearchCard from "./SearchCard.svelte";
  import { State, type SearchItem } from "../../types";
  import Sidebar from "../Sidebar.svelte";

  export let state: State;
  export let searchResults: SearchItem[];

  let title = "Search results";
  if (state === State.News) {
    title = "News around you";
  }

  const dispatch = createEventDispatcher();
</script>

<Sidebar
  {title}
  on:close={() => {
    dispatch("close");
  }}
>
  {#each searchResults as searchItem}
    <SearchCard {searchItem} />
  {/each}
</Sidebar>
