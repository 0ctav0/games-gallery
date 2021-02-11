class CellModel {

  constructor(value) {
    this.value = value;
    this.flag = false;
    this.opened = false;
    this.minesAroundNumber = "";
  }

  hasMine() {
    return this.value === CellModel.MINE;
  }

  isEmpty() {
    return this.value === CellModel.EMPTY;
  }

  getClasses() {
    return "cell " 
    + (this.opened ? "opened " : "")
    + (this.opened && this.hasMine() ? "mine " : "")
    + (!this.opened && this.flag ? "flag " : "")
    ;
  }
}
CellModel.EMPTY = 0;
CellModel.MINE = 1;

export default CellModel;