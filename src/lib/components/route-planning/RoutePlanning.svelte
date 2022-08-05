<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import leaflet from "leaflet";
  import "leaflet-routing-machine/dist/leaflet-routing-machine";
  import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
  import "lrm-graphhopper/src/L.Routing.GraphHopper.js";

  import { createEventDispatcher, onMount } from "svelte";
  import Sidebar from "../Sidebar.svelte";
  import type { Point } from "../../../lib/types";

  export let source: string;
  export let destination: string;
  export let coordinates: Point[];

  const dispatch = createEventDispatcher();

  onMount(() => {
    const map = leaflet.map("map").setView([23.685, 90.3563], 5);
    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      })
      .addTo(map);
    leaflet.Routing.control({
      waypoints: [
        leaflet.latLng(coordinates[0].lat, coordinates[0].lng),
        leaflet.latLng(coordinates[1].lat, coordinates[1].lng),
      ],
      router: leaflet.Routing.graphHopper(
        "4e0f2a05-4103-46d4-af16-5b759f7b58b6"
      ),
      routeWhileDragging: false,
      show: false,
    }).addTo(map);
  });
</script>

<Sidebar
  title="Quickest route"
  on:close={() => {
    dispatch("close");
  }}
>
  <div id="map" class="w-full aspect-square" />
  <h1 class="text-lg">
    From <span class="text-xl font-semibold first-letter:uppercase"
      >{source}</span
    >
    to
    <span class="text-xl font-semibold first-letter:uppercase"
      >{destination}</span
    >.
  </h1>
</Sidebar>
