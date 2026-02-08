/*:
* @plugindesc Save legal
* @autor Auron
* @help Se vira
*/

(() => {
    const _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        this.createBackground();
        _Scene_File_create.apply(this, arguments);
        this._listWindow.x -= 10;
        this._listWindow.width = Graphics.boxWidth / 2 - 40;
        this._listWindow.height = Graphics.boxHeight - 140;
        this._listWindow.opacity = 0;
        const x = this._listWindow.x + this._listWindow.width + 90;
        const y = 20;
        const width = Graphics.boxWidth / 2 - 20;
        const height = this._listWindow.height + 90;
        const rect = new Rectangle(x, y, width, height);
        const statusWindow = new Window_SavefileStatus(rect);
        statusWindow.opacity = 0;
        this._listWindow.mzkp_statusWindow = statusWindow;
        this.addWindow(statusWindow);
    };

    Scene_File.prototype.createBackground = function(){
		var sprite = new Sprite();
		sprite.bitmap = ImageManager.loadPicture("book");
		var sprite2 = new Sprite();
		sprite2.bitmap = ImageManager.loadPicture("book-save");
		this.addChild(sprite);
		this.addChild(sprite2);
	};

    const _Scene_File_start = Scene_File.prototype.start;
    Scene_File.prototype.start = function() {
        _Scene_File_start.apply(this, arguments);
        this._listWindow.ensureCursorVisible();
        this._listWindow.callUpdateHelp();
    };

    Scene_File.prototype.createHelpWindow = function() {
        const rect = this.helpWindowRect();
        rect.width = rect.width / 2 - 50;
        rect.y += 15;
        this._helpWindow = new Window_Help(rect);
        this._helpWindow.opacity = 0;
        this.addWindow(this._helpWindow);
    };

    Window_Help.prototype.refresh = function() {
        const rect = this.baseTextRect();
        this.contents.clear();
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(this._text, rect.x, rect.y, rect.width, 'center');
    };

    Window_SavefileList.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_SavefileList.prototype.maxCols = function() {
        return 1;
    };

    Window_SavefileList.prototype.itemHeight = function() {
        return this.lineHeight() + 16;
    };

    Window_SavefileList.prototype.drawItem = function(index) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        const rect = this.itemRectWithPadding(index);
        if(this.isEnabled(savefileId)){
            this.changeTextColor('#936F3E');
        }else{
            this.changeTextColor('#827667');
        }
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawTitle(savefileId, rect.x, rect.y + 4);
        if (info) {
            this.drawPlaytime(info, rect.x, rect.y + 4,  rect.width);
        }
    };

    Window_SavefileList.prototype.drawContents = function(info, rect) {
        const bottom = rect.y + rect.height;
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight - 4;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };

    const _Window_SavefileList_callUpdateHelp = Window_SavefileList.prototype.callUpdateHelp;
    Window_SavefileList.prototype.callUpdateHelp = function() {
        _Window_SavefileList_callUpdateHelp.apply(this, arguments);
        if (this.active && this.mzkp_statusWindow) {
            this.mzkp_statusWindow.setSavefileId(this.savefileId());
        }
    };

    function Window_SavefileStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_SavefileStatus.prototype = Object.create(Window_Base.prototype);
    Window_SavefileStatus.prototype.constructor = Window_SavefileStatus;

    Window_SavefileStatus.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._savefileId = 1;
    };

    Window_SavefileStatus.prototype.setSavefileId = function(id) {
        this._savefileId = id;
        this.refresh();
    };

    Window_SavefileStatus.prototype.refresh = function() {
        const info = DataManager.savefileInfo(this._savefileId);
        const rect = this.contents.rect;
        this.contents.clear();
        this.resetTextColor();
        this.drawTitle(this._savefileId, rect.x, rect.y);
        this.removeJose();
        if (info) {
            this.drawContents(info, rect);
        }
    };

    Window_SavefileStatus.prototype.drawHorzLine = function(y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 255;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, '#936F3E');
        this.contents.paintOpacity = 255;
    };

    Window_SavefileStatus.prototype.drawTitle = function(savefileId, x, y) {
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        if (savefileId === 0) {
            this.drawText(TextManager.autosave, x, y, 180);
        } else {
            this.drawText(TextManager.file + " " + savefileId, x, y, 180);
        }
        this.drawHorzLine(y + this.lineHeight())
    };

    Window_SavefileStatus.prototype.drawContents = function(info, rect) {
        this.child = [];
        const bottom = rect.y + rect.height;
        const playtimeY = bottom - this.lineHeight() - 5;
        //Draw play time
        this.changeTextColor('#DDB98B');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(info.playtime, rect.x - 18, playtimeY, rect.width, "right");
        //Draw gold
		this.drawIcon(314,10,playtimeY);
		this.drawText((info.gold || 0) + ' Moedas',40,playtimeY, 145, 'right');
        //Draw Jose
        var sprite = {};
        if(info.hasHelm && info.hasSword){
			sprite = new Sprite(ImageManager.loadPicture("joseMenuEspadaCapacete"));
		}else if(!info.hasHelm && info.hasSword){
			sprite = new Sprite(ImageManager.loadPicture("joseMenuEspada"));
		}else if(info.hasHelm && !info.hasSword){
			sprite = new Sprite(ImageManager.loadPicture("joseMenuCapacete"));
		}else{
			sprite = new Sprite(ImageManager.loadPicture("joseMenu"));
		}

        sprite.move(-550,-80);
        sprite.isJose = true;
        this.addChild(sprite);
    };

    Window_SavefileStatus.prototype.removeJose = function() {
        let chil = this.children;
        for(let i = 0; i < chil.length; i++){
            if(chil[i].isJose == true){
                this.children.splice(i, 1);
            }
        }
    };
})();
