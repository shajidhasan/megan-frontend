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

## Megan User Guide

- ### Voice Recognition and Web Searching

   Megan can listen and recognize user's voice and conduct a search on the search engnine.

   If the user's accent is not understandable, Megan will give the user a warning that she couldn't recognize the command and show results close to the relevant topics      anyway.

   So, the user has to just say, *"Linkin Park"* to view the search results on the music band Linkin Park.

- ### Local News
   Whoever wants to view local news has to just speak something like *"Show me some local news"* and Megan will find and show the latest local news.

- ### Music recommendation
   A user can ask for suggestions of musics of varied genres(almost any) and types.
   On a voice command like *"Give me some happy music recommendations"*, Megan will find songs related to the specified criteria.

   Or if the user wants to listen to musics of a particular genre, say, a folk song suggestion, he/she has to say *"Suggest me some folk songs"*.
   The user may mix up the types and genres of the songs he wants to listen to by saying, *"Give me some happy folk songs"*.

- ### Route Planning
    Maps are really useful tools nowadays as cities keep growing and transportation become more and more necessary. One may need to find the quickest destination to a  place from his location. Given the proper command, Megan will find the quickest route from a location to another.

   Say, we want to go from *"Mymensingh Zilla School"* to *"Bangladesh University of Engineering and Technology"*, then we'll first have to ask Megan to *"Show us a quickest route"* and then give her the initial location and then give her the final location.

   The scenerio is somewhat like:
   ```
   User: "Show us a quickest route"

   Megan: "Okay! What's the starting location?"

   User: "Mymensingh Zilla School"

   Megan: "Alright! What's the destination?"

   User: "Bangladesh University of Engineering and Technology"

   Megan: "Finding the quickest route"
   ```

   And then Megan will show a map with the desired fastest route from the starting location to the destination.

- ### Notes Management
   On the command *"Take a note"*, Megan will take a note and perhaps even save it if the user wants.

   Say, the user wants to note, *"I love Bangladesh"* and save it, he might wanna say first, *"Take a note"*, and then *"I love Bangladesh"*, and then save the note simply by saying *"Save"*. The saved notes will be shown as a list.

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
