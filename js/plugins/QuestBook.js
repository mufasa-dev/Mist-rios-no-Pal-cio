/*:
* @plugindesc Quest Book
* @autor Mufasa
* @help Se vira
*/

var Imported = Imported || {};
Imported.QuestBook = true;

var Scene_Quest = Scene_Quest || {}; 

(function() {
	//nw.Window.get().showDevTools();

	Scene_Quest.file = {};
	Scene_Quest.file.getQuests = function() {
	let qs = [
		{
			id: 1,
			type: 'talk',
			title: 'Tédio',
			icon: '28',
			description: 'Pergunte ao Mestre se tem \nalgo que você possa fazer\npara ajudar a resolver o\nmistério.',
			descriptionFinish: 'O Mestre pediu para eu\nandar pelo castelo e\nprocurar pistas igual aos\ndetetives de verdade.\nEu vou encontrar o traidor\ne resolver esse mistério.',
			category : 1
		},
		{
			id: 2,
			type: 'talk',
			title: 'Cozinha',
			icon: '156',
			description: 'Vá para a cozinha e\npergunte aos funcionários\nse viram algo suspeito.',
			descriptionFinish: 'Conversei com o Cozinheiro\ne confirmei que não foi ele.\nE aparentemente também não\nfoi nenhum funcionário da\ncozinha.',
			category : 1
		},
		{
			id: 3,
			type: 'item',
			condition: [
				{
					item: 3,
					qtd: 10
				},
				{
					item: 4,
					qtd: 20
				}
			],
			title: 'Sopa',
			icon: '261',
			description: 'Ajude o slime cozinheiro\na preparar uma sopa.\nAnde pelo castelo e\nencontre alguns\ningredientes.',
			descriptionFinish: 'Encontrei todos os\ningredientes e o cozinheiro\nme deu umas moedas como\npagamento.',
			category : 1
		},
		{
			id: 4,
			type: 'talk',
			title: 'Mordomo',
			icon: '159',
			description: 'Encontre o Mordomo e\npergunte se ele é o cupado.',
			descriptionFinish: 'Conversei com o Mordomo e\npor incrível que pareça\nele não é o cupado.\nPelo menos foi o que ele me disse.',
			category : 1
		},
		{
			id: 5,
			type: 'talk',
			title: 'Sentinelas',
			icon: '128',
			description: 'Fale com o sentinela e\npergunte se alguém suspeito\nentrou ou saiu do castelo\nultimamente.',
			descriptionFinish: 'O sentinela me disse que\nficou vigiando sempre e que\nninguém suspeito entrou sem\nautorização no castelo.',
			category : 1
		},
		{
			id: 6,
			type: 'talk',
			title: 'Avise o Rei',
			icon: '155',
			description: 'Conte ao rei o que você\ndescobriu até agora.\nQue o traidor é alguém\nde dentro do castelo.',
			descriptionFinish: 'Falei com o Careca e ele\nme disse que já sabia de\ntudo o que eu disse pra ele.\nO Rei seria um bom detetive.',
			category : 1
		},
		{
			id: 7,
			type: 'item',
			icon: '195',
			condition: [
				{
					item: 2,
					qtd: 1
				}
			],
			title: 'O quarto do Rei',
			description: 'Sinto que o rei está\nescondendo algo importante.\nTalvez encontre alguma\ncoisa no quarto dele.\nMas preciso da chave para\nentrar.',
			descriptionFinish: 'Vasculhei o quarto inteiro\nmas não achei nada\nde interessante.\nAcho que o Rei não é um\nsuspeito afinal.',
			category : 1
		},
		{
			id: 8,
			type: 'item',
			icon: '172',
			condition: [
				{
					item: 2,
					qtd: 1
				}
			],
			title: 'Slime Voador',
			description: '...',
			descriptionFinish: '...',
			category : 1
		},
		{
			id: 9,
			type: 'gold',
			condition: [
				{
					qtd: 500
				}
			],
			title: 'Uma espada',
			icon: '96',
			description: 'Para entrar no calabouço\nvocê precisa de uma espada.\nO Soldado disse que te\nvende uma por 500 moedas.',
			descriptionFinish: 'Comprei uma espada.\nAgora posso enfrentar as\n"abeias" do mal sem medo.',
			category : 1
		},
		{
			id: 10,
			type: 'gold',
			condition: [
				{
					qtd: 1000
				}
			],
			title: 'Um capacete',
			icon: '131',
			description: 'O soldado disse que se\neu conseguir mais 1000\nmoedas ele me vendia\num capacete.',
			descriptionFinish: 'Comprei o tal capacete.\nAgora me sinto mais protegido.',
			category : 1
		},
		{
			id: 11,
			type: 'talk',
			title: 'O calabouço',
			icon: '51',
			description: 'Deça até o calabouço e\nconverse com os caras maus \ne pergunte se sabem de\nalgo.',
			descriptionFinish: 'Conheci um goblin super\nlegal chamado Globerto no\ncalabouço. Ele me\najudou a descobrir quem é\no traidor.',
			category : 1
		},
		{
			id: 12,
			type: 'var',
			condition: [
				{
					id: 60,
					qtd: 20,
					icon: 249
				}
			],
			title: 'Abelhas',
			icon: '249',
			description: 'Ajude os soldados do\ncalabouço a se livrarem\nde algumas abelhas.',
			descriptionFinish: 'Matei todas as "abeias" do\nlugar.\nAgora fica mais facil subir\ne descer.',
			category : 1
		},
		{
			id: 13,
			type: 'item',
			condition: [
				{
					item: 5,
					qtd: 5
				},
				{
					item: 6,
					qtd: 12
				}
			],
			title: 'Comida',
			icon: '262',
			description: 'Ajude o soldado amarelo\na preparar o almoço.\nAnde pelo castelo e\nencontre alguns\ningredientes.',
			descriptionFinish: 'Encontrei todos os\ningredientes e o soldado\nme deu umas moedas como\npagamento.',
			category : 1
		},
		{
			id: 14,
			type: 'talk',
			title: 'O traidor',
			icon: '316',
			description: 'Volte para o palácio\ne informe o pessoal\nquem é o traidor.',
			descriptionFinish: 'O Mestre e o Cyber viraram\npedra.\nMas avisei o professor que \no traidor é o Mordomo.',
			category : 1
		},
		{
			id: 15,
			type: 'var',
			condition: [
				{
					id: 59,
					qtd: 1,
					icon: 159
				}
			],
			title: 'Batalha',
			icon: '159',
			description: 'Derrote o Mordomo e\nsalve os slimes que\nviraram pedra.',
			descriptionFinish: 'Fim.',
			category : 1
		}
	]
	Scene_Quest.txt = qs;
};

Scene_Quest.fileName = function() {
	Scene_Quest.file.getQuests();
}();


// Options
Scene_Quest.fontSize = 22;

//-----------------------------------------------------------------------------
// FUNCIONALIDADES
//-----------------------------------------------------------------------------

// remover quests
Scene_Quest.removeQuest = function(id) {
	if ($gameSystem._quests.quest[id]) {
		Scene_Quest.sliceArray($gameSystem._quests.active,id);
		Scene_Quest.sliceArray($gameSystem._quests.completed,id);
		$gameSystem._quests.quest[id]._status = -1;
	}
};

Scene_Quest.sliceArray = function(array,element) {
	var index = array.indexOf(element);
	if (index > -1) {
    	array.splice(index, 1);
	}
};

// criar quest se não existir
Scene_Quest.create = function(id) {
	if (!$gameSystem._quests.quest[id] && Scene_Quest.txt[id]) {
		Scene_Quest.removeQuest(id);
		$gameSystem._quests.quest[id] = new Game_Quest(id);
	}
};

Scene_Quest.convStatus = {
	0: 'active',
	1: 'completed',
	'-1': 'hidden',
	'hide': -1,
	'active': 0,
	'activate': 0,
	'completed': 1,
	'complete': 1,
};

Scene_Quest.put = function(id,status) {
	var status = status || 0;
	var place = Scene_Quest.convStatus[status];

	if (status != 0) $gameSystem._quests.tracked = null;
	if ($gameSystem._quests.quest[id]) {
		Scene_Quest.removeQuest(id);          
		$gameSystem._quests[place].unshift(id);
		$gameSystem._quests.quest[id]._status = status;  
	}
};

Scene_Quest.complete = function(id,showNotify) {
	Scene_Quest.create(id);
	Scene_Quest.put(id,1);
	if(showNotify) Scene_Quest.popup(id,1);
};

Scene_Quest.start = function(id, showNotify) {
	Scene_Quest.create(id);
	Scene_Quest.put(id,0);
	if(showNotify) Scene_Quest.popup(id,0);
};

Scene_Map.prototype.createQuestWindow = function(id, status) {
    const rect = this.questWindowRect();
    this._questWindow = new Window_QuestName(rect, id, status);
    this.addWindow(this._questWindow);
	this._questWindow.open();
};

Scene_Map.prototype.questWindowRect = function() {
    const wx = -110;
    const wy = -60;
    const ww = 360;
    const wh = 120;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.popup = function(id,status) {
	SceneManager._scene.createQuestWindow(id, status);
};

Scene_Quest.objective = function(id,objId,status,hidePopup) {
	Scene_Quest.create(id);
	if (isNaN(status)) var status = Scene_Quest.convStatus[status];
	
	if ($gameSystem._quests.quest[id]) {
		$gameSystem._quests.quest[id]._objectives[objId] = status;
		if (!hidePopup) Scene_Quest.popup(id,status,objId);
	}
};

Scene_Quest.track = function(id) {
	if ($gameSystem._quests.quest[id] && $gameSystem._quests.quest[id]._status == 0) {
		$gameSystem._quests.tracked = id;
	} else {
		$gameSystem._quests.tracked = null;
	}
};

Scene_Quest.isTracked = function() {
	return $gameSystem._quests.tracked || 0;
};

Scene_Quest.status = function(id,obj) {
	if ($gameSystem._quests.quest[id]) {
		if (obj != undefined) {
			return $gameSystem._quests.quest[id]._objectives[obj];
		} else {
			return $gameSystem._quests.quest[id]._status;
		}
	} else {
		return -1;
	}
};

Scene_Quest.resolution = function(id,index) {
	if ($gameSystem._quests.quest[id]) $gameSystem._quests.quest[id]._resolution = index;
};

Scene_Quest.viewLog = function() {
	SceneManager.push(Scene_QuestBook);
};



Scene_Quest.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Scene_Quest.Game_System_initialize.call(this);
	this._quests = {
		tracked: null,
		quest: {},       
		active: [],       
		completed: [],    
	};
};

})();



