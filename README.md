# oefenuw

> Practice Your Dutch

This is the primary source code repo for [oefenuw.nl](https://oefenuw.nl/), a site designed to help you practice the Dutch language. That domain name is intended to be read as "oefen uw nl" ("practice your Nederlands").


## Credits


### Sounds Effects

* The "correct" sound effect used here is [UI Confirmation Alert, C5.wav](https://freesound.org/people/InspectorJ/sounds/403018/) by [InspectorJ](https://www.jshaw.co.uk/) of [Freesound.org](https://freesound.org/)
* The "incorrect" sound effect used here is [Sun Temple Games](http://suntemple.co/)' [Access Denied Sound on freesound.org](https://freesound.org/people/suntemple/sounds/249300/)

### I18N Interface Elements

* I found this [tutorial by Andreas Löw on using vue-i18n](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n) to be extremely helpful.
* Language data from: <https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code>
* This blog post influenced the interface design: <http://www.flagsarenotlanguages.com/> 

### Resources

* <https://www.youtube.com/embed/ZCA2DyqYvF0> and <https://www.learndutch.org/lessons/pronunciation-dutch-alphabet/>

## Code Notes

This repo defines a containerized [single page app](https://en.wikipedia.org/wiki/Single-page_application) written mostly in [ES6](https://en.wikipedia.org/wiki/ECMAScript) and leveraging the amazing [Vue.js](https://vuejs.org/).

In this project I'm trying to comply with the [vue.js style guide](https://vuejs.org/v2/style-guide/).

This project leverages the [Bulma CSS framework](https://bulma.io/) for UI styling.


### Docker Container Implementation

This repo's Dockerfile utilises a multi-stage build:

* stage 1 is based on [galvanist/vueenv](https://hub.docker.com/r/galvanist/vueenv) (an npm/vue-cli "compiler" environment) and it compiles the app into static files containing the SPA
* stage 2 is based on [nginx:1-alpine](https://hub.docker.com/_/nginx) and it serves the static files compiled in the first stage

### Audio Implementation

* Sound effects come from [freesound](https://www.freesound.org/)
* Spoken utterances are currently generated using the Apple macOS text-to-speech voices "Ellen" (NL-BE), "Xander" (NL-NL), and "Claire" (NL-NL) - I'm working to determine if there are license requirements for using rendered utterances in this way. See [`gen_audio.sh`](v1/public/audio/gen_audio.sh) to view the code that generates the utterances used in the site.
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

