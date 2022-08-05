<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let listening: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<button
  class="px-4 py-2 rounded text-white bg-primary-600 enabled:hover:bg-primary-500 w-48 transition-colors ease-in-out duration-500 disabled:bg-gray-500 disabled:animate-pulse"
  on:click={() => {
    dispatch("click");
  }}
  disabled={listening}
>
  {#if listening}
    ...
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 mr-1 -mt-1 inline"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
        clip-rule="evenodd"
      />
    </svg>
    <span> Start Speaking </span>
  {/if}
</button>
