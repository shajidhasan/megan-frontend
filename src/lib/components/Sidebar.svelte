<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let title: string;

  const dispatch = createEventDispatcher();
</script>

<div
  class="fixed top-0 bottom-0 right-0 w-1/2 bg-white/5 overflow-y-auto"
  transition:fly={{ x: 100 }}
>
  <div class="space-y-8 py-8 px-12 relative">
    <button
      class="p-2 hover:bg-white/20 rounded-lg text-white absolute right-4 top-4"
      on:click={() => {
        dispatch("close");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <h1 class="text-xl font-semibold border-b pb-2 border-white/20">
      {title}
    </h1>
    <slot />
  </div>
</div>
