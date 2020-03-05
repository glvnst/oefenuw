<template>
  <div class="container">
    <div class="columns is-mobile is-multiline is-centered">
      <div id="instructionbox" class="column is-full has-text-centered">
        <div class="content">
          <h2>
            {{
              game.over ? $t("alfabet_practice_mode") : $t("alfabet_game_mode")
            }}
          </h2>
          <p>
            {{
              game.over
                ? $t("alfabet_instructions_practice")
                : $t("alfabet_instructions_game")
            }}
          </p>
        </div>
      </div>
      <div v-if="!game.over" class="column is-full">
        <div class="level">
          <div class="level-item pull-left">
            {{ $t("score") }}: {{ game.score }}
          </div>
          <div class="level-item pull-right">
            {{ $t("round") }}: {{ game.currentRound }} / {{ game.rounds }}
          </div>
        </div>
      </div>
      <div
        v-for="letter in letters"
        :key="letter"
        class="column is-2 has-text-centered"
      >
        <button
          class="button is-dark is-outlined is-large is-uppercase is-rounded is-family-monospace"
          @click="letterClick(letter)"
        >
          {{ letter }}
        </button>
      </div>
      <div v-if="game.over" class="column is-full has-text-centered">
        <button
          id="startbutton"
          class="button is-success is-large is-uppercase is-rounded"
          @click="startGame"
        >
          {{ $t("alfabet_start_game") }}
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
        // increment the score (by Belgium's founding year... or is it 1830?)
        this.game.score += 1831;
      } else {
        // decrement the score (by half of Belgium's founding year)
        this.game.score -= 915;
      }

      this.playSprite(correct ? this.goodSound : this.badSound).then(() => {
        if (this.game.over) {
          this.gameOver();
        } else {
          this.gameQuestion();
        }
      });

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
#instructionbox {
  margin-top: 1.5em;
  margin-bottom: 3em;
}

#startbutton {
  margin-top: 3em;
}

html {
  background: linear-gradient(-45deg, #5c258d, #4389a2, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-animate 15s ease infinite;
}

/* background animation by https://manuelpinto.in */
@keyframes gradient-animate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
