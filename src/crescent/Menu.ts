/// <reference path="../index.d.ts" />

import Logger from "./Logger";

/// Types
type CheckboxProps = {
  name: string;
  initialValue?: number;
};

type SliderProps = {
  name: string;
  min?: number;
  max?: number;
  float?: boolean;
  initialValue?: number;
};

type DropdownProps = {
  name: string;
  list: string[];
  searchable?: boolean;
  multi?: boolean;
  initialValue?: number;
};

type PickerProps = {
  name: string;
  initialValue?: number[];
};

type HotkeyProps = {
  name: string;
  label?: string;
  initialValue?: number;
  initialState?: "Always" | "Toggle" | "Hold";
};

/// Classes
/**
 * A simple menu path reference
 */
class Path {
  protected _path: string[];

  public constructor(path: string[]) {
    this._path = path;
  }

  /**
   * Returns the path
   * @returns {string[]}
   */
  public get path(): string[] {
    return this._path;
  }

  /**
   * Returns the children in this directory.
   * @returns {string[]}
   */
  public get children(): string[] {
    return UI.GetChildren(this._path);
  }

  /**
   * Returns whether or not a child exists in this directory.
   * @param elementName The child name
   * @returns {boolean}
   */
  public exists(elementName: string): boolean {
    return (
      UI.GetChildren(this._path)?.indexOf(elementName) > -1 ?? false
    );
  }
}

/**
 * Any common menu element
 */
class Element extends Path {
  /**
   * Returns nothing since an Element cannot have children.
   * @ignore
   */
  public override get children(): string[] {
    return [];
  }

  /**
   * Returns false since an Element cannot have children.
   * @ignore
   */
  public override exists(elementName: string): boolean {
    return false;
  }

  /**
   * Returns the value of this element.
   * @returns {number}
   */
  public get(): number {
    return UI.GetValue(this._path);
  }

  /**
   * Overrides the value of this element.
   * @param value The desired value
   */
  public set(value: number): void {
    UI.SetValue(this._path, value);
  }

  /**
   * Sets the visibility of this element.
   * @param visibility
   */
  public visible(visibility: boolean): void {
    UI.SetEnabled(this._path, +visibility);
  }
}

/**
 * A hotkey menu element
 */
class Hotkey extends Element {
  /**
   * Returns whether the hotkey is active.
   * @returns {number}
   */
  public get(): number {
    return UI.GetValue(this._path);
  }

  /**
   * Returns the key assigned to this hotkey.
   * @returns {number}
   */
  public getKey(): number {
    return UI.GetHotkey(this._path);
  }

  /**
   * Overrides the key assigned to this hotkey.
   * @param key The desired key
   */
  public setKey(key: number) {
    UI.SetValue(this._path, key);
  }

  /**
   * Returns the state/mode of this hotkey.
   * @returns {} Can only be 'Always', 'Toggle' or 'Hold'
   */
  public getState(): string {
    return UI.GetHotkeyState(this._path);
  }

  /**
   * Overrides the state/mode of this hotkey.
   * @param state Can only be 'Always', 'Toggle' or 'Hold'
   */
  public setState(state: "Always" | "Toggle" | "Hold") {
    UI.SetHotkeyState(this._path, state);
  }
}

/**
 * A color picker menu element
 */
class Picker extends Element {
  /**
   * Returns the color assigned with this picker.
   * @returns {number[]}
   */
  public getColor(): number[] {
    return UI.GetColor(this._path);
  }

  /**
   * Overrides the color assigned with this picker.
   * @param color The desired color
   */
  public setColor(color: number[]): void {
    UI.SetColor(this._path, color);
  }
}

/**
 * A path that points to a directory of elements.
 */
class Directory extends Path {
  /**
   * Returns whether this directory is a sub-tab manager.
   * @private
   * @returns {boolean}
   */
  private isSubTabManager(): boolean {
    return this._path[1] === "SUBTAB_MGR";
  }

  /**
   * Returns whether a element is unique in this directory.
   * @private
   * @param name The element name
   * @returns {boolean}
   */
  private isUnique(name: string): boolean {
    return !this.exists(name);
  }

