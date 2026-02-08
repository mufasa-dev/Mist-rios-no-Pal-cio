/*:
* @plugindesc Suspects
* @autor Mufasa
* @help Se vira
*/

var Imported = Imported || {};
Imported.QuestBook = true;

var Scene_Suspects = Scene_Suspects || {}; 
Scene_Suspects.fontSize = 22;

(function() {
	//nw.Window.get().showDevTools();

	Scene_Suspects.file = {};
	Scene_Suspects.file.getSuspects = function() {
        Scene_Suspects.suspects = [
            {
                id: 1,
                name: 'José',
                icon: '160',
                description: 'José Slime é um slime muito \nsimples e preguiçoso.\nPassa maior parte do dia\ndormindo e quando não esta \ndescansando passa seus dias \nfugindo do Slime Morte \nou irritando o pessoal \nda cidade.',
                faceName : 'Jose', 
                faceIndex : 0
            },
            {
                id: 2,
                name: 'Mestre',
                icon: '28',
                description: 'Um Slime muito poderoso que\nestá sempre ajudando quem\nprecisa e se metendo\nem aventuras.\n',
                faceName : 'Mestre', 
                faceIndex : 0
            },
            {
                id: 3,
                name: 'Rei',
                icon: '155',
                description: 'O governante supremo da\nCidade Slime.\nPossuí vários soldados e\nfuncionários a sua\ndisposição para servi-lo e\nprotege-lo.\nAlém de possuir um grande\npoder mágico.',
                faceName : 'Rei', 
                faceIndex : 0
            },
            {
                id: 4,
                name: 'Mordomo',
                icon: '159',
                description: 'O conselheiro do Rei e\nchefe dos funcionários do\ncastelo.\nEstá sempre supervisionando o\ntrabalho dos slimes e\nsempre bolando ideias e\niniciativas para tornar\na cidade um lugar melhor.',
                faceName : 'Mordomo', 
                faceIndex : 0
            },
            {
                id: 5,
                name: 'Professor',
                icon: '151',
                description: 'O Slime mais inteligente de\ntodo o continente.\nConhecido por alguns como\ngênio louco do mal.\nInventou várias coisas \nlegais que ajudam os\nslimes no dia-a-dia.\nMas sua maior criação até\nagora é o Cyber Slime.',
                faceName : 'Professor', 
                faceIndex : 0
            },
            {
                id: 6,
                name: 'Cyber Slime',
                icon: '132',
                description: 'Uma máquina de batalha \ncriada pelo professor para \nproteger a cidade.\nEquipado com várias armas e \nmisseis capazes de explodir\npraticamente tudo.\nPor sorte é um slime muito\ngentil e amigo.',
                faceName : 'Professor', 
                faceIndex : 4
            },
            {
                id: 7,
                name: 'Soldados',
                icon: '131',
                description: 'Os valentes guerreiros\nque protegem os castelo e\na cidade dos inimigos e\ngarantem a segurança de\ntodos os slimes do mundo.',
                faceName : 'Silmes-soldados', 
                faceIndex : 1
            },
            {
                id: 8,
                name: 'Cozinheiros',
                icon: '156',
                description: 'Ficam encarregados de \npreparar as refeições para \no rei, os soldados e os \nfuncionários do castelo \nno dia-a-dia.',
                faceName : 'Empregdos', 
                faceIndex : 0,
                condicion: 31
            },
            {
                id: 9,
                name: 'Faxineiro',
                icon: '157',
                description: 'Trabalham limpando o\ncastelo e os quartos\ntodos os dias.\nMantendo tudo muito limpo \ne organizado.',
                faceName : 'Empregdos', 
                faceIndex : 2
            },
            {
                id: 10,
                name: 'Slime Voador',
                icon: '172',
                description: 'Um slime lendário que\npossui o poder de voar \npelos ares a uma \nvelocidade incrível.',
                faceName : 'Slime-Voador', 
                faceIndex : 0,
                condicion: 71
            },
            {
                id: 11,
                name: 'Fazendeiro',
                icon: '278',
                description: 'Cuida das plantações e\npróximas ao castelo e\ngarante que os cozinheiros\ntenham sempre legumes\nfrescos para cozinhar.',
                faceName : 'Empregdos-2', 
                faceIndex : 2,
                condicion: 70
            },
            {
                id: 12,
                name: 'Abelhas',
                icon: '249',
                description: 'Insetos gigantes que vivem \nno subsolo do palácio e \nimpedem que os prisioneiros \ndo calabouço consigam \nescapar.',
                faceName : 'Monster', 
                faceIndex : 0,
                condicion: 47
            },
            {
                id: 13,
                name: 'Slime Morte',
                icon: '122',
                description: 'O mais perigoso de todos os\nslimes. Com sua temível \nfoice ele leva os slimes \nque sofreram grandes danos \nou os muito doentes para \no mundo dos mortos.',
                faceName : 'Slime-Morte', 
                faceIndex : 0,
                condicion: 68
            },
            {
                id: 14,
                name: 'Globerto III',
                icon: '162',
                description: 'Um goblin que foi capturado \npelos soldados enquanto \ntentava roubar o palácio.\nÉ muito simpático, \nintêligente e amigo.',
                faceName : 'Goblin-face', 
                faceIndex : 3,
                condicion: 49
            }
        ]
    }

    Scene_Suspects.fileName = function() {
        Scene_Suspects.file.getSuspects();
    }();

    Scene_Suspects.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        Scene_Suspects.Game_System_initialize.call(this);
        this._suspects = {};
    };

})();