function Game_Quest() {
    this.initialize.apply(this, arguments);
}

Game_Quest.prototype.initialize = function(id,cat) {
	this._id = id;
	this._cat = cat || 0;
	this._objectives = []; 
	this._resolution = -1; 
	this._status = 0;      
};

Game_Quest.prototype.desc = function() {
	return Scene_Quest.txt[this._id].description;  
};

Game_Quest.prototype.descFinish = function() {
	return Scene_Quest.txt[this._id].descriptionFinish;  
};

Game_Quest.prototype.getTitle = function() {
	return Scene_Quest.txt[this._id].title;
};

Game_Quest.prototype.getIcon = function() {
	return Scene_Quest.txt[this._id].icon;
};

Game_Quest.prototype.getType = function() {
	return Scene_Quest.txt[this._id].type;
};

Game_Quest.prototype.getCondition = function() {
	return Scene_Quest.txt[this._id].condition;
};

Game_Quest.prototype.category = function() {
	return Scene_Quest.txt[this._id].category;
};

Game_Quest.prototype.objectives = function() {
	var array = Scene_Quest.txt[this._id].description;
	return array[0].length <= 1 ? [] : array;
};

Game_Quest.prototype.resolutions = function() {
	var array = Scene_Quest.txt[this._id].description;
	return array[0].length <= 1 ? [] : array;
};

