/*:
* @plugindesc Equipamentos legal
* @autor Auron
* @help Se vira
*/

(function(){    
    Scene_Equip.prototype.create = function() {
        this.createBackground();
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createStatusWindow();
        this.createCommandWindow();
        this.createSlotWindow();
        this.createItemWindow();
        this.refreshActor();
    };

    Scene_Equip.prototype.createBackground = function(){
		var sprite = new Sprite();
		sprite.bitmap = ImageManager.loadPicture("book");
		var sprite2 = new Sprite();
		sprite2.bitmap = ImageManager.loadPicture("book-equips");
		this.addChild(sprite);
		this.addChild(sprite2);
	};
    
    Scene_Equip.prototype.createHelpWindow = function() {
        const rect = this.helpWindowRect();
        rect.width = Graphics.boxWidth / 2 - 35;
        rect.height -= 30
        rect.x = Graphics.boxWidth / 2 + 50;
        rect.y += 20
        this._helpWindow = new Window_Help(rect);
        this._helpWindow.opacity = 0;
        this.addWindow(this._helpWindow);
    };

    Scene_Equip.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth - this.mainCommandWidth() + 60;
        const wh = this.mainAreaHeight();
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Equip.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_EquipStatus(rect);
        this._statusWindow.x -= 12
        this._statusWindow.y += 10
        this._statusWindow.opacity = 0;
        this.addWindow(this._statusWindow);
    };

    Window_EquipStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            const nameRect = this.itemLineRect(0);
            this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
            this.drawActorFace(this._actor, nameRect.x + 100, nameRect.height);
            this.drawAllParams();
        }
    };

    Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
        const width = this.paramX() - this.itemPadding() * 2;
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(TextManager.param(paramId), x, y, width);
    };
    
    Window_EquipStatus.prototype.drawActorName = function(actor, x, y, width) {
        width = 350;
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(actor.name(), x, y, width, 'center');
    };

    Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
        const paramWidth = this.paramWidth();
        const newValue = this._tempActor.param(paramId);
        const diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, paramWidth, "right");
    };
    
    Scene_Equip.prototype.statusWindowRect = function() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = this.statusWidth();
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Window_EquipCommand.prototype.maxCols = function() {
        return 2;
    };

    Window_EquipCommand.prototype.itemTextAlign = function() {
        return "center";
    };

    Window_EquipCommand.prototype.itemWidth = function() {
        return 120;
    };

    Window_EquipCommand.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        rect.width = 90;
        const align = this.itemTextAlign();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    };

    Window_EquipCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.equip2, "equip");
        this.addCommand(TextManager.clear, "clear");
    };
    
    Scene_Equip.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_EquipCommand(rect);
        this._commandWindow.x += 140;
        this._commandWindow.y -= 40;
        this._commandWindow.width = 260;
        this._commandWindow.opacity = 0;
        this._commandWindow.setHelpWindow(this._helpWindow);
        this._commandWindow.setHandler("equip", this.commandEquip.bind(this));
        this._commandWindow.setHandler("clear", this.commandClear.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this._commandWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._commandWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._commandWindow);
    };
    
    Scene_Equip.prototype.commandWindowRect = function() {
        const wx = this.statusWidth();
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Equip.prototype.createSlotWindow = function() {
        const rect = this.slotWindowRect();
        this._slotWindow = new Window_EquipSlot(rect);
        this._slotWindow.x += 140;
        this._slotWindow.y -= 40
        this._slotWindow.width -= 125;
        this._slotWindow.height -= 200;
        this._slotWindow.opacity = 0;
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
        this._slotWindow.setHandler("cancel", this.onSlotCancel.bind(this));
        this.addWindow(this._slotWindow);
    };
    
    Scene_Equip.prototype.slotWindowRect = function() {
        const commandWindowRect = this.commandWindowRect();
        const wx = this.statusWidth();
        const wy = commandWindowRect.y + commandWindowRect.height;
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.mainAreaHeight() - commandWindowRect.height;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Equip.prototype.createItemWindow = function() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_EquipItem(rect);
        this._itemWindow.x += 140;
        this._itemWindow.y -= 40;
        this._itemWindow.width -= 125;
        this._itemWindow.height -= 200;
        this._itemWindow.opacity = 0;
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._itemWindow.hide();
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };
    
    Scene_Equip.prototype.itemWindowRect = function() {
        return this.slotWindowRect();
    };
    
    Scene_Equip.prototype.statusWidth = function() {
        return 312;
    };
    
    Scene_Equip.prototype.needsPageButtons = function() {
        return false;
    };
    
    Scene_Equip.prototype.arePageButtonsEnabled = function() {
        return !(this._itemWindow && this._itemWindow.active);
    };
    
    Scene_Equip.prototype.refreshActor = function() {
        const actor = this.actor();
        this._statusWindow.setActor(actor);
        this._slotWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };
    
    Scene_Equip.prototype.commandEquip = function() {
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };
    
    Scene_Equip.prototype.commandClear = function() {
        SoundManager.playEquip();
        $gameParty.members()[0].setCharacterImage('jose', 0)
        $gameParty.members()[0].setFaceImage('Jose', 0)
        $gameTemp.reserveCommonEvent(7);
        this.actor().clearEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._commandWindow.activate();
    };
    
    Scene_Equip.prototype.onSlotOk = function() {
        this._slotWindow.hide();
        this._itemWindow.show();
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };
    
    Scene_Equip.prototype.onSlotCancel = function() {
        this._slotWindow.deselect();
        this._commandWindow.activate();
    };
    
    Scene_Equip.prototype.onItemOk = function() {
        SoundManager.playEquip();
        this.executeEquipChange();
        this.changeImageJose();
        this.hideItemWindow();
        this._slotWindow.refresh();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
        $gameTemp.reserveCommonEvent(7);
    };

    Scene_Equip.prototype.changeImageJose = function() {
        if($gameActors._data[1]._equips[0]._itemId == 1){
            //espada equipada
            if($gameActors._data[1]._equips[1]._itemId == 55){
                //Com espada e com capacete
                $gameParty.members()[0].setCharacterImage('jose-capacete', 0)
                $gameParty.members()[0].setFaceImage('Jose-capacete', 0)
            }else{
                //Com espada e sem capacete
                $gameParty.members()[0].setCharacterImage('jose-espada', 0)
                $gameParty.members()[0].setFaceImage('Jose', 0)
            }
        }else if($gameActors._data[1]._equips[1]._itemId == 55){
            //sem espada mas com capacete
            $gameParty.members()[0].setCharacterImage('jose-capacete-sem-espada', 0)
            $gameParty.members()[0].setFaceImage('Jose-capacete', 0)
        }else{
            //sem espada e sem capacete
            $gameParty.members()[0].setCharacterImage('jose', 0)
            $gameParty.members()[0].setFaceImage('Jose', 0)
        }
    };
    
    Scene_Equip.prototype.executeEquipChange = function() {
        const actor = this.actor();
        const slotId = this._slotWindow.index();
        const item = this._itemWindow.item();
        actor.changeEquip(slotId, item);
    };
    
    Scene_Equip.prototype.onItemCancel = function() {
        this.hideItemWindow();
    };
    
    Scene_Equip.prototype.onActorChange = function() {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this.hideItemWindow();
        this._slotWindow.deselect();
        this._slotWindow.deactivate();
        this._commandWindow.activate();
    };
    
    Scene_Equip.prototype.hideItemWindow = function() {
        this._slotWindow.show();
        this._slotWindow.activate();
        this._itemWindow.hide();
        this._itemWindow.deselect();
    };
    
})()