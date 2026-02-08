/*:
* @plugindesc Menu PNS
* @autor Auron
* @help Se vira
*/

(function(){

	var _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function(){
		this.createBackground();
		Scene_MenuBase.prototype.create.call(this);
		this.createCommandWindow();
		this.createStatusWindow();
		this.createTitleMenu();
		
		this._commandWindow.x = 0; // Comandos
		this._commandWindow.y = 80; 
		this._commandWindow.width = 340;
		this._commandWindow.opacity = 0;
		this._statusWindow.x = 440; //Nome e descrição
		this._statusWindow.y = 50;
		this._statusWindow.opacity = 0;
		this._statusWindow.width = 400;
		this._statusWindow.height = Graphics.boxHeight - 150;
		
		this.drawJoseph();
	}

	Scene_Menu.prototype.drawJoseph = function(index) {
		//Imagem José
		var actor = $gameActors._data[1];
		if(!actor ) return;
		if(actor._equips[0]._itemId == 1 && actor._equips[1]._itemId == 55){
			var sprite = new Sprite(ImageManager.loadPicture("joseMenuEspadaCapacete"));
			sprite.move(0,0);
			this.addChild(sprite);
		}else if(actor._equips[0]._itemId == 1 && actor._equips[1]._itemId == 0){
			var sprite = new Sprite(ImageManager.loadPicture("joseMenuEspada"));
			sprite.move(0,0);
			this.addChild(sprite);
		}else if(actor._equips[0]._itemId == 0 && actor._equips[1]._itemId == 55){
			var sprite = new Sprite(ImageManager.loadPicture("joseMenuCapacete"));
			sprite.move(0,0);
			this.addChild(sprite);
		}else{
			var sprite = new Sprite(ImageManager.loadPicture("joseMenu"));
			sprite.move(0,0);
			this.addChild(sprite);
		}
	};

	Window_MenuStatus.prototype.drawItem = function(index) {
		this.drawPendingItemBackground(index);
		//this.drawItemImage(index);
		this.drawItemStatus(index);
	};

	Scene_Menu.prototype.update = function(){
		Scene_Base.prototype.update.call(this);
		if(Input.isTriggered('cancel') || TouchInput.isCancelled()){
			SoundManager.playCancel();
			this.popScene();
		}
	}

	Scene_Menu.prototype.commandWindowRect = function() {
		const ww = 350;
		const wh = this.mainAreaHeight() - this.goldWindowRect().height;
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaTop();
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Menu.prototype.createBackground = function(){
		var sprite = new Sprite();
		sprite.bitmap = ImageManager.loadPicture("book");
		var sprite2 = new Sprite();
		sprite2.bitmap = ImageManager.loadPicture("book-menu");
		this.addChild(sprite);
		this.addChild(sprite2);
	};
	
	Scene_Menu.prototype.createTitleMenu = function(){
		this._CreditosTitle = new Window_MenuTitle();
		this.addChild(this._CreditosTitle);
	}
	
	Scene_Menu.prototype.createCommandWindow = function(){
		const rect = this.commandWindowRect();
		this._commandWindow = new Window_MenuCommand(rect);
		this._commandWindow.setHandler("equip", this.openEqipaments.bind(this));
		this._commandWindow.setHandler('quest', this.createCommandQuestBook.bind(this));
		this._commandWindow.setHandler('suspeitos',   this.createCommandSuspeitos.bind(this));
		this._commandWindow.setHandler("save", this.commandSave.bind(this));
		this._commandWindow.setHandler('options', this.commandOptions.bind(this));
		this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
		this.addWindow(this._commandWindow);
	}
	
	Scene_Menu.prototype.openEqipaments = function(){
		SceneManager.push(Scene_Equip);
	}

	Scene_Menu.prototype.createCommandQuestBook = function(){
		SceneManager.push(Scene_QuestBook);
	}

	Scene_Menu.prototype.createCommandSuspeitos = function(){
		SceneManager.push(Scene_SuspectsBook);
	}
	
	
	//-------------------------------------------------------------------------------
	//Altura larura e essas coisas ai
	//-------------------------------------------------------------------------------
	//Menu de status
	
	
	Window_MenuStatus.prototype.numVisibleRows = function(){
		return 4;
	}
	
	Window_MenuStatus.prototype.maxCols = function(){
		return 1;
	}
	
	Window_MenuStatus.prototype.drawItemStatus = function(index) {
		this.opacity = 0;
		var actor = $gameParty.members()[index];
		
	};

	
	//Menu de comandos
	Window_MenuCommand.prototype.windowWidth = function() {
		return 350;
	};

	Window_MenuCommand.prototype.windowHeight = function() {
		return this.fittingHeight(this.numVisibleRows());;
	};

	Window_MenuCommand.prototype.numVisibleRows = function() {
		return 2//this.maxItems();
	};
	
	Window_MenuCommand.prototype.maxCols = function() {
		return 1;
	};
	
	//-------------------------------------------------------------------------------
	//Comandos
	//-------------------------------------------------------------------------------
		
	Window_MenuCommand.prototype.makeCommandList = function() {
		this.addMainCommands();
		this.addOriginalCommands();
		this.addOptionsCommand();
		this.addSaveCommand();
		this.addGameEndCommand();
	};
	
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		var enabled = this.areMainCommandsEnabled();
		this.addCommand('Tarefas', 'quest', enabled);
		this.addCommand('Suspeitos', 'suspeitos', enabled);
	};
	
	var scenesToDraw 	= String('Scene_Menu').split(' ');
	for(var i = 0; i < scenesToDraw.length; i++){ scenesToDraw[i] = eval(scenesToDraw[i]);}
	
	//var commandIconMenu = String(`Opções:83,Dicionário online:12, Fim do jogo:75, Dicionário:189, Tarefas:4, Créditos:73`).split(',');
	var commandIconMenu = String(`Opções:242, Sair:8, Suspeitos:316, Tarefas:193, Equipar:209, Salvar:225`).split(',');
	var commandIcon2 = String('Command Name:2, Command Name:5, Command Name:150').split(',');
	var commandIcon3 = String('Command Name:2, Command Name:5, Command Name:150').split(',');
	var commandIcon4 = String('Command Name:2, Command Name:5, Command Name:150').split(',');
	var commandIcon5 = String('Command Name:2, Command Name:5, Command Name:150').split(',');
	var commandIcon6 = String('Command Name:2, Command Name:5, Command Name:150').split(',');
	var commandIconPrep = [];
	if(commandIconMenu[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIconMenu);}
	if(commandIcon2[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon2);}
	if(commandIcon3[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon3);}
	if(commandIcon4[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon4);}
	if(commandIcon5[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon5);}
	if(commandIcon6[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon6);}
	var commandIcon = {};
	for(i = 0; i < commandIconPrep.length; i++){
		if (['',' '].indexOf(commandIconPrep[i]) < 0) {
			var prep = commandIconPrep[i].match(/\s*(.*)/)[1];
			prep = prep.split(':');
			commandIcon[prep[0]] = Number(prep[1]);
		}
	}
	
	
	Window_MenuCommand.prototype.drawItem = function(index) {
		var rect = this.itemRect(index);
		rect.width = 400;
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		if(scenesToDraw.indexOf(SceneManager._scene.constructor) >= 0){
			var commandName = this.commandName(index);
			if ( commandIcon[commandName] ) {
				this.drawIcon(commandIcon[commandName], rect.x-4, rect.y+2);
				rect.x += 35;
				rect.width -= 39;
			}
		}
		var dots = '.'
		for(let i = 0; i < 17 - this.commandName(index).length; i++){
			dots += '.'
		}
		this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
		this.drawText(this.commandName(index) + ' ' + dots + ' ' + (index + 1) , rect.x, rect.y, rect.width, 'left');
	};

	Window_MenuCommand.prototype.playOkSound = function() {
        AudioManager.playSe({name: 'Book1', pan: 0, pitch: 100, volume: 100})
    };
	
	//-------------------------------------------------------------------------------
	//Menu titulo
	//-------------------------------------------------------------------------------
	
	function Window_MenuTitle(){
		this.initialize.apply(this, arguments);
	}
	
	Window_MenuTitle.prototype = Object.create(Window_Base.prototype);
	Window_MenuTitle.prototype.constructor = Window_MenuTitle;
	
	Window_MenuTitle.prototype.initialize = function(){
		recto = new Rectangle(720, 600, 400, 70);
		Window_Base.prototype.initialize.call(this, recto);
		this.opacity = 0;
		this.changeTextColor('#DDB98B');
		this.changeOutlineColor('rgba(0,0,0,0)')
		this.drawIcon(314,0,0);
		this.drawText($gameParty._gold + ' Moedas',40,0, 145, 'right');
	}

	//-------------------------------------------------------------------------------
	// Correr
	//-------------------------------------------------------------------------------

	Game_Player.prototype.updateDashing = function() {
		if (this.isMoving()) {
			return;
		}
		if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled() && !$gameSwitches._data[13]) {
			this._dashing =
				this.isDashButtonPressed() || $gameTemp.isDestinationValid();
		} else {
			this._dashing = false;
		}
	};
	
})();