Game_Quest.prototype.hasResolution = function() {
	return this._resolution >= 0;
};


//-----------------------------------------------------------------------------
//  SCENE QUESTLOG
//-----------------------------------------------------------------------------

function Scene_QuestBook() {
    this.initialize.apply(this, arguments);
}

Scene_QuestBook.prototype = Object.create(Scene_ItemBase.prototype);
Scene_QuestBook.prototype.constructor = Scene_QuestBook;

Scene_QuestBook.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_QuestBook.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createQuestListWindow();
    this.createInfoWindow();
};

Scene_QuestBook.prototype.createBackground = function(){
	var sprite = new Sprite();
	sprite.bitmap = ImageManager.loadPicture("book");
	var sprite2 = new Sprite();
	sprite2.bitmap = ImageManager.loadPicture("book-tasks");
	this.addChild(sprite);
	this.addChild(sprite2);
};

Scene_QuestBook.prototype.createQuestListWindow = function() {
	var ww = Graphics.boxWidth / 2;
	var wh = Graphics.boxHeight - 105
	var wy = 0;
	this._itemWindow = new Window_QuestList(-20, 65, ww, wh);
	this._itemWindow.updateBackOpacity(150)
	this._itemWindow.opacity = 0;
	//this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
	this._itemWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._itemWindow);
	this._itemWindow.activate();
	this._itemWindow.select(0);
};

Scene_QuestBook.prototype.createInfoWindow = function() {
	var width = Graphics.boxWidth / 2 - 20;
	var height = this._itemWindow.height + 40;
	var x = this._itemWindow.x + this._itemWindow.width + 60;
	this._helpWindow = new Window_QuestInfo(x,20,width,height);
	this._helpWindow.opacity = 0;
	this.addWindow(this._helpWindow);
	
	this._itemWindow.setHelpWindow(this._helpWindow);
	//this._categoryWindow.setHelpWindow(this._helpWindow);
};


