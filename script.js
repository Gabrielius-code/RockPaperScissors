class Game {
  #computerChoice;
  #playerChoice;
  #options = ["rock", "paper", "scissors"];
  #randomOption;
  #playerChoices = document.querySelectorAll(".player-choice");
  #computerChoices = document.querySelectorAll(".computer-choice");
  #information = document.querySelector(".information");
  #messages = {
    RockSc: "Rock beats scissors!",
    PaperRo: "Paper beats rock!",
    ScissorsPa: "Scissors beats paper!",
  };
  #computerScore = 0;
  #playerScore = 0;
  #playerScoreEl = document.querySelector(".player");
  #computerScoreEl = document.querySelector(".computer");
  #restartButtonEl = document.querySelector(".restart");
  #handlerClick;
  constructor() {
    this.#handlerClick = this.#handlerPlayerClick.bind(this);
    this.#restartButtonEl.addEventListener(
      "click",
      this.#restartGame.bind(this)
    );
    this.#playerPick();
  }
  #computerPick() {
    this.#removeActiveClassComputer();
    this.#randomOption = this.#options[Math.floor(Math.random() * 3)];
    this.#computerChoice = this.#randomOption;
    document
      .querySelector(`[data-choiceComputer=${this.#computerChoice}`)
      .closest("div")
      .classList.add("active");
  }
  #playerPick() {
    this.#playerChoices.forEach((choice) => {
      choice.addEventListener("click", this.#handlerClick);
    });
  }
  #handlerPlayerClick(e) {
    this.#removeActiveClass();
    this.#playerChoice = e.target.dataset.choice;
    e.target.parentElement.classList.add("active");
    this.#startGameRound();
  }

  #removeActiveClass() {
    this.#playerChoices.forEach((choice) => choice.classList.remove("active"));
  }
  #removeActiveClassComputer() {
    this.#computerChoices.forEach((choice) =>
      choice.classList.remove("active")
    );
  }
  #addActiveClass() {
    this.#playerChoices.forEach((choice) => choice.classList.add("active"));
  }
  #addAdtiveClassComputer() {
    this.#computerChoices.forEach((choice) => choice.classList.add("active"));
  }
  #startGameRound() {
    this.#computerPick();
    this.#determineWinner();
  }
  #determineWinner() {
    if (this.#playerChoice === this.#computerChoice)
      this.#setInformMessage("It's a tie!");
    else if (this.#playerChoice === "rock") {
      if (this.#computerChoice === "paper") {
        this.#setInformMessage(`You lost! ${this.#messages.PaperRo}`);
        this.#computerScore++;
      } else if (this.#computerChoice === "scissors") {
        this.#setInformMessage(`You won! ${this.#messages.RockSc}`);
        this.#playerScore++;
      }
    } else if (this.#playerChoice === "paper") {
      if (this.#computerChoice === "rock") {
        this.#setInformMessage(`You won! ${this.#messages.PaperRo}`);
        this.#playerScore++;
      } else if (this.#computerChoice === "scissors") {
        this.#setInformMessage(`You lost! ${this.#messages.ScissorsPa}`);
        this.#computerScore++;
      }
    } else if (this.#playerChoice === "scissors") {
      if (this.#computerChoice === "rock") {
        this.#setInformMessage(`You lost! ${this.#messages.RockSc}`);
        this.#computerScore++;
      } else if (this.#computerChoice === "paper") {
        this.#setInformMessage(`You won! ${this.#messages.ScissorsPa}`);
        this.#playerScore++;
      }
    }
    this.#playerScoreEl.textContent = `Player: ${this.#playerScore}`;
    this.#computerScoreEl.textContent = `Computer: ${this.#computerScore}`;
    this.#checkGameEnd();
  }
  #setInformMessage(message) {
    this.#information.textContent = message;
  }
  #checkGameEnd() {
    if (this.#computerScore === 5 || this.#playerScore === 5) {
      this.#playerChoices.forEach((choice) =>
        choice.removeEventListener("click", this.#handlerClick)
      );
      if (this.#computerScore === 5) {
        this.#computerChoices.forEach((choice) =>
          choice.classList.add("winner")
        );
        this.#playerChoices.forEach((choice) => choice.classList.add("loser"));
        this.#setInformMessage(`You lost! Better luck next time!`);
      } else if (this.#playerScore === 5) {
        this.#playerChoices.forEach((choice) => choice.classList.add("winner"));
        this.#computerChoices.forEach((choice) =>
          choice.classList.add("loser")
        );
        this.#setInformMessage(`You won! Congratulations!`);
      }
    }
  }
  #restartGame() {
    this.#setInformMessage("First to score 5 points wins the game!");
    this.#playerScore = 0;
    this.#playerScoreEl.textContent = `Player: ${this.#playerScore}`;
    this.#computerScore = 0;
    this.#computerScoreEl.textContent = `Computer: ${this.#computerScore}`;
    this.#removeActiveClass();
    this.#removeActiveClassComputer();
    this.#playerChoices.forEach((choice) =>
      choice.classList.remove("winner", "loser")
    );
    this.#computerChoices.forEach((choice) =>
      choice.classList.remove("winner", "loser")
    );
    this.#playerPick();
  }
}

const game = new Game();
