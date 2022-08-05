<script lang="ts">
  import type { SearchItem } from "../../types";

  export let searchItem: SearchItem;
</script>

<div>
  <a href={searchItem.link} target="_blank">
    <h1 class="font-bold text-2xl">
      {searchItem.title}
    </h1>
  </a>
  <a href={searchItem.link} class="text-blue-500" target="_blank">
    {searchItem.link}
  </a>
  <p class="mt-2 text-gray-50">
    {searchItem.description}
  </p>
</div>
