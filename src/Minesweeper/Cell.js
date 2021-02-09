import React from "react";


const EMPTY = 0;
const MINE = 1;
// props.x, props.y - position of cell
class Cell extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      classes: { [props.classes] : 1 },
      value: 0,
      opened: false,
      minesAroundNumber: "",
    }
  }

  hasMine() {
    return this.value === MINE;
  }

  isEmpty() {
    return this.value === EMPTY;
  }

  isOpened() {
    return this.opened;
  }

  getClasses() {
    return "cell " + (this.isOpened() ? "opened " : "") + (this.hasMine() ? "mine " : "");
  }

  addClass(className) {
    let classes = this.state.classes;
    classes[className] = 1;
    this.setState({
      classes
    });
  }

  clickHandler() {
    this.addClass("opened");
  }

  render() {
    const colors = {
      1: "blue", 2: "red", 3: "green", 4: "yellow", 5: "purple", 6: "aqua", 7: "orange", 8: "pink"
    };
    // console.log(this.props.cell,this.props.cell.isOpened,this.props.cell.getClasses(),"cell " + (this.props.cell.isOpened ? "opened " : "") + (this.props.cell.hasMine ? "mine " : ""));
    return <div 
            // className={"cell " + Object.keys(this.state.classes).join(" ")}
            className={this.props.cell.getClasses()}
            onClick={() => {this.props.onClick(this)}}
            style={{color : colors[this.props.cell.minesAroundNumber]}}>
         {this.props.cell.minesAroundNumber}</div>
  }
}

export default Cell;