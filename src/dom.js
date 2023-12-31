const blueW = require('./images/blue-whale.jpg');
const rightW = require('./images/right-whale.jpg');
const spermW = require('./images/sperm-whale.jpg');
const humpW = require('./images/humpback.jpg');
const orcaW = require('./images/orca.jpg');
const helpers = require('./helpers');

class DOM {
  constructor(container) {
    this.container = container;
  }

  init() {
    const main = this.makeElement('div', [['class', 'game-area']]);
    const player = this.makeElement('div', [['class', 'player-area']]);
    const computer = this.makeElement('div', [['class', 'computer-area']]);
    const pBoardArea = this.makeElement('div', [['class', 'p-board-area']]);
    const pBoardCaption = this.makeElement('div', [['class', 'p-board-caption']], 'Player Board');
    
    const cBoardArea = this.makeElement('div', [['class', 'c-board-area']]);
    const cBoardCaption = this.makeElement('div', [['class', 'c-board-caption']], 'Computer Board');

    const pBoard = this.makeElement('div', [['class', 'player-board'],['id', 'drop-target']]);
    const cBoard = this.makeElement('div', [['class', 'comp-board']]);
    cBoard.append(cBoardCaption);
    const pBoardHead = this.makeElement('div', [['class', 'p-board-head']]);
    for (let n of ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      let num = this.makeElement('span', [['class', 'axis-num']], n);
      pBoardHead.append(num);
    }
    const cBoardHead = this.makeElement('div', [['class', 'c-board-head']]);
    for (let n of ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      let num = this.makeElement('span', [['class', 'axis-num']], n);
      cBoardHead.append(num);
    }
    const pBoardSide = this.makeElement('div', [['class', 'p-board-side']]);
    for (let n of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
      let num = this.makeElement('span', [['class', 'axis-num']], n);
      pBoardSide.append(num);
    }
    const cBoardSide = this.makeElement('div', [['class', 'c-board-side']]);
    for (let n of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
      let num = this.makeElement('span', [['class', 'axis-num']], n);
      cBoardSide.append(num);
    }
    const controls = this.makeElement('div', [['class', 'control-area']]);
    const startButton = this.makeElement('button', [['class', 'start-button']], 'START');
    controls.append(startButton);
    pBoardArea.append(pBoardHead, pBoardSide, pBoard, pBoardCaption, controls);
    cBoardArea.append(cBoardHead, cBoardSide, cBoard);
    const titleArea = this.makeElement('div', [['class', 'title-area']]);
    const title = this.makeElement(
      'span',
      [['class', 'title-text']],
      'BATTLEWHALE',
    );
    titleArea.append(title);
    const compSidebar = this.makeElement('div', [['class', 'comp-sidebar']]);
    const fireControl = this.makeElement('div', [['class', 'fire-control']]);
    const disclaimer = this.makeElement('div', [['class', 'disclaimer']], 'Whales are not to scale');
    const ships = this.makeElement('div', [['class', 'ship-catalog']]);
    const shipsTitle = this.makeElement('h2', [['class', 'ships-title']]);
    shipsTitle.textContent = 'WHALES';
    const blueWhaleDiv = this.makeElement('div', [['class', 'whale-div']]);
    const blueWhale = this.makeElement('img', [
      ['class', 'whale blue-whale-img'],
      ['src', blueW],
    ]);
    const blueWhaleText = this.makeElement('p', [['class', 'whale-text']]);
    blueWhaleText.textContent = 'BLUE -- 5 HITS';
    blueWhaleDiv.append(blueWhale, blueWhaleText);
    const rightWhaleDiv = this.makeElement('div', [['class', 'whale-div']]);

    const rightWhale = this.makeElement('img', [
      ['class', 'whale'],
      ['src', rightW],
    ]);
    const rightWhaleText = this.makeElement('p', [['class', 'whale-text']]);
    rightWhaleText.textContent = 'RIGHT -- 4 HITS';
    rightWhaleDiv.append(rightWhale, rightWhaleText);

    const spermWhaleDiv = this.makeElement('div', [['class', 'whale-div']]);

    const spermWhale = this.makeElement('img', [
      ['class', 'whale'],
      ['src', spermW],
    ]);
    const spermWhaleText = this.makeElement('p', [['class', 'whale-text']]);
    spermWhaleText.textContent = 'SPERM -- 3 HITS';
    spermWhaleDiv.append(spermWhale, spermWhaleText);

    const humpbackDiv = this.makeElement('div', [['class', 'whale-div']]);

    const humpback = this.makeElement('img', [
      ['class', 'whale'],
      ['src', humpW],
    ]);
    const humpbackText = this.makeElement('p', [['class', 'whale-text']]);
    humpbackText.textContent = 'HUMPBACK -- 3 HITS';

    humpbackDiv.append(humpback, humpbackText);
    const orcaDiv = this.makeElement('div', [['class', 'whale-div']]);

    const orca = this.makeElement('img', [
      ['class', 'whale'],
      ['src', orcaW],
    ]);
    const orcaText = this.makeElement('p', [['class', 'whale-text']]);
    orcaText.textContent = 'ORCA -- 2 HITS';
    orcaDiv.append(orca, orcaText);

    ships.append(
      shipsTitle,
      blueWhaleDiv,
      rightWhaleDiv,
      spermWhaleDiv,
      humpbackDiv,
      orcaDiv,
    );

    fireControl.append(ships);
    compSidebar.append(fireControl, disclaimer);
    const shipArea = this.makeElement('div', [['class', 'ship-area']]);
    const bluePiece = this.makeElement('div', [['class', 'ship blue-ship'], ['id', 'blue-whale'], ['draggable', 'true'], ['data-length', '5']]);
    for (let i = 0; i < 5; i++) {
      let dot = this.makeElement('div', [['class', 'ship-dot']]);
      bluePiece.append(dot);
    }

    const rightPiece = this.makeElement('div', [['class', 'ship right-ship'], ['id', 'right-whale'], ['draggable', 'true'], ['data-length', '4']]);
    for (let i = 0; i < 4; i++) {
      let dot = this.makeElement('div', [['class', 'ship-dot']]);
      rightPiece.append(dot);
    }

    const spermPiece = this.makeElement('div', [['class', 'ship sperm-ship'], ['id', 'sperm-whale'], ['draggable', 'true'], ['data-length', '3']]);
    for (let i = 0; i < 3; i++) {
      let dot = this.makeElement('div', [['class', 'ship-dot']]);
      spermPiece.append(dot);
    }

    const humpbackPiece = this.makeElement('div', [['class', 'ship humpback-ship'], ['id', 'humpback-whale'], ['draggable', 'true'], ['data-length', '3']]);
    for (let i = 0; i < 3; i++) {
      let dot = this.makeElement('div', [['class', 'ship-dot']]);
      humpbackPiece.append(dot);
    }

    const orcaPiece = this.makeElement('div', [['class', 'ship orca-ship'], ['id', 'orca-whale'], ['draggable', 'true'], ['data-length', '2']]);
    for (let i = 0; i < 2; i++) {
      let dot = this.makeElement('div', [['class', 'ship-dot']]);
      orcaPiece.append(dot);
    }

    shipArea.append(bluePiece, rightPiece, spermPiece, humpbackPiece, orcaPiece);
    const playerSidebar = this.makeElement('div', [
      ['class', 'player-sidebar'],
    ]);
    const hitPieces = this.makeElement('div', [['class', 'hit-pieces']]);
    for (let i = 0; i < 36; i++) {
      let piece = this.makeElement('div', [['class', 'hit-piece']]);
      hitPieces.append(piece);
    }
    const missPieces = this.makeElement('div', [['class', 'miss-pieces']]);
    for (let i = 0; i < 72; i++) {
      let piece = this.makeElement('div', [['class', 'miss-piece']]);
      missPieces.append(piece);
    }
    const noHarm = this.makeElement('div', [['class', 'no-harm']], 'No whales were harmed in the making of this game.');
    const messageArea = this.makeElement('div', [['class', 'message-area']]); 
    const line1 = this.makeElement('span', [['class', 'message-1']], 'Drag your whales onto the Player Board and click START to start the game.');
    const line2 = this.makeElement('span', [['class', 'message-2']], 'Click the whale to rotate it.');
    messageArea.append(line1, line2);

    const quoteDiv = this.makeElement('div', [['class', 'quote-div']]);
    const quoteText = 'There is, one knows not what sweet mystery about this sea, whose gently awful stirrings seem to speak of some hidden soul beneath. -- Herman Melville';
    const quote = this.makeElement('h3', [['class', 'quote-text']], quoteText);
    quoteDiv.append(quote);
    const copyright = this.makeElement('span', [['class', 'img-copyright']]);
    const copyrightLinkText =
      'https://ocean.si.edu/ocean-life/marine-mammals/what-largest-whale-cetacea-size-comparison-chart';
    const copyrightLink = this.makeElement(
      'a',
      [
        [
          'href',
          'https://ocean.si.edu/ocean-life/marine-mammals/what-largest-whale-cetacea-size-comparison-chart',
        ],
      ],
      copyrightLinkText,
    );
    const copyrightText =
      'Whale images are used subject to usage conditions from the Smithsonian Institution:';
    const copyTextDiv = this.makeElement(
      'div',
      [['class', 'copy-text']],
      copyrightText,
    );

    copyright.append(copyTextDiv, copyrightLink);

    playerSidebar.append(hitPieces, missPieces);
    computer.append(titleArea, cBoardArea, compSidebar);
    player.append(shipArea, pBoardArea, playerSidebar);

    main.append(computer, player, noHarm);
    this.container.append(main, messageArea, quoteDiv, copyright);
  }

