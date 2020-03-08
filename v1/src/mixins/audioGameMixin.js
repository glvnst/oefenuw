import { Howl } from "howler";
import utils from "@/utils";

export const audioGameMixin = {
  data() {
    return {
      audio: {},
      goodSound: "freesounddotorg_403018",
      badSound: "freesounddotorg_249300",
      gameOverSound: utils.randomlyVoicedPhrase("super"),

      rounds: 0,

      answerKey: [],
      answers: [],
      currentRound: 1,
      gameOver: true,
      questions: [],
      score: 0,

      highScores: [],
      highScoresVisible: false
    };
  },
  created() {
    this.populateQuestions();
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
    initGame() {
      this.answerKey = new Array();
      this.answers = new Array();
      this.currentRound = 1;
      this.gameOver = false;
      this.questions = new Array();
      this.score = 0;

      this.highScoresVisible = false;

      this.populateQuestions();
    },
    beginGame() {
      this.initGame();

      this.askQuestion();
    },
    populateQuestions() {
      true;
    },
    askQuestion() {
      return true;
    },
    answer(response) {
      const desiredResponse = this.answerKey[this.currentRound - 1];
      const correct = response === desiredResponse;
      this.answers.push([response, desiredResponse]);

      this.score += correct ? 100 : -50;

      let handler = correct
        ? this.answerIsCorrect(desiredResponse)
        : this.answerIsIncorrect(response, desiredResponse);

      handler.then(() => {
        if (this.currentRound >= this.rounds) {
          this.gameOver = true;
          this.endGame();
        } else {
          this.currentRound += 1;
          this.askQuestion();
        }
      });
    },
    answerIsCorrect(response) {
      response;
      return this.playSprite(this.goodSound);
    },
    answerIsIncorrect(response, desiredResponse) {
      response, desiredResponse;
      return this.playSprite(this.badSound);
    },
    endGame() {
      this.recordScore(this.score);
      this.highScoresVisible = true;
      this.playSprite(this.gameOverSound);
    },
    recordScore() {
      let newHighScores = [...this.highScores];
      newHighScores.push(this.score);
      newHighScores.sort((a, b) => {
        return b - a;
      });

      this.highScores = newHighScores.slice(
        0,
        Math.min(newHighScores.length, 5)
      );
    }
  }
};
