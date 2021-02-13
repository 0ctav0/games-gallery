import React from "react";
import "./PyramidBuild.sass";
import Utils from "../Utils/Utils";

import allWords from "./ru_words.json";

console.log(allWords, "count:",allWords.reduce((wordsNumber,category) => wordsNumber + category.length, 0));

interface IProps {

}

interface IState {
  words: string[];
  wordsInRoom: string[];
  i: number;
  word: string;
  hideStartBtn: boolean;
  level: number;
}

class PyramidBuild extends React.Component<IProps, IState> {

  static readonly delay: number = 1000;
  static readonly wordsPerLevel: number = 2;
  static readonly startWordsNumber: number = 3;
  static readonly wordsInRoomNumber: number = 8;

  constructor(props: IProps) {
    super(props);

    this.state = {
      level: 1,
      words: [],
      wordsInRoom: [],
      i: 0, word: "", hideStartBtn: false,
    };

  }

  initWords() {
    this.setState({words:
      Utils.randomSort(allWords.flat())
      .slice(0, PyramidBuild.startWordsNumber + this.state.level * PyramidBuild.wordsPerLevel)
    });
  }

  initWordsForRoom() {
    const wordsNumber = this.state.words.length;
    const roomSize = PyramidBuild.wordsInRoomNumber;
    const divs = Math.ceil(wordsNumber / roomSize);
    const wordsInRoom = [];
    for (let i = 0; i < divs; i++) {
      const segment = this.state.words.slice(i * roomSize, (i + 1) * roomSize);
      wordsInRoom.push(Utils.randomSort(segment));
    }
    return wordsInRoom.flat();
  }

  start() {
    this.setState({hideStartBtn: true});
    this.initWords();
  }

  nextWord() {
    setTimeout(() => {
      if (this.state.i < this.state.words.length) {
        this.setState({word: this.state.words[this.state.i]});
        this.setState((prevState, props) => ({i : prevState.i + 1}));
        this.nextWord();
      }
      else {  // Finish last word
        this.setState({wordsInRoom: this.initWordsForRoom()});
      }
    }, this.state.i === 0 ? 0 : PyramidBuild.delay);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.state.words !== prevState.words) {
      this.nextWord();
    }
  }

  render() {
    return (
      // <p>{selectedWords.join(" ")}</p>
      <div className="pyramid-build">
        <h2 >{this.state.word}</h2>
        <button onClick={() => this.start()} style={{display: this.state.hideStartBtn ? "none" : ""}}>Start</button>
        <div className="room">
          {this.state.wordsInRoom.map((word,i) => <div key={i} className="word">{word}</div>)}
        </div>
      </div>
    );
  }
}

export default PyramidBuild;