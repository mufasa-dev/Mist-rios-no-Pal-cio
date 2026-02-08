/*:
* @plugindesc Menu PNS
* @autor Auron
* @help Se vira
*/

(function(){
    Scene_Options.prototype.create = function() {
        this.createBackground();
        Scene_MenuBase.prototype.create.call(this);
        this.createOptionsWindow();
    };

    Scene_Options.prototype.createBackground = function(){
		var sprite = new Sprite();
		sprite.bitmap = ImageManager.loadPicture("book");
		var sprite2 = new Sprite();
        if(!$gameSwitches._data[2]){
            sprite2.bitmap = ImageManager.loadPicture("book-option");
        }else{
            sprite2.bitmap = ImageManager.loadPicture("book-option2");
        }
		this.addChild(sprite);
        this.addChild(sprite2);
	};
    
    Scene_Options.prototype.terminate = function() {
        Scene_MenuBase.prototype.terminate.call(this);
        ConfigManager.save();
    };
    
    Scene_Options.prototype.createOptionsWindow = function() {
        const rect = this.optionsWindowRect();
        rect.x += 245
        rect.y -= 60;
        rect.width -= 20;
        this._optionsWindow = new Window_Options(rect);
        this._optionsWindow.opacity = 0;
        this._optionsWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._optionsWindow);
    };
    
    Scene_Options.prototype.optionsWindowRect = function() {
        const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
        const ww = 400;
        const wh = this.calcWindowHeight(n, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Options.prototype.maxCommands = function() {
        // Increase this value when adding option items.
        return 7;
    };
    
    Scene_Options.prototype.maxVisibleCommands = function() {
        return 12;
    };

    Window_Options.prototype.addVolumeOptions = function() {
        this.addCommand(TextManager.bgmVolume, "bgmVolume");
        this.addCommand(TextManager.seVolume, "seVolume");
    };

    Window_Options.prototype.drawItem = function(index) {
        const title = this.commandName(index);
        const status = this.statusText(index);
        const rect = this.itemLineRect(index);
        const statusWidth = this.statusWidth();
        const titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(title, rect.x, rect.y, titleWidth, "left");
        this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right");
    };
})()