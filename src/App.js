import React from "react";
import NewGameMenu from "./components/NewGameMenu";
import Board from "./components/Board";

class App extends React.Component {
  static defaultProps = {
    fiveByFiveConstant: 33554431,
  };

  constructor(props) {
    super(props);
    this.state = {
      gameRunning: false,
      seed: this.getRandomSeed(),
      binarySeed: null,
      winner: false,
      numberOfMoves: 0,
    };

    this.getBinarySeed = this.getBinarySeed.bind(this);
    this.getRandomSeed = this.getRandomSeed.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidMount() {
    this.setState({ binarySeed: this.getBinarySeed() });
  }

  getRandomSeed() {
    return Math.floor(Math.random() * this.props.fiveByFiveConstant);
  }

  getBinarySeed() {
    return parseInt(this.state.seed).toString(2).padStart(25, "0");
  }

  resetGame() {
    this.setState(
      {
        winner: false,
        gameRunning: false,
        numberOfMoves: 0,
        seed: this.getRandomSeed(),
      },
      () => this.setState({ binarySeed: this.getBinarySeed() })
    );
  }

  render() {
    return (
      <div>
        <div className="text-center d-flex justify-content-center mb-md-5">
          <h1>LightsOut!</h1>
        </div>

        {!this.state.gameRunning && (
          <NewGameMenu
            maxNumber={this.props.fiveByFiveConstant}
            setSeed={(value) =>
              this.setState({ seed: value }, () => console.log(this.state.seed))
            }
            seed={this.state.seed}
            refreshSeed={() =>
              this.setState({
                seed: this.getRandomSeed(),
              })
            }
            onStart={() =>
              this.setState({
                gameRunning: true,
              })
            }
          />
        )}
        {this.state.gameRunning && this.state.binarySeed && (
          <Board
            binarySeed={this.state.binarySeed}
            setGameEnd={() => this.setState({ winner: true })}
            seed={this.state.seed}
            addMove={() =>
              this.setState((oldState) => {
                return { numberOfMoves: oldState.numberOfMoves + 1 };
              })
            }
            numberOfMoves={this.state.numberOfMoves}
            winner={this.state.winner}
            onLedCommandPress={this.resetGame}
            refresh={() =>
              new Promise((resolve, reject) => {
                this.setState({ seed: this.getRandomSeed() }, () =>
                  this.setState({ binarySeed: this.getBinarySeed() }, () => {
                    resolve(true);
                  })
                );
              })
            }
          />
        )}
      </div>
    );
  }
}

export default App;
