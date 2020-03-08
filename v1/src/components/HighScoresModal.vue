<template>
  <div :class="{ modal: true, 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content has-text-centered">
      <!-- -->
      <div class="columns is-mobile is-multiline">
        <!-- -->
        <div class="column is-full">
          <div class="box score-box">
            <p class="heading is-size-2 is-size-3-mobile">{{ $t("score") }}</p>
            <p class="title">{{ score }}</p>
          </div>
        </div>
        <!-- -->
        <div
          :class="{
            column: true,
            'is-half': errorList.length > 0,
            'is-full': errorList.length == 0
          }"
        >
          <div class="box highscores-box is-clipped">
            <span class="heading is-size-3 is-size-4-mobile">{{
              $t("high_scores")
            }}</span>
            <div
              v-for="(highscore, idx) in highScores"
              :key="idx"
              :class="{
                'is-size-5': true,
                'is-size-6-mobile': true,
                'has-text-weight-bold': highscore == score
              }"
            >
              {{ idx + 1 }}. {{ highscore }}
            </div>
          </div>
        </div>
        <!-- -->
        <div class="column is-half" v-if="errorList.length > 0">
          <div class="box mistakes-box is-clipped">
            <span class="heading is-size-3 is-size-4-mobile">
              {{ $t("errors") }}
            </span>
            <div
              v-for="(desiredAnswer, idx) in errorList"
              :key="idx"
              class="is-size-5 is-uppercase is-family-monospace"
            >
              {{ desiredAnswer }}
            </div>
          </div>
        </div>
        <!-- -->
        <div class="column is-full">
          <button
            class="button is-fullwidth is-success dismiss"
            @click="hide()"
          >
            OK
          </button>
        </div>
        <!-- -->
      </div>
      <!-- -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HighScoresModal",
  data() {
    return {
      pass: true
    };
  },
  props: {
    answers: Array,
    score: Number,
    highScores: Array,
    visible: Boolean
  },
  methods: {
    hide() {
      this.$emit("close");
    }
  },
  computed: {
    errorList() {
      // this.answers is [response, desiredReponse]
      let wrongAnswers = this.answers.filter(answer => {
        return answer[0] != answer[1];
      });

      return wrongAnswers.map(answer => {
        return answer[1];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.modal-content {
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
  border-radius: 0.75rem;
  overflow: hidden;
  color: black;
}

.box {
  background-color: transparent;
  box-shadow: none;
}

// .score-box {
// }

.highscores-box {
  font-family: monospace;
}

// .mistakes-box {
// }

.heading {
  font-family: "Baloo", Helvetica, sans-serif;
  color: black;
}

.dismiss {
  border-radius: 0;
}
</style>
