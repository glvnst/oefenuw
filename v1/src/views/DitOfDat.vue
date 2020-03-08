<template>
  <div>
    <HighScoresModal
      :score="score"
      :answers="answers"
      :highScores="highScores"
      :visible="highScoresVisible"
      @close="highScoresVisible = false"
    ></HighScoresModal>

    <div id="instructionbox" class="container has-text-centered">
      <div class="level">
        <!-- -->
        <div class="level-left">
          <div class="level-item">
            <div class="content">
              <span class="title is-2">
                {{ gameOver ? $t("practice_mode") : $t("game_mode") }}
              </span>
            </div>
          </div>
        </div>
        <!-- -->
        <div class="level-item" style="flex-shrink: 1">
          <div class="content">
            <p class="is-size-5" style="margin: 0 1em;">
              {{
                gameOver
                  ? $t("ditofdat_practice_instructions")
                  : $t("ditofdat_game_instructions")
              }}
            </p>
          </div>
        </div>
        <!-- -->
        <div v-if="!gameOver" class="level-item">
          <button
            class="button is-dark is-small is-rounded is-uppercase"
            @click="askQuestion"
          >
            {{ $t("repeat") }}
          </button>
        </div>
        <!-- -->
        <div v-if="gameOver" class="level-item">
          <button
            id="startbutton"
            class="button is-success is-medium is-uppercase"
            @click="beginGame"
          >
            {{ $t("start_game") }}
          </button>
        </div>
        <!-- -->
        <div v-if="!gameOver" class="level-item pull-left">
          <span class="title is-3">{{ $t("score") }}</span>
          <span class="title is-2 score">{{ score }}</span>
        </div>
        <!-- -->
        <div v-if="!gameOver" class="level-item pull-right">
          <span class="title is-3">{{ $t("round") }}</span>
          <span class="title is-2 score">
            {{ currentRound }} / {{ rounds }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="gameOver" class="columns is-mobile is-multiline is-centered">
      <!-- Practice Buttons -->
      <div
        v-for="(wordPair, index) in wordPairs"
        :key="index"
        class="column is-full-mobile is-4-tablet is-3-desktop"
      >
        <div class="buttons has-addons is-centered">
          <button
            v-for="(word, index) in wordPair"
            :key="index"
            class="word-button button is-info is-uppercase"
            @click="playPracticeWord(word)"
          >
            {{ word }}
          </button>
        </div>
      </div>
    </div>
    <!-- Gameboard -->
    <div v-if="!gameOver" class="field">
      <div class="buttons is-centered are-large">
        <button
          v-for="(word, index) in questions[currentRound - 1]"
          :key="index"
          class="word-button button is-info is-uppercase"
          @click="answer(word)"
        >
          {{ word }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import { audioGameMixin } from "@/mixins/audioGameMixin.js";
import HighScoresModal from "@/components/HighScoresModal.vue";

const wordPairs = [
  // ["Sid Hoffman", "Sid Frenchman"],
  ["bal", "baal"],
  ["bom", "boom"],
  ["bos", "boos"],
  ["bot", "boot"],
  ["hak", "haak"],
  ["kop", "koop"],
  ["lat", "laat"],
  ["lok", "look"],
  ["man", "maan"],
  ["mand", "maand"],
  ["mat", "maat"],
  ["pot", "poot"],
  ["ram", "raam"],
  ["rat", "raat"],
  ["ros", "roos"],
  ["ton", "toon"],
  ["zak", "zaak"],
  ["zon", "zoon"]
];

export default {
  name: "DitOfDat",
  mixins: [audioGameMixin],
  components: { HighScoresModal },
  data() {
    return {
      wordPairs,
      voice: "Xander",
      rounds: 15
    };
  },
  methods: {
    populateQuestions() {
      const pool = [...wordPairs];
      utils.shuffleArray(pool);

      // select the question pair
      for (let i = 0; i < this.rounds; i++) {
        this.questions.push(
          pool.length > 0 ? pool.pop() : utils.randomChoice(wordPairs)
        );
      }

      // now select the answer from each pair
      for (let question of this.questions) {
        this.answerKey.push(utils.randomChoice(question));
      }
    },
    playPracticeWord(word) {
      return this.playSprite(utils.voicedPhrase(this.voice, word));
    },
    askQuestion() {
      this.playSprite(
        utils.voicedPhrase(this.voice, this.answerKey[this.currentRound - 1])
      );
    }
  }
};
</script>

<style>
button.button.word-button {
  font-family: "Rubik Mono One", Helvetica, Arial, sans-serif;
}

#instructionbox {
  margin-top: 1.5em;
  margin-bottom: 3em;
}

.score {
  font-family: "Bungee Shade", Helvetica, Arial, sans-serif;
  padding: 0 0.5em 0 0.5em;
}
</style>
