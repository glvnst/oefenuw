<template>
  <div class="container">
    <div class="columns is-mobile is-multiline is-centered">
      <div id="instructionbox" class="column is-full has-text-centered">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="content">
                <span class="title is-2">
                  {{
                    game.over
                      ? $t("alfabet_practice_mode")
                      : $t("alfabet_game_mode")
                  }}
                </span>
              </div>
            </div>
          </div>
          <div class="level-item" style="flex-shrink: 1">
            <div class="content">
              <p class="is-size-5" style="margin: 0 1em;">
                {{
                  game.over
                    ? $t("alfabet_instructions_practice")
                    : $t("alfabet_instructions_game")
                }}
              </p>
            </div>
          </div>
          <div v-if="game.over" class="level-item">
            <button
              id="startbutton"
              class="button is-success is-medium is-uppercase"
              @click="startGame"
            >
              {{ $t("alfabet_start_game") }}
            </button>
          </div>
          <div v-if="!game.over" class="level-item pull-left">
            <span class="title is-3">{{ $t("score") }}</span>
            <span class="title is-2 score">{{ game.score }}</span>
          </div>
          <div v-if="!game.over" class="level-item pull-right">
            <span class="title is-3">{{ $t("round") }}</span>
            <span class="title is-2 score">
              {{ game.currentRound }} / {{ game.rounds }}
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
import Vue from "vue";
import { Howl } from "howler";
import utils from "@/utils";

export default {
  name: "Alfabet",
  components: {},
  data() {
    return {
      mode: "Practice",
      game: { over: true },
      audio: {},
      letters: utils.letters,
      goodSound: "freesounddotorg_403018",
      badSound: "freesounddotorg_249300"
    };
  },
  mounted() {
    this.audio = new Howl(utils.loadHowlerConfig());
  },
  methods: {
    playSprite(spriteName) {
      // eslint-disable-next-line no-console
      console.log("playing", spriteName);
      return new Promise(resolve => {
        this.audio.once("end", resolve, this.audio.play(spriteName));
      });
    },
    letterClick(letter) {
      if (this.game.over) {
        // practice mode
        this.playSprite(utils.randomlyVoicedLetter(letter));
      } else {
        // game mode
        this.gameAnswer(letter);
      }
    },
    newGame() {
      const game = {
        questions: [],
        answers: [],
        rounds: 30,
        currentRound: 1,
        score: 0,
        over: false
      };

      // populate the questions
      const pool = [...utils.letters];
      utils.shuffleArray(pool);

      for (let i = 0; i < game.rounds; i++) {
        game.questions.push(
          pool.length > 0 ? pool.pop() : utils.randomChoice(utils.letters)
        );
      }

      for (const prop in game) {
        Vue.set(this.game, prop, game[prop]);
      }
    },
    gameQuestion() {
      if (this.game.over) {
        return true;
      }

      this.playSprite(
        utils.randomlyVoicedLetter(
          this.game.questions[this.game.currentRound - 1]
        )
      );

      return true;
    },
    gameAnswer(answer) {
      const desiredLetter = this.game.questions[this.game.currentRound - 1];
      const correct = answer === desiredLetter;

      // record the answer
      this.game.answers.push(answer);

      // advance the round
      if (this.game.currentRound >= this.game.rounds) {
        this.game.over = true;
      } else {
        this.game.currentRound += 1;
      }

      if (correct) {
        this.game.score += 100;
      } else {
        this.game.score -= 50;
      }

      this.playSprite(correct ? this.goodSound : this.badSound).then(
        utils.sleep(1).then(() => {
          if (this.game.over) {
            this.gameOver();
          } else {
            this.gameQuestion();
          }
        })
      );

      return true;
    },
    gameOver() {
      this.playSprite(utils.randomlyVoicedPhrase("super")).then(() => {
        alert(this.$i18n.t("alfabet_thanks"));
      });
      return true;
    },
    startGame() {
      this.newGame();
      this.gameQuestion();
    }
  }
};
</script>

<style>
button.button.letterButton {
  font-family: "Rubik Mono One";
}

#instructionbox {
  margin-top: 1.5em;
  margin-bottom: 3em;
}

.score {
  font-family: "Bungee Shade";
  padding: 0 0.5em 0 0.5em;
}
</style>
