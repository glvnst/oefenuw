<template>
  <div class="container">
    <div class="columns is-mobile is-multiline is-centered">
      <div id="instructionbox" class="column is-full has-text-centered">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="content">
                <span class="title is-2">
                  {{ gameOver ? $t("practice_mode") : $t("game_mode") }}
                </span>
              </div>
            </div>
          </div>
          <div class="level-item" style="flex-shrink: 1">
            <div class="content">
              <p class="is-size-5" style="margin: 0 1em;">
                {{
                  gameOver
                    ? $t("alfabet_instructions_practice")
                    : $t("alfabet_instructions_game")
                }}
              </p>
            </div>
          </div>
          <div v-if="!gameOver" class="level-item">
            <button
              class="button is-dark is-small is-rounded is-uppercase"
              @click="askQuestion"
            >
              {{ $t("repeat") }}
            </button>
          </div>
          <div v-if="gameOver" class="level-item">
            <button
              id="startbutton"
              class="button is-success is-medium is-uppercase"
              @click="beginGame"
            >
              {{ $t("start_game") }}
            </button>
          </div>
          <div v-if="!gameOver" class="level-item pull-left">
            <span class="title is-3">{{ $t("score") }}</span>
            <span class="title is-2 score">{{ score }}</span>
          </div>
          <div v-if="!gameOver" class="level-item pull-right">
            <span class="title is-3">{{ $t("round") }}</span>
            <span class="title is-2 score">
              {{ currentRound }} / {{ rounds }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-for="letter in letters"
        :key="letter"
        class="column is-2 has-text-centered"
      >
        <button
          class="letterButton button is-info is-large is-uppercase is-rounded"
          @click="letterClick(letter)"
        >
          {{ letter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import { audioGameMixin } from "@/mixins/audioGameMixin.js";

export default {
  name: "Alfabet",
  mixins: [audioGameMixin],
  components: {},
  data() {
    return {
      mode: "Practice",
      rounds: 3,
      letters: utils.letters
    };
  },
  methods: {
    populateQuestions() {
      const pool = [...utils.letters];
      utils.shuffleArray(pool);

      for (let i = 0; i < this.rounds; i++) {
        this.questions.push(
          pool.length > 0 ? pool.pop() : utils.randomChoice(utils.letters)
        );
      }
      // in this game the questions and correct answers are the same
      this.answerKey = this.questions;
    },
    letterClick(letter) {
      if (this.gameOver) {
        // practice mode
        this.playSprite(utils.randomlyVoicedLetter(letter));
      } else {
        // game mode
        this.answer(letter);
      }
    },
    askQuestion() {
      if (this.gameOver) {
        return true;
      }

      this.playSprite(
        utils.randomlyVoicedLetter(this.questions[this.currentRound - 1])
      );

      return true;
    },
    endGame() {
      this.playSprite(utils.randomlyVoicedPhrase("super")).then(() => {
        alert(this.$i18n.t("thanks_for_playing"));
      });
    }
  }
};
</script>

<style>
button.button.letterButton {
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
