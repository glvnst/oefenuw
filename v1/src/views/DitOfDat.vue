<template>
  <div>
    <p>Click what you hear</p>
    <div class="buttons" v-for="(pair, index) in pairs" :key="index">
      <button class="button" @click="playPhrase(pair[0])">{{ pair[0] }}</button>
      <button class="button" @click="playPhrase(pair[1])">{{ pair[1] }}</button>
    </div>
  </div>
</template>

<script>
import { Howl } from "howler";
import utils from "@/utils";

const longShortPairs = [
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
  data() {
    return {
      audio: {},
      pairs: longShortPairs
    };
  },
  mounted() {
    this.audio = new Howl(utils.loadHowlerConfig());
  },
  methods: {
    playPhrase(phrase) {
      this.audio.play(utils.randomlyVoicedPhrase(phrase));
    }
  }
};
</script>

<style></style>