  /**
   * Asserts whether or not a element exists in this directory.
   * @param name The element name
   */
  private assertUnique(name: string): void {
    Logger.assert(
      this.isUnique(name),
      `This element (${name}) already exists in this directory.`
    );
  }

  /**
   * Adds a new sub-tab to this directory and returns its respective directory.
   * @param name The sub-tab
   * @returns {Directory}
   */
  public addSubTab(name: string): Directory {
    this.assertUnique(name);

    let path = [];

    if (!this.isSubTabManager()) {
      path = [this.path[0], "SUBTAB_MGR"];
    } else {
      path = this._path;
    }

    UI.AddSubTab(path, name);

    return new Directory([path[0], path[1], path[1]]);
  }

  /**
   * Adds a new checkbox to this directory and returns its respective element.
   * @returns {Element}
   */
  public addCheckbox({ name, initialValue }: CheckboxProps): Element {
    this.assertUnique(name);

    const path = UI.AddCheckbox(this._path, name);

    if (initialValue) {
      UI.SetValue(path, initialValue);
    }

    return new Element(path);
  }

  /**
   * Adds a new slider to this directory and returns its respective element.
   * @returns {Element}
   */
  public addSlider({
    name,
    min = 0,
    max = 100,
    float = false,
    initialValue,
  }: SliderProps): Element {
    this.assertUnique(name);

    const path = UI[float ? "AddSliderFloat" : "AddSliderInt"](
      this._path,
      name,
      min,
      max
    );

    if (initialValue) {
      UI.SetValue(path, initialValue);
    }

    return new Element(path);
  }

  /**
   * Adds a new dropdown to this directory and returns its respective element.
   * @returns {Element}
   */
  public addDropdown({
    name,
    list,
    searchable = false,
    multi = false,
    initialValue,
  }: DropdownProps): Element {
    this.assertUnique(name);

    const path = UI[multi ? "AddMultiDropdown" : "AddDropdown"](
      this._path,
      name,
      list,
      +searchable
    );

    if (initialValue) {
      UI.SetValue(path, initialValue);
    }

    return new Element(path);
  }

  /**
   * Adds a new color picker to this directory and returns its respective picker.
   * @returns {Picker}
   */
  public addPicker({ name, initialValue }: PickerProps): Picker {
    this.assertUnique(name);

    const path = UI.AddColorPicker(this._path, name);

    if (initialValue) {
      UI.SetColor(path, initialValue);
    }

    return new Picker(path);
  }

  /**
   * Adds a new hotkey to this directory and returns its respective hotkey.
   * @returns {Hotkey}
   */
  public addHotkey({
    name,
    label = name,
    initialValue,
    initialState,
  }: HotkeyProps): Hotkey {
    this.assertUnique(name);

    if (
      this._path[3] !== "Key assignment" &&
      this._path[3] !== "JS Keybinds"
    ) {
      Logger.warn(`This hotkey (${name}) cannot be placed here.`);
      return null;
    }

    const path = UI.AddHotkey(this._path, name, label);

    if (initialValue) {
      UI.SetValue(path, initialValue);
    }

    if (initialState) {
      UI.SetHotkeyState(path, initialState);
    }

    return new Hotkey(path);
  }
}

/// Functions
/**
 * Returns the value of a raw path.
 * Reference a element instead.
 * @param path The element path
 * @returns {number}
 */
function get(path: string[]): number {
  return UI.GetValue(path);
}

/**
 * Overrides the value of a raw path.
 * Reference a element instead.
 * @param path The element path
 * @param value The desired value
 */
function set(path: string[], value: number) {
  UI.SetValue(path, value);
}

/**
 * Returns whether the cheat's windcw is open.
 * @returns {boolean}
 */
function isOpen(): boolean {
  return UI.IsMenuOpen();
}

/**
 * Returns the cheat's window position.
 * @returns {number[]}
 */
function getPosition(): number[] {
  return UI.GetMenuPosition();
}

export { Element, Picker, Hotkey, Directory };
export default {
  get,
  set,
  isOpen,
  getPosition,
};