//-----------------------------------------------------------------------------
//  WINDOW QUEST LIST
//-----------------------------------------------------------------------------

function Window_QuestList() {
    this.initialize.apply(this, arguments);
}

Window_QuestList.prototype = Object.create(Window_Selectable.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;

Window_QuestList.prototype.initialize = function(x, y, width, height) {
	recto = new Rectangle(x, y, width, height);
    Window_Selectable.prototype.initialize.call(this, recto);
    this._category = 'none';
    this._data = [];
	this.setBackgroundType(0)
	this.makeItemList();
	this.createContents();
	this.contents.fontSize = Scene_Quest.fontSize;
    this.drawAllItems();
};

Window_QuestList.prototype.maxCols = function() {
    return 1;
};

Window_QuestList.prototype.spacing = function() {
    return 48;
};

Window_QuestList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_QuestList.prototype.item = function(index) {
    var index = index == undefined ? this.index() : index;
	var obj = isNaN(this._data[index]) ? this._data[index] : $gameSystem._quests.quest[this._data[index]];

    return this._data && index >= 0 ? obj : null;
};

Window_QuestList.prototype.makeItemList = function() {
	this._data = [];
	this.buildQuestList();
	this._data = this.buildQuestList($gameSystem._quests.active.concat($gameSystem._quests.completed));
};

Window_QuestList.prototype.buildQuestList = function(questList) {
	var questList = questList || [];
	questList = questList.filter(function(n){ return n != undefined });

	return questList;
};

Window_QuestList.prototype.drawItem = function(index) {
    var item = this.item(index);
    if (item) {
		var rect = this.itemRect(index);
		rect.width -= this.itemPadding();
		var icon = item._status == 1 ? 32 : item.getIcon();
		this.drawIcon(icon,rect.x,rect.y);
		this.changeTextColor('#936F3E');
		if(item._status == 1){
			var lineY = rect.y + this.lineHeight() / 2 - 1;
			this.contents.paintOpacity = 255;
			this.contents.fillRect(40, lineY, item.getTitle().length * 12, 2, '#936F3E');
		}
		this.changeOutlineColor('rgba(0,0,0,0)')
		this.drawText(item.getTitle(),rect.x + 40,rect.y,rect.width);
    }
};

Window_QuestList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_QuestList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
	this.contents.fontSize = Scene_Quest.fontSize;
    this.drawAllItems();
};

//-----------------------------------------------------------------------------
//  WINDOW QUESTINFO
//-----------------------------------------------------------------------------

function Window_QuestInfo() {
    this.initialize.apply(this, arguments);
}

Window_QuestInfo.prototype = Object.create(Window_Base.prototype);
Window_QuestInfo.prototype.constructor = Window_QuestInfo;

Window_QuestInfo.prototype.initialize = function(x,y,width,height) {
	recto = new Rectangle(x, y, width, height);
	Window_Base.prototype.initialize.call(this, recto);
	this._quest = null;
	this.refresh();
};

Window_QuestInfo.prototype.clear = function() {
	this.setItem();
};

Window_QuestInfo.prototype.setItem = function(quest) {
	if (this._quest !== quest) {
		this._quest = quest;
		this.refresh();
	}
};

Window_QuestInfo.prototype.refresh = function() {
    this.contents.clear();
	if (this._quest) {
	    this.drawQuest(this._quest);
	} else if ($gameSystem._quests.tracked) {
		this.drawQuest($gameSystem._quests.quest[$gameSystem._quests.tracked]);
	} else {
		this.drawNoQuest();
	}
};

Window_QuestInfo.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, '#936F3E');
    this.contents.paintOpacity = 255;
};

Window_QuestInfo.prototype.standardFontSize = function() {
    return Scene_Quest.fontSize;
};

Window_QuestInfo.prototype.lineHeight = function() {
    return Scene_Quest.fontSize + 6;
};