  makeElement(type, attributes, text) {
    const element = document.createElement(type);
    for (let attribute of attributes) {
      let [name, val] = attribute;
      element.setAttribute(name, val);
    }
    element.textContent = text;
    return element;
  }

  makeBoard(board, area) {
    const boardSquare = `${board.name.toLowerCase()}-square`;
    for (let row of board.board) {
      const rowDiv = this.makeElement('div', [['class', 'row']]);
      area.append(rowDiv);
      for (let col of row) {
        const btn = this.makeElement('button', [['class', `grid-button ${boardSquare}`], ['data-grid-number', `[${board.board.indexOf(row)},${row.indexOf(col)}]`]]);
        rowDiv.append(btn);
      }
    }
  }

  changeMessage(one, two) {
    const line1 = document.querySelector('.message-1');
    const line2 = document.querySelector('.message-2');
    line1.textContent = one;
    line2.textContent = two;
  }

  appendDot(x, y, outcome, name) {
    name = name.toLowerCase();
    const button = helpers.getButton(x, y, name);
    const className = `${outcome}-piece`;
    const piece = this.makeElement('div', [['class', className]]);
    if (button.firstChild && button.firstChild.classList.contains('ship')) {
      button.firstChild.firstChild.append(piece);
    } else {
      button.appendChild(piece);
    }
  }
}

module.exports = DOM;
