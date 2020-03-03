# oefenuw

> Practice Your Dutch

This is the primary source code repo for [oefenuw.nl](https://oefenuw.nl/), a site designed to help you practice the Dutch language. That domain name is intended to be read as "oefen uw nl" ("practice your nederlands").

## Resources

### Alfabet

I've used these resources to make the alfabet games.

* <https://en.wikipedia.org/wiki/Dutch_orthography>
* <https://nl.wikipedia.org/wiki/Alfabet>
* <https://www.learndutch.org/lessons/pronunciation-dutch-alphabet/>
* <https://www.youtube.com/watch?v=ktikutDOA0E>

## Code Notes

This repo defines a containerized [single page app](https://en.wikipedia.org/wiki/Single-page_application) written mostly in [ES6](https://en.wikipedia.org/wiki/ECMAScript) and leveraging the amazing [Vue.js](https://vuejs.org/).

In this project I'm trying to comply with the [vue.js style guide](https://vuejs.org/v2/style-guide/).

### Docker Container Implementation

This repo's Dockerfile utilises a multi-stage build:

* stage 1 is based on [galvanist/vueenv](https://hub.docker.com/r/galvanist/vueenv) (an npm/vue-cli "compiler" environment) and it compiles the app into static files containing the SPA
* stage 2 is based on [nginx:1-alpine](https://hub.docker.com/_/nginx) and it serves the static files compiled in the first stage

### Audio Implementation

* Sound effects come from [freesound](https://www.freesound.org/)
* Spoken utterances are currently generated using the Apple macOS text-to-speech voices "Ellen" (NL-BE), "Xander" (NL-NL), and "Claire" (NL-NL) - I'm working to determine if there are license requirements for using rendered utterances in this way. See [`gen_audio.sh`](v1/static/audio/gen_audio.sh) to view the code that generates the utterances used in the site.
* Audio sprite loading and playback is driven by the [howler.js](https://github.com/goldfire/howler.js) library.
* I utilize [Tõnis Tiigi's audiosprite utility](https://github.com/tonistiigi/audiosprite) to compile the sounds and utterances into ginormous monolithic audio files of various formats. I currently incorporate the timing data into my vue components manually.

### Next Steps

Some things left to do:

* briefly flash or outline the correct answer when the user gets it wrong
* make the thing more colorful
* do some kind of post-game report modal (scores, perhaps timing, and a report about wrong answers)
* investigate a high score screen

Consider what other types of exercises I'll have on the site, some immediate ideas:

* numbers and prices (you hear the number you type it out)
* helping hear the difference between words like zak and zaak
* long and short sounds