//-----------------------------------------------------------------------------
//  SCENE SUSPECTLOG
//-----------------------------------------------------------------------------

function Scene_SuspectsBook() {
    this.initialize.apply(this, arguments);
}

Scene_SuspectsBook.prototype = Object.create(Scene_ItemBase.prototype);
Scene_SuspectsBook.prototype.constructor = Scene_SuspectsBook;

Scene_SuspectsBook.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_SuspectsBook.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createsuspListWindow();
    this.createInfoWindow();
};

Scene_SuspectsBook.prototype.createBackground = function(){
	var sprite = new Sprite();
	sprite.bitmap = ImageManager.loadPicture("book");
	var sprite2 = new Sprite();
	sprite2.bitmap = ImageManager.loadPicture("book-suspects");
	this.addChild(sprite);
	this.addChild(sprite2);
};

Scene_SuspectsBook.prototype.createsuspListWindow = function() {
	var ww = Graphics.boxWidth / 2;
	var wh = Graphics.boxHeight - 105
	var wy = 0;
	this._itemWindow = new Window_SuspectList(-20, 65, ww, wh);
	this._itemWindow.updateBackOpacity(150)
	this._itemWindow.opacity = 0;
	//this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
	this._itemWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._itemWindow);
	this._itemWindow.activate();
	this._itemWindow.select(0);
};

Scene_SuspectsBook.prototype.createInfoWindow = function() {
	var width = Graphics.boxWidth / 2 - 20;
	var height = this._itemWindow.height + 40;
	var x = this._itemWindow.x + this._itemWindow.width + 60;
	this._helpWindow = new Window_SuspectInfo(x,20,width,height);
	this._helpWindow.opacity = 0;
	this.addWindow(this._helpWindow);
	
	this._itemWindow.setHelpWindow(this._helpWindow);
};


//-----------------------------------------------------------------------------
//  WINDOW QUEST LIST
//-----------------------------------------------------------------------------

function Window_SuspectList() {
    this.initialize.apply(this, arguments);
}

Window_SuspectList.prototype = Object.create(Window_Selectable.prototype);
Window_SuspectList.prototype.constructor = Window_SuspectList;

Window_SuspectList.prototype.initialize = function(x, y, width, height) {
	recto = new Rectangle(x, y, width, height);
    Window_Selectable.prototype.initialize.call(this, recto);
    this._category = 'none';
    this._data = [];
	this.setBackgroundType(0)
	this.makeItemList();
	this.createContents();
	this.contents.fontSize = Scene_Suspects.fontSize;
    this.drawAllItems();
};

Window_SuspectList.prototype.maxCols = function() {
    return 1;
};

Window_SuspectList.prototype.spacing = function() {
    return 48;
};

Window_SuspectList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_SuspectList.prototype.item = function(index) {
    var index = index == undefined ? this.index() : index;
    return Scene_Suspects.suspects[index] || Scene_Suspects.suspects[0];
};

