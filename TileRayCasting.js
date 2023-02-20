class Tile {
    constructor(x, y, area) {
      this.x = x;
      this.y = y;
      this.area = area;
      this.colour = color(255);
      this.alph = 127;
    }
    
    show() {
      this.colour.setAlpha(this.alph);
      fill(this.colour);
      rect(this.x, this.y, this.area, this.area);
    }
}
  
  
var TileMap = {
    tiles: NaN,
    
    createTileMap: function (cols, rows, area, xOff, yOff) {
      this.tiles = new Array(rows);
      this.cols = cols;
      this.rows = rows;
      
      for (y = 0; y < rows; y++) {
        this.tiles[y] = new Array(cols);
        
        for (x = 0; x < cols; x++) {
          let xPos = x * area + xOff;
          let yPos = y * area + yOff;
          this.tiles[y][x] = new Tile(xPos, yPos, area);
        }
      }
    },
    
    setVertWall: function(x, y, a, b, l) {
      if (x === a && y > b && y < l) {
        this.tiles[y][x].colour = wall;
      }
    },
    
    setHorzWall: function(x, y, a, b, l) {
      if (y === a && x > b && x < l) {
        this.tiles[y][x].colour = wall;
      }
    },
    
    show: function() {
      for (const r of this.tiles) {
        for (const tile of r) { tile.show(); }
      }
    }
}
  
  
var wall;
var tileFloor;
var playerColor;
var player = {x: 10, y: 10};
var last = {x: 10, y: 10};
  
var leftPress = false;
var rightPress = false;
var upPress = false;
var downPress = false;
  
  
function setup() {
    let canvas = createCanvas(1000, 700);
    canvas.parent('p5canvas'); // send p5.js canvas into div
    
    TileMap.createTileMap(30, 20, 30, 50, 50);
    
    wall = color(150);
    tileFloor = color(50);
    playerColor = color(0, 100, 255);
    
    for (y = 0; y < TileMap.rows; y++) {
      for (x = 0; x < TileMap.cols; x++) {
        TileMap.setHorzWall(x, y, 4, 5, 15);
        TileMap.setHorzWall(x, y, 1, 23, 29);
        TileMap.setVertWall(x, y, 4, 3, 15);
        TileMap.setVertWall(x, y, 16, 3, 15);
        TileMap.setVertWall(x, y, 8, 12, 18);
        TileMap.setVertWall(x, y, 12, 12, 18);
        TileMap.setVertWall(x, y, 28, 1, 6);
      }
    }
    
    TileMap.tiles[player.y][player.x].colour = playerColor;
}
  
function draw() {
    background(0);
    
    // Refresh tile colour and alpha
    for (y = 0; y < TileMap.rows; y++) {
      for (x = 0; x < TileMap.cols; x++) {
        let t = TileMap.tiles[y][x];
        t.alph = 127;
        TileMap.setHorzWall(x, y, 4, 5, 15);
        TileMap.setHorzWall(x, y, 1, 23, 29);
        TileMap.setVertWall(x, y, 4, 3, 15);
        TileMap.setVertWall(x, y, 16, 3, 15);
        TileMap.setVertWall(x, y, 8, 10, 18);
        TileMap.setVertWall(x, y, 12, 10, 18);
        TileMap.setVertWall(x, y, 28, 1, 6);
        
        if (t.colour !== wall) {
          t.colour = tileFloor;
        }
      }
    }
    
    if (leftPress)  { player.x -= 0.3; }
    if (rightPress) { player.x += 0.3; }
    if (upPress)    { player.y -= 0.3; }
    if (downPress)  { player.y += 0.3; }
    
    if (player.x < 0) { player.x = 0;}
    if (player.y < 0) { player.y = 0;}
    if (player.x >= TileMap.cols) { player.x = TileMap.cols-1;}
    if (player.y >= TileMap.rows) { player.y = TileMap.rows-1;}
    
    
    // Wall Collision
    for (y = 0; y < TileMap.rows; y++) {
      for (x = 0; x < TileMap.cols; x++) {
        let t = TileMap.tiles[y][x];
        
        if (t.colour === wall) {
          if (int(player.x) == x && int(player.y) == y) {
            player.x = last.x;
            player.y = last.y;
          }
        }
      }
    }
    
    last.x = int(player.x);
    last.y = int(player.y);
    
    let rays = 256; // Cast a lot of rays as a bruteforce way to prevent dark gaps appearing on walls
    for (r = 0; r < rays; r++) {
      let d = dirVec((PI * r) / (rays/2));
      for (i = 0; i < 8; i++) {
        let x = round(d.x * i);
        let y = round(d.y * i);
        let tileX = int(x + player.x);
        let tileY = int(y + player.y);
        
        let rightLim = TileMap.cols - 1;
        let bottomLim = TileMap.rows - 1;
        let topLeft = tileX < 0 || tileY < 0;
        
        let right = tileX > rightLim;
        let bottom = tileY > bottomLim;
        let btmRight = right || bottom;
        
        if (topLeft || btmRight) { break; }
        
        let t = TileMap.tiles[tileY][tileX];
        let fade = i * 10;
        if (t.colour === wall) {
          t.alph = 255 - fade;
          break;
        } else t.alph = 255 - fade;
      }
    }
    
    let playerTile = TileMap.tiles[int(player.y)][int(player.x)];
    playerTile.colour = playerColor;
    playerTile.alph = 255;
    
    TileMap.show();  
}
  
function keyPressed() {
    switch(keyCode) {
      case LEFT_ARROW:
        leftPress = true;
        break;
      case RIGHT_ARROW:
        rightPress = true;
        break;
      case UP_ARROW:
        upPress = true;
        break;
      case DOWN_ARROW:
        downPress = true;
        break;
    }
}
  
function keyReleased() {
    switch(keyCode) {
      case LEFT_ARROW:
        leftPress = false;
        break;
      case RIGHT_ARROW:
        rightPress = false;
        break;
      case UP_ARROW:
        upPress = false;
        break;
      case DOWN_ARROW:
        downPress = false;
        break;
    }
}
  
function dirVec(angle) {
    let dirX = sin(angle);
    let dirY = cos(angle);
    
    return { x: dirX, y: dirY };
}