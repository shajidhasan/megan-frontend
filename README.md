# BUET CSE Fest 2022 Hackathon - Megan by Team Lightweavers

We participated in the "API and Cloud Services" segment of the BUET CSE FEST Hackathon and we were tasked to create an Alexa like AI using third party APIs and cloud services. This repository contains the frontend of Megan, our attempt at the given problem. We had a tremendous time coding her.


## How to run Megan

To run, enter this directory and
```
npm install
npm run preview
```

## The problem

We were supposed to create a bot that could communicate with voice. It should be able to recommend music tracks based on genre and artists, perform web searches, fetch local news and things like that. One particularly challening task it should be able to was finding quickest route between two locations. Taking notes should be in its featureset too, and for that, we were supposed to create our own API.

## Our approach

- We named our bot Megan to give her a bit of character.
- We didn't want to ship a console program so we put a little bit of effort in the UI. We thought it turned out decent. Sleek and minimal while also elegant.
- We wanted to offload most of the API calls to the browser for minimum latency.

## The checklist

Our solution does almost everything the problem asked for.

- [X] Voice recognition (speech to text)
- [X] Voice synthesis (text to speech)
- [x] Local news
- [x] Web searches
- [x] Music recommendations
- [x] Taking and viewing note, using our custom API.
- [x] Route planning

Unfortunately, since we couldn't manage a premium spotify account, Megan cannot play audio from Spotify.

## The APIs we used

- Voice communication - For speech recognition and synthesis, we opted in for the Azure Speech services
- Local news - the Bing searching API v7.
- Web searches - the Bing searching API v7.
- Music recommendations - Spotify API.
- Route planning - this was a problematic one. At first, we were able to get Azure Maps working but it wasn't working for a lot of place in Bangladesh. So we used Leaflet map, with the GraphHopper route finding API.
   

## Our tech stack

- We used Svelte for the frontend, because it is rising rapidly in popularity because of its simplicity and funcionality.
- For styling the elements, we used TailwindCSS.
- For the note taking API, we used Express with SQLite.


The note taking API [lives here](https://github.com/ErenDexter/megan-backend).