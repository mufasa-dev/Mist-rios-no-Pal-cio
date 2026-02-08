/*:
* @plugindesc Change Tile size
* @autor Mufasa
* @help Se vira
*/

var Muf = Muf || {};
Muf.TileSize = {};

Muf.TileSize.tileSize = 64;

(() => {

  Game_Map.prototype.tileWidth = function() {
      return Muf.TileSize.tileSize;
  };

  Game_Map.prototype.tileHeight = function() {
      return Muf.TileSize.tileSize;
  };

  ImageManager.loadTileset = function(filename) {
      return this.loadBitmap('img/tilesets/', (filename + '!'));
  };

  Object.defineProperty(Tilemap.prototype, 'tileWidth', {
      get: function() {
          return this._tileWidth;
      },
      set: function(value) {
          if (this._tileWidth !== value) {
              this._tileWidth = value;
              this._createLayers();
          }
      }
  });

  Object.defineProperty(Tilemap.prototype, 'tileHeight', {
      get: function() {
          return this._tileHeight;
      },
      set: function(value) {
          if (this._tileHeight !== value) {
              this._tileHeight = value;
              this._createLayers();
          }
      }
  });
  

})();