/// Main index
/// <reference path="index.d.ts" />

import Callbacks from "./crescent/Callbacks";
import {
  AnimationLayerIndex,
  Hitbox,
  Player,
} from "./crescent/Client";
import Logger from "./crescent/Logger";
import Me from "./crescent/Me";
import Renderer from "./crescent/Renderer";

Callbacks.on("Draw", () => {
  Renderer.circle({
    x: 10,
    y: 10
  })
});

const main = () => {
  Logger.clear();

  Callbacks.registerCallbacks();
};

main();
