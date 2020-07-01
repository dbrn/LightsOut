import React from "react";
import LedButton from "./LedButton";
import LedCommandButton from "./LedCommandButton";

import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binaryArray: [...this.fillBinaryArray(this.props.binarySeed)],
    };

    this.fillBinaryArray = this.fillBinaryArray.bind(this);
    this.handleLedPress = this.handleLedPress.bind(this);
  }

  fillBinaryArray(binarySeed) {
    const workBinaryArray = binarySeed.split("");
    const workFinalArray = [];
    workFinalArray.push(workBinaryArray.slice(0, 5));
    workFinalArray.push(workBinaryArray.slice(5, 10));
    workFinalArray.push(workBinaryArray.slice(10, 15));
    workFinalArray.push(workBinaryArray.slice(15, 20));
    workFinalArray.push(workBinaryArray.slice(20));
    return workFinalArray;
  }

  handleLedPress(ledId) {
    const [y, x] = ledId.split("-").map((value) => parseInt(value));
    let workBinaryArray = [...this.state.binaryArray];
    workBinaryArray[y][x] = workBinaryArray[y][x] === "1" ? "0" : "1";
    if (y - 1 >= 0)
      workBinaryArray[y - 1][x] = workBinaryArray[y - 1][x] === "1" ? "0" : "1";
    if (y + 1 <= 4)
      workBinaryArray[y + 1][x] = workBinaryArray[y + 1][x] === "1" ? "0" : "1";
    if (x - 1 >= 0)
      workBinaryArray[y][x - 1] = workBinaryArray[y][x - 1] === "1" ? "0" : "1";
    if (x + 1 <= 4)
      workBinaryArray[y][x + 1] = workBinaryArray[y][x + 1] === "1" ? "0" : "1";
    this.setState({ binaryArray: [...workBinaryArray] }, () => {
      const flatArray = [];
      this.state.binaryArray.forEach((row) => {
        row.forEach((bit) => flatArray.push(bit));
      });
      if (flatArray.every((bit) => bit.toString() === "0")) {
        this.props.setGameEnd();
      } else if (
        flatArray.slice(0, 23).every((bit) => bit.toString() === "0") &&
        flatArray.slice(23).some((bit) => bit.toString() === "1")
      )
        this.props.refresh().then((response) => {
          if (response) {
            this.setState({
              binaryArray: [...this.fillBinaryArray(this.props.binarySeed)],
            });
          }
        });
    });
    this.props.addMove();
  }

  render() {
    return (
      <>
        <div className="board my-5">
          {this.state.binaryArray.length > 0 &&
            this.state.binaryArray.map((row, rowIndex) => {
              return row.map((column, columnIndex) => {
                return (
                  <LedButton
                    id={`${rowIndex}-${columnIndex}`}
                    key={`${rowIndex}-${columnIndex}`}
                    on={column}
                    handleLedPress={this.handleLedPress}
                  />
                );
              });
            })}
          <div>
            <LedCommandButton
              winner={this.props.winner}
              onLedCommandPress={this.props.onLedCommandPress}
            />
          </div>
        </div>
        <div className="text-center text-background pb-1">
          <p>Current seed: {this.props.seed}</p>
          <p>Number of moves: {this.props.numberOfMoves}</p>
        </div>
      </>
    );
  }
}

export default Board;
