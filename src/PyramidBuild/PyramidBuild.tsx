import React from "react";
import "./PyramidBuild.sass";
import Utils from "../Utils/Utils";

import allWords from "./ru_words.json";

console.log(allWords, "count:",allWords.reduce((wordsNumber,category) => wordsNumber + category.length, 0));

interface IProps {

  level: number;

  onFail(): void;
  onWin(): void;
  onLost(): void;
}

interface IState {
  words: string[];
  wordsInRoom: string[];
  i: number;
  selectedWordIndex: number;
  word: string;
  hideStartBtn: boolean;
}

class PyramidBuild extends React.Component<IProps, IState> {

  static readonly delay: number = 100;
  static readonly wordsPerLevel: number = 2;
  static readonly startWordsNumber: number = 3;
  static readonly wordsInRoomNumber: number = 8;

  constructor(props: IProps) {
    super(props);

    this.state = {
      words: [],
      wordsInRoom: [],
      i: 0,
      selectedWordIndex: 0,
      word: "",
      hideStartBtn: false,
    };

  }

  initWords(): void {
    this.setState({words:
      Utils.randomSort(allWords.flat())
      .slice(0, PyramidBuild.startWordsNumber + this.props.level * PyramidBuild.wordsPerLevel)
    });
  }

  initWordsForRoom(): string[] {
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

  start(): void {
    this.setState({hideStartBtn: true});
    this.initWords();
  }

  nextWord(): void {
    setTimeout(() => {
      if (this.state.i < this.state.words.length) {
        this.setState({word: this.state.words[this.state.i]});
        this.setState(prevState => ({i : prevState.i + 1}));
        this.nextWord();
      }
      else {  // Finish last word
        this.setState({wordsInRoom: this.initWordsForRoom()});
      }
    }, this.state.i === 0 ? 0 : PyramidBuild.delay);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState): void {
    console.log("update");
    if (this.state.words !== prevState.words) {
      this.nextWord();
    }
    if (this.state.wordsInRoom.length !== prevState.wordsInRoom.length && this.state.wordsInRoom.length === 0) {
      this.props.onWin();
    }
  }



  getCenteredContent(): React.ReactElement {
    if (!this.state.hideStartBtn) {
      return <div className="word" onClick={() => this.start()}>Start</div>
    }
    else if (this.state.i < this.state.words.length) {
      return <div className="word">{this.state.word}</div>
    }
    return <div></div>
  }

  selectWordHandler = (e: React.MouseEvent): void => {
    const word = (e.target as HTMLElement).innerText;
    if (word === this.state.words[this.state.selectedWordIndex]) {
      const splicedWordsInRoom = this.state.wordsInRoom.slice();  // make copy
      splicedWordsInRoom.splice(splicedWordsInRoom.indexOf(word), 1);  // delete the word
      this.setState(prevState => ({
        wordsInRoom: splicedWordsInRoom,
        selectedWordIndex: prevState.selectedWordIndex + 1
      }));
    }
    else { // fail
      this.props.onFail();
      this.props.onLost();
    }
  }

  render(): React.ReactElement {
    return (
        <div className="pyramid-build">
          <div className="centered">{this.getCenteredContent()}</div>
          <div className="room">
            {this.state.wordsInRoom.slice(0, PyramidBuild.wordsInRoomNumber).map((word, i) =>
                <div
                    key={i}
                    className="word"
                    onClick={this.selectWordHandler}
                    style={{animation: `fadeIn 1s`}}
                >{word}</div>
            )}
          </div>
        </div>
    );
  }
}

export default PyramidBuild;
