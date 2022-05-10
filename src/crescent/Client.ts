/// <reference path="../index.d.ts" />

import { Vector2, Vector3 } from "./Vector";

/// Types
enum Hitbox {
  HEAD = 0,
  NECK,
  LOWER_NECK,
  PELVIS,
  BODY,
  THORAX,
  CHEST,
  UPPER_CHEST,
  RIGHT_THIGH,
  LEFT_THIGH,
  RIGHT_CALF,
  LEFT_CALF,
  RIGHT_FOOT,
  LEFT_FOOT,
  RIGHT_HAND,
  LEFT_HAND,
  RIGHT_UPPER_ARM,
  RIGHT_FOREARM,
  LEFT_UPPER_ARM,
  LEFT_FOREARM,
}

enum Hitgroup {
  GENERIC = 0,
  HEAD,
  CHEST,
  STOMACH,
  LEFT_ARM,
  RIGHT_ARM,
  LEFT_LEG,
  RIGHT_LEG,
}

enum AnimationLayerIndex {
  AIMMATRIX = 0,
  WEAPON_ACTION,
  WEAPON_ACTION_RECROUCH,
  BALANCE_ADJUST,
  JUMP_FALL,
  LAND_CLIMB,
  MOVE,
  STRAFE,
  WHOLE_BODY,
  FLASHED,
  FLINCH,
  STANDING,
  LEANING,
}

enum ActivityIndex {
  NONE = 957,
  DEFUSE,
  DEFUSE_WITH_KIT,
  FLASHBANG_REACTION,
  FIRE_PRIMARY,
  FIRE_PRIMARY_OPT1,
  FIRE_PRIMARY_OPT2,
  FIRE_SECONDARY,
  FIRE_SECONDARY_OPT1,
  FIRE_SECONDARY_OPT2,
  RELOAD,
  RELOAD_START,
  RELOAD_LOOP,
  RELOAD_STOP,
  OPERATE,
  DEPLOY,
  CATCH,
  SILENCER_DETACH,
  SILENCER_ATTACH,
  TWITCH,
  TWITCH_BUYZONE,
  PLANT_BOMB,
  BALANCE_ADJUST,
  STOPPED_MOVING,
  ALIVE_LOOP,
  FLINCH,
  FLINCH_HEAD,
  FLINCH_MOLOTOV,
  JUMP,
  FALL,
  CLIMB_LADDER,
  LAND_LIGHT,
  LAND_HEAVY,
  EXIT_LADDER_TOP,
  EXIT_LADDER_BOTTOM,
}

type CCSWeaponInfo = {
  price: number;
  kill_award: number;
  cycle_time: number;
  cycle_time_alt: number;
  damage: number;
  armor_ratio: number;
  penetration: number;
  range: number;
  max_speed: number;
  max_speed_alt: number;
  max_clip: number;
  spread: number;
  spread_alt: number;
  inaccuracy_crouch: number;
  inaccuracy_crouch_alt: number;
  inaccuracy_stand: number;
  inaccuracy_stand_alt: number;
  inaccuracy_jump_initial: number;
  inaccuracy_jump_apex: number;
  inaccuracy_jump: number;
  inaccuracy_jump_alt: number;
  inaccuracy_land: number;
  inaccuracy_land_alt: number;
  inaccuracy_ladder: number;
  inaccuracy_ladder_alt: number;
  inaccuracy_fire: number;
  inaccuracy_fire_alt: number;
  inaccuracy_move: number;
  inaccuracy_move_alt: number;
  inaccuracy_reload: number;
};

/// Utility classes
class Box {
  public min: Vector2;
  public max: Vector2;
  public valid: boolean;

  public constructor(data: any[]) {
    this.valid = data[0];
    this.min = new Vector2(data[1], data[2]);
    this.max = new Vector2(data[3], data[4]);
  }
}

/// Classes
class BaseEntity {
  protected _id: number;

  public constructor(id: number) {
    this._id = id;
  }

  public get index(): number {
    return this._id;
  }

  public getClassId(): number {
    return Entity.GetClassID(this._id);
  }

