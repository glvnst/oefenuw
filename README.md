# oefenuw

> Practice Your Dutch

This is the primary source code repo for [oefenuw.nl](https://oefenuw.nl/), a site designed to help you practice the Dutch language. That domain name is intended to be read as "oefen uw nl" ("practice your Nederlands").


## Credits


### Sounds Effects & Audio Implementation

* The "correct" sound effect used here is [UI Confirmation Alert, C5.wav](https://freesound.org/people/InspectorJ/sounds/403018/) by [InspectorJ](https://www.jshaw.co.uk/) of [Freesound.org](https://freesound.org/)
* The "incorrect" sound effect used here is [Access Denied Sound](https://freesound.org/people/suntemple/sounds/249300/) by [Sun Temple Games](http://suntemple.co/) via [Freesound.org](https://freesound.org/)
* Spoken utterances are currently generated using the Apple macOS text-to-speech voices "Ellen" (NL-BE), "Xander" (NL-NL), and "Claire" (NL-NL). See [`gen_audio.sh`](v1/public/audio/gen_audio.sh) to view the code that generates the utterances used on the site. _Note: I'm working to determine if there are license requirements for using rendered utterances in this way._ 
* The sound effects and recorded utterances are then packaged into audio sprites using [Tõnis Tiigi's audiosprite utility](https://github.com/tonistiigi/audiosprite).
* The audio sprites are loaded and played back in the browser using the [howler.js](https://github.com/goldfire/howler.js) library.

### I18N Interface Elements

* [Andreas Löw's tutorial on using vue-i18n](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n) was extremely helpful.
* Language data came from [Wikimedia's List of language names](https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code).
* This blog post [flags are not languages](http://www.flagsarenotlanguages.com/) influenced our i18n UI. 

### Resources

I've used these resources while developing this site:

* <https://en.wikipedia.org/wiki/Dutch_orthography>
* <https://nl.wikipedia.org/wiki/Alfabet>
* <https://www.learndutch.org/lessons/pronunciation-dutch-alphabet/>
* <https://www.youtube.com/embed/ZCA2DyqYvF0>
* <https://www.youtube.com/watch?v=ktikutDOA0E>


## Code Notes

This repo defines a containerized [single page app](https://en.wikipedia.org/wiki/Single-page_application) written mostly in [ES6](https://en.wikipedia.org/wiki/ECMAScript) and leveraging [Vue.js](https://vuejs.org/). We try to comply with the [vue.js style guide](https://vuejs.org/v2/style-guide/). For UI styling we use the [Bulma CSS framework](https://bulma.io/).


### Docker Container Implementation

This repo's Dockerfile utilizes a multi-stage build:

* stage 1 is based on [galvanist/vueenv](https://hub.docker.com/r/galvanist/vueenv) (an npm/vue-cli "compiler" environment) and it compiles the app into static files containing the SPA
* stage 2 is based on [nginx:1-alpine](https://hub.docker.com/_/nginx) and it serves the static files compiled in the first stage

## Next Steps

Some things left to do:

* briefly flash or outline the correct answer when the user gets it wrong
* make the thing more colorful
* do some kind of post-game report modal (scores, perhaps timing, and a report about wrong answers)
* investigate a high score screen

Consider what other types of exercises I'll have on the site, some immediate ideas:

* numbers and prices (you hear the number you type it out)