Window_SuspectList.prototype.makeItemList = function() {
	this._data = [];
	this.buildsuspList();
	this._data = this.buildsuspList(Scene_Suspects.suspects);
};

Window_SuspectList.prototype.buildsuspList = function(suspList) {
	var suspList = suspList || [];
	suspList = suspList.filter(function(n){ return n != undefined });

	return suspList;
};

Window_SuspectList.prototype.drawItem = function(index) {
    var item = this.item(index);
    if (item) {
		var rect = this.itemRect(index);
		rect.width -= this.itemPadding();
        this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
        if(item.condicion && $gameSwitches._data[item.condicion] == null){
            this.drawText('????????????????',rect.x + 40,rect.y,rect.width);
            return;
        }
		var icon = item.icon;
		this.drawIcon(icon,rect.x,rect.y);
		
		this.drawText(item.name,rect.x + 40,rect.y,rect.width);
    }
};

Window_SuspectList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_SuspectList.prototype.setHelpWindowItem = function(item) {
    if (this._helpWindow) {
        this._helpWindow.setItem(item);
    }
};

Window_SuspectList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
	this.contents.fontSize = Scene_Suspects.fontSize;
    this.drawAllItems();
};

//-----------------------------------------------------------------------------
//  WINDOW QUESTINFO
//-----------------------------------------------------------------------------

function Window_SuspectInfo() {
    this.initialize.apply(this, arguments);
}

Window_SuspectInfo.prototype = Object.create(Window_Base.prototype);
Window_SuspectInfo.prototype.constructor = Window_SuspectInfo;

Window_SuspectInfo.prototype.initialize = function(x,y,width,height) {
	recto = new Rectangle(x, y, width, height);
	Window_Base.prototype.initialize.call(this, recto);
	this._suspects = null;
	this.refresh();
};

Window_SuspectInfo.prototype.clear = function() {
	this.setItem();
};

Window_SuspectInfo.prototype.setItem = function(suspect) {
	if (this._suspects !== suspect) {
		this._suspects = suspect;
		this.refresh();
	}
};

Window_SuspectInfo.prototype.refresh = function() {
    this.contents.clear();
	if (this._suspects) {
	    this.drawSuspect(this._suspects);
	} else {
		this.drawNoSuspect();
	}
};

Window_SuspectInfo.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, '#936F3E');
    this.contents.paintOpacity = 255;
};

Window_SuspectInfo.prototype.standardFontSize = function() {
    return Scene_Suspects.fontSize;
};

Window_SuspectInfo.prototype.lineHeight = function() {
    return Scene_Suspects.fontSize + 6;
};

Window_SuspectInfo.prototype.drawSuspect = function(susp) {
    this.changeTextColor('#936F3E');
	this.changeOutlineColor('rgba(0,0,0,0)')
    if(susp.condicion && $gameSwitches._data[susp.condicion] == null){
        var oy = Math.max((28 - this.standardFontSize()) / 2,0);
        this.drawText('?????????',0,oy,this.contentsWidth() - 40);
        var lineY = Math.max(32,this.lineHeight());
	    this.drawHorzLine(lineY);
        return;
    }
	
	// susp heading
	var icon = susp.icon;
	this.drawIcon(icon,0,0);
	var oy = Math.max((28 - this.standardFontSize()) / 2,0);
	this.drawText(susp.name,40,oy,this.contentsWidth() - 40);
	var lineY = Math.max(32,this.lineHeight());
	this.drawHorzLine(lineY);
	
	var line = this.lineHeight();
	var y = lineY + line;
	var w = this.contentsWidth();

    //Face
    y += 10;
    this.drawFace(susp.faceName, susp.faceIndex, 100, y, 144, 144);
	
	// Descrição
	var desc = susp.description || '...';
	y += 154;

	var lines = desc.match(/\n/g) ? desc.match(/\n/g).length : 0;
	this.drawTextEx(desc, 0, y);

	y += line * lines + (line * 2);

};

Window_SuspectInfo.prototype.drawNoSuspect = function() {
	var y = this.contentsHeight() / 2 - 20;
	this.changeTextColor('#936F3E');
	this.changeOutlineColor('rgba(0,0,0,0)')
	this.drawText('Nenhum personagem selecionado',0,y,this.contentsWidth(),'center');
};