Window_QuestInfo.prototype.drawQuest = function(quest) {
	if (quest.categoryTitle != undefined) return;
	this.changeTextColor('#936F3E');
	this.changeOutlineColor('rgba(0,0,0,0)')
	// quest heading
	var icon = quest.getIcon();
	this.drawIcon(icon,0,0);
	var oy = Math.max((28 - this.standardFontSize()) / 2,0);
	this.drawText(quest.getTitle(),40,oy,this.contentsWidth() - 40);
	var lineY = Math.max(32,this.lineHeight());
	this.drawHorzLine(lineY);
	
	var line = this.lineHeight();
	var y = lineY + line;
	var w = this.contentsWidth();
	
	// Descrição
	var desc = quest.desc();
	var descFinish = quest.descFinish();
	var type = quest.getType();
	var condition = quest.getCondition();
	y += 10;

	var lines = desc.match(/\n/g) ? desc.match(/\n/g).length : 0;
	this.drawTextEx(desc, 0, y);

	y += line * lines + (line * 2);
	// Se for item
	if(type == 'item'){
		y += line;
		for(let i = 0;i < condition.length;i++){
			y -= line;
			let iconItem = $dataItems.find(x => x && x.id == condition[i].item).iconIndex;
			let myItens = $gameParty._items[condition[i].item] || 0;
			let reqItem = condition[i].qtd;
			if(quest._status == 1){
				myItens = reqItem;
			}
			this.drawIcon(iconItem,0,y);
			this.drawTextEx(myItens + '/' + reqItem,40,y + oy);
			y += line * 2 + 5;
		}
	}

	if(type == 'gold'){
		let iconItem = 314;
		let myGold = $gameParty._gold;
		let reqGold = condition[0].qtd;
		if(quest._status == 1){
			myGold = reqGold;
		}
		this.drawIcon(iconItem,0,y);
		this.drawTextEx(myGold + '/' + reqGold,40,y + oy);
		y += line * 2 + 5;
	}

	if(type == 'var'){
		let myVars = $gameVariables._data[condition[0].id] || 0; 
		let reqQtd = condition[0].qtd;
		this.drawIcon(condition[0].icon,0,y);
		this.drawTextEx(myVars + '/' + reqQtd,40,y + oy);
		y += line * 2 + 5;
	}

	if(quest._status == 1){
		this.changeTextColor('#936F3E');
		this.changeOutlineColor('rgba(0,0,0,0)')
		this.drawIcon(32,0,y);
		this.drawText('Conclusão',40,y,w);
		this.drawHorzLine(lineY + y);
		y += line * 2;
	
		this.drawTextEx(descFinish,0,y);
		y += line * lines + line;
	}
};

Window_QuestInfo.prototype.drawNoQuest = function() {
	var y = this.contentsHeight() / 2 - 20;
	this.changeTextColor('#936F3E');
	this.changeOutlineColor('rgba(0,0,0,0)')
	this.drawText('Nenhuma tarefa selecionada',0,y,this.contentsWidth(),'center');
};

//-----------------------------------------------------------------------------
// Window_QuestName
//-----------------------------------------------------------------------------

function Window_QuestName() {
    this.initialize(...arguments);
}

Window_QuestName.prototype = Object.create(Window_Base.prototype);
Window_QuestName.prototype.constructor = Window_QuestName;

Window_QuestName.prototype.initialize = function(rect, id, status) {
    Window_Base.prototype.initialize.call(this, rect);
	this._quest = Scene_Quest.txt[id];
	this._quest.status = status;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.refresh();
};

Window_QuestName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._showCount > 0 && $gameMap.isNameDisplayEnabled()) {
        this.updateFadeIn();
        this._showCount--;
    } else {
        this.updateFadeOut();
    }
};

Window_QuestName.prototype.updateFadeIn = function() {
    this.contentsOpacity += 16;
};

Window_QuestName.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 16;
	if(this.contentsOpacity <= 0){
		this.hide();
	}
};

Window_QuestName.prototype.open = function() {
	this.show();
    this.refresh();
    this._showCount = 150;
};

Window_QuestName.prototype.close = function() {
    this._showCount = 0;
	this.hide();
};

Window_QuestName.prototype.refresh = function() {
    this.contents.clear();
	const width = this.innerWidth;
	this.drawBackground(0, 0, width, this.lineHeight() * 2);
	if(this._quest.status == 0){
		this.changeTextColor('#65ADD6')
		this.drawText('Nova tarefa', 20, 0, width, "left");
	}else{
		this.changeTextColor('#88BE52')
		this.drawText('Tarefa concluída', 20, 0, width, "left");
	}
	
	this.drawIcon(this._quest.icon,20,this.lineHeight());
	this.changeTextColor('#ffffff')
	this.drawText(this._quest.title, 60, this.lineHeight(), width, "left");
};

Window_QuestName.prototype.drawBackground = function(x, y, width, height) {
    const color1 = ColorManager.dimColor1();
    const color2 = ColorManager.dimColor2();
    const half = width / 2;
    this.contents.gradientFillRect(x, y, half, height, color2, color1);
    this.contents.gradientFillRect(x + half, y, half, height, color1, color2);
};