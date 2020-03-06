<template>
  <div class="section">
    <div class="container">
      <div class="box content">
        <p>Click what you hear.</p>
        <button class="button" @click="askQuestion">Repeat</button>
      </div>
      <div class="field">
        <div class="buttons has-addons is-centered are-large">
          <button
            v-for="(word, index) in question"
            :key="index"
            class="button is-info is-light is-outlined is-uppercase"
            @click="answerQuestion(word)"
          >
            {{ word }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from "howler";
import utils from "@/utils";

const wordPairs = [
  // ["Sid Hoffman", "Sid Frenchman"],
  ["mand", "maand"],
  ["rat", "raat"],
  ["mat", "maat"],
  ["zak", "zaak"],
  ["hak", "haak"],
  ["ram", "raam"],
  ["bal", "baal"],
  ["man", "maan"],
  ["lat", "laat"],
  ["lok", "look"],
  ["zon", "zoon"],
  ["bom", "boom"],
  ["ros", "roos"],
  ["bos", "boos"],
  ["kop", "koop"],
  ["bot", "boot"],
  ["pot", "poot"],
  ["ton", "toon"]
];

export default {
  name: "DitOfDat",
  data() {
    return {
      audio: {},
      goodSound: "freesounddotorg_403018",
      badSound: "freesounddotorg_249300",
      voice: "Xander",
      question: [],
      answer: ""
    };
  },
  mounted() {
    this.audio = new Howl(utils.loadHowlerConfig());
    utils.sleep(1).then(() => {
      this.nextQuestion();
    });
  },
  methods: {
    nextQuestion() {
      this.question = utils.randomChoice(wordPairs);
      this.answer = utils.randomChoice(this.question);
      this.askQuestion();
    },
    askQuestion() {
      this.audio.play(utils.voicedPhrase(this.voice, this.answer));
    },
    answerQuestion(word) {
      const correct = word == this.answer;

      this.audio.play(correct ? this.goodSound : this.badSound);
      utils.sleep(0.6).then(() => {
        this.nextQuestion();
      });
    }
  }
};
</script>

<style></style>
