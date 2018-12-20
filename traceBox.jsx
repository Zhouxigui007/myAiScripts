// Finishing Touches to Layout
var idoc = app.activeDocument;

// Create Rectangle
var r = idoc.artboards[idoc.artboards.getActiveArtboardIndex()].artboardRect;
var rect = idoc.pathItems.rectangle(r[1], r[0], r[2]-r[0], r[1]-r[3]);

// Change Color
var black = new RGBColor("0,0,0");
var none = new NoColor();
rect.fillColor = none;
rect.strokeColor = black;
rect.strokeWidth = 3;

// Change Artboard
var inch = 72;         // 1 inch = 72 pts
var adjustment = 0.25; // Currently adding 1/4 inch all around

var artboard = idoc.artboards[0].artboardRect;
  
var myVisibleBounds = idoc.geometricBounds; //Rect, which is an array;  
  
myVisibleBounds[0] -= adjustment * inch; // Left coordinate (use negative values to add artboard)  
myVisibleBounds[1] += adjustment * inch; // Top coordinate  
myVisibleBounds[2] += adjustment * inch; // Right coordinate  
myVisibleBounds[3] -= adjustment * inch; // Bottom coordinate (use negative values to add artboard)  
  
idoc.artboards[0].artboardRect = myVisibleBounds;

// Spell Check
app.executeMenuCommand('Check Spelling');
