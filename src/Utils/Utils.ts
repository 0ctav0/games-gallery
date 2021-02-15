class Utils {

  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomSort(arr: string[]) {
    return arr.sort((a,b) => Utils.randomInt(0, 1) > 0 ? 1 : -1);
  }
}

export default Utils;