  public getClassName(): string {
    return Entity.GetClassName(this._id);
  }

  public getName(): string {
    return Entity.GetName(this._id);
  }

  public getOrigin(): Vector3 {
    return Vector3.from(Entity.GetRenderOrigin(this._id));
  }

  public getProp<T>(table: string, name: string): T {
    return Entity.GetProp(this._id, table, name);
  }

  public setProp<T>(table: string, name: string, value: T): void {
    Entity.SetProp(this._id, table, name, value);
  }
}

class Player extends BaseEntity {
  public static local(): Player {
    return new Player(Entity.GetLocalPlayer());
  }

  public static fromUserId(userId: number): Player {
    return new Player(Entity.GetEntityFromUserID(userId));
  }

  public static fromEntity(entity: BaseEntity): Player {
    return new Player(entity.index);
  }

  public isEnemy(): boolean {
    return Entity.IsEnemy(this._id);
  }

  public isTeammate(): boolean {
    return (
      Entity.IsTeammate(this._id) && !Entity.IsLocalPlayer(this._id)
    );
  }

  public isLocal(): boolean {
    return Entity.IsLocalPlayer(this._id);
  }

  public isValid(): boolean {
    return Entity.IsValid(this._id);
  }

  public isAlive(): boolean {
    return Entity.IsAlive(this._id);
  }

  public isDormant(): boolean {
    return Entity.IsDormant(this._id);
  }

  public isAI(): boolean {
    return Entity.IsBot(this._id);
  }

  public sanitize(): boolean {
    return (
      Entity.IsAlive(this._id) &&
      !Entity.IsDormant(this._id) &&
      Entity.IsValid(this._id)
    );
  }

  public getEyePosition(): Vector3 {
    return Vector3.from(Entity.GetEyePosition(this._id));
  }

  public getHitboxPosition(hitbox: Hitbox): Vector3 {
    return Vector3.from(
      Entity.GetHitboxPosition(this._id, hitbox as number)
    );
  }

  public getWeapon(): BaseEntity {
    return new BaseEntity(Entity.GetWeapon(this._id));
  }

  public getWeapons(): BaseEntity[] {
    return Entity.GetWeapons(this._id).map(
      (id) => new BaseEntity(id)
    );
  }

  public getWeaponInfo(): CCSWeaponInfo {
    return Entity.GetCCSWeaponInfo(this._id) as CCSWeaponInfo;
  }

  public getRenderBox(): Box {
    return new Box(Entity.GetRenderBox(this._id));
  }

  public getSteamID(): number {
    return Entity.GetSteamID(this._id);
  }

  public drawFlag(flag: string, color: number[]): void {
    Entity.DrawFlag(this._id, flag, color);
  }

  public disableESP(): void {
    Entity.DisableESP(this._id);
  }

  public getAnimationLayer(layer: number): AnimationLayer {
    return Entity.GetAnimationLayer(this._id, layer);
  }
}

class Client {
  public static getLocal(): Player {
    return Player.local();
  }

  public static getEntities(): BaseEntity[] {
    return Entity.GetEntities().map((id) => new BaseEntity(id));
  }

  public static getEntitiesByClassID(classId: number): BaseEntity[] {
    return Entity.GetEntitiesByClassID(classId).map(
      (id) => new BaseEntity(id)
    );
  }

  public static getEntity(index: number): BaseEntity {
    return new BaseEntity(index);
  }

  public static getPlayer(index: number): Player {
    return new Player(index);
  }

  public static getPlayerByUserId(userId: number): Player {
    return Player.fromUserId(userId);
  }

  public static getEnemies(): Player[] {
    return Entity.GetEnemies().map((id) => new Player(id));
  }

  public static getTeammates(): Player[] {
    return Entity.GetTeammates().map((id) => new Player(id));
  }

  public static getGameRulesProxy(): BaseEntity {
    return new BaseEntity(Entity.GetGameRulesProxy());
  }
}
/// Functions

export {
  AnimationLayerIndex,
  ActivityIndex,
  Hitbox,
  Hitgroup,
  Client,
  BaseEntity,
  Player,
};
