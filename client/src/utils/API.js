import axios from "axios";

export default {
    // gets all high scores
    getScores: function () {
        return axios.get("/api/scores");
    },
    // Saves a score to the database
    saveScore: function (scoreData) {
        return axios.post("/api/scores", scoreData);
    }
}