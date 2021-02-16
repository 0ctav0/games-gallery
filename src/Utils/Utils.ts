class Utils {

  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomSort(arr: any[]): any[] {
    return arr.sort(() => Utils.randomInt(0, 1) > 0 ? 1 : -1);
  }
}

export default Utils;
