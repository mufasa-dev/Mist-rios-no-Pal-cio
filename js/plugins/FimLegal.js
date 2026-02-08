/*:
* @plugindesc Fim Legal
* @autor Mufasa
* @help Se vira
*/

(function(){

    Scene_GameEnd.prototype.create = function() {
        this.createBackground();
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
    };

    Scene_GameEnd.prototype.createCommandWindow = function() {
        const rect = new Rectangle(55, 260, 250, 300);
        this._commandWindow = new Window_GameEnd(rect);
        this._commandWindow.setHandler("toTitle", this.commandToTitle.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this._commandWindow.setHandler("exit", this.commandExit.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_GameEnd.prototype.commandToTitle = function() {
        AudioManager.playSe({name: 'Run', pan: 0, pitch: 100, volume: 100})
        this.fadeOutAll();
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
    };

    Scene_GameEnd.prototype.commandExit = function(){
        AudioManager.playSe({name: 'fala jose final 3', pan: 0, pitch: 100, volume: 100})
        const time = this.slowFadeSpeed() / 60;
        AudioManager.fadeOutBgm(time);
        AudioManager.fadeOutBgs(time);
        AudioManager.fadeOutMe(time);
        this.startFadeOut(this.slowFadeSpeed() * 2.5);
		SceneManager.exit();
	};

    Scene_GameEnd.prototype.createBackground = function(){
		var sprite = new Sprite();
		sprite.bitmap = ImageManager.loadPicture("bookFinish");
		this.addChild(sprite);
	};

    function Window_GameEnd() {
        this.initialize(...arguments);
    }
    
    Window_GameEnd.prototype = Object.create(Window_Command.prototype);
    Window_GameEnd.prototype.constructor = Window_GameEnd;
    
    Window_GameEnd.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.opacity = 0;
        this.openness = 0;
        this.open();
    };
    
    Window_GameEnd.prototype.makeCommandList = function() {
        this.addCommand(TextManager.toTitle, "toTitle");
        this.addCommand('Sair', "exit");
    };

    Window_GameEnd.prototype.drawItem = function(index) {
		var rect = this.itemRect(index);
		this.changeTextColor('#DDB98B');
		this.changeOutlineColor('rgba(0,0,0,0)')
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'center');
	};

    Window_GameEnd.prototype.playOkSound = function() {
        //
    };
})()