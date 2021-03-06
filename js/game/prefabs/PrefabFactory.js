var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PrefabFactory = function (game_state) {
    "use strict";
    Engine.PrefabFactory.call(this, game_state);
    this.prefabs = {
        "player": DungeonExplorer.Player.prototype.constructor,
        "shoot": DungeonExplorer.Shoot.prototype.constructor
    };
    this.script_factory = new DungeonExplorer.ScriptFactory(game_state);
};

DungeonExplorer.PrefabFactory.prototype = Object.create(Engine.PrefabFactory.prototype);
DungeonExplorer.PrefabFactory.prototype.constructor = DungeonExplorer.PrefabFactory;
