export class Vector2 {
  static readonly ONE: Vector2 = new Vector2(1, 1);
  static readonly ONE_ZERO: Vector2 = new Vector2(1, 0);
  static readonly ZERO_ONE: Vector2 = new Vector2(0, 1);
  static readonly ZERO: Vector2 = new Vector2(0, 0);

  private _x: number;
  private _y: number;

  /**
   * Vector2's constructor
   * @param {number} x
   * @param {number} y
   */
  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  get X(): number {
    return this._x;
  }

  set X(x: number) {
    this._x = x;
  }

  get Y(): number {
    return this._y;
  }

  set Y(y: number) {
    this._y = y;
  }

  /**
   * Function to set the Vector2 to the empty state
   */
  public Clear(): void {
    this._x = 0;
    this._y = 0;
  }

  public IsEmpty(): boolean {
    return this._x === 0 && this._y === 0;
  }

  /**
   * Function to divide the current Vector2 by a divider value
   * @returns {number}
   */
  public Divide(divider: number): Vector2 {
    this._x /= divider;
    this._y /= divider;

    return this;
  }

  /**
   * Function to calculate the magnitudo of the current Vector2
   * @returns {number}
   */
  public Magnitude(): number {
    return Math.pow(this._x, 2) + Math.pow(this._y, 2);
  }

  /**
   * Function to return the current Vector2 as string
   * @returns {string}
   */
  public ToString(): string {
    return `${this._x.toFixed(0)},${this._y.toFixed(0)}`;
  }

  /**
   * Function to calculate the distance between two Vector2s
   * @param {Vector2} a
   * @param {Vector2} b
   * @returns {number}
   */
  public static Distance(a: Vector2, b: Vector2): number {
    return Vector2.Subtract(a, b).Magnitude();
  }

  /**
   * Function to sum two Vector2s
   * @param {Vector2} a
   * @param {Vector2} b
   * @returns {Vector2}
   */
  public static Sum(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.X + b.X, a.Y + b.Y);
  }

  /**
   * Function to subtract two Vector2s
   * @param {Vector2} a
   * @param {Vector2} b
   * @returns {Vector2}
   */
  public static Subtract(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.X - b.X, a.Y - b.Y);
  }
}
