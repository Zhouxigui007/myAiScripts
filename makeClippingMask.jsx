// Creates a rectangle that fits Illustrator Artboard

/* Creates GUI ******************************************************/
// Creates Dialogue Box
var dlg = new Window('dialog', 'Clipping Mask Target');
dlg.alignChildren = 'left';
dlg.spacing = 2;

// Clipping Target
var options = dlg.add('group', undefined, 'Clipping Target');  
options.alignChildren = 'left';  
options.orientation = 'row';

var artboardoption = options.add('radiobutton', undefined, 'Artboard' );
artboardoption.helpTip = 'Clips to artboard.';
artboardoption.value = true;

var bleedoption = options.add('radiobutton', undefined, 'Bleeding Edge' );
bleedoption.helpTip = 'Clips to bleeding edge.';

// Bleed Panel
var bl = dlg.add('panel', undefined, 'Bleed Edge');  
bl.alignChildren = 'left';  
bl.orientation = 'row';

var bleedtext = bl.add('statictext',undefined,'Bleed:');  
var bleedvalue = bl.add('edittext',undefined,'0'); 
bleedvalue.characters = 5;

// Measurement Panel
var mes = dlg.add('panel', undefined, 'Measurement');
mes.alignChildren = 'left';  
mes.orientation = 'row';

var pxoption = mes.add('radiobutton', undefined, 'px' );
pxoption.helpTip = 'Clips to artboard.';
pxoption.value = true;

var inoption = mes.add('radiobutton', undefined, 'in' );
inoption.helpTip = 'Clips to bleeding edge.';

var mmoption = mes.add('radiobutton', undefined, 'mm' );
mmoption.helpTip = 'Clips to bleeding edge.';


// User Response
var buttons = dlg.add('group');
buttons.alignChildren = 'center';  
buttons.margins = [0,10,0,0]; 
var cancel = buttons.add('button',undefined,"Cancel");
var ok = buttons.add('button',undefined,"OK");  

/********************************************************************/

// Ok Button
ok.onClick = function() {
    if(artboardoption.value == true) {
        draw(0);
    } else {
        var str = bleedvalue.text;
        var num = parseInt(str.split(' ')[0], 10);
        if (inoption.value) {                      // Inches
            var bleed = num * 72;
        } else if (mmoption.value) {               // Millimeters
            var bleed = num * 2.83466796875;
        } else if (pxoption.value) {               // px or none
            var bleed = num;
        }
        draw(bleed);
    }
    var myDoc = app.activeDocument;

    // Select All
    myDoc.selectObjectsOnActiveArtboard();

    var selection = myDoc.selection;
    var groupItem = myDoc.groupItems.add();
    var count = selection.length;
    for(var i = 0; i < count; i++) {
        item = selection[i];
        item.move( groupItem, ElementPlacement.PLACEATEND);
    }

    // Clip
    groupItem.clipped = true;

    dlg.close();
}

// Cancel Button 
cancel.onClick = function() {
    dlg.close();
}

function draw(bleed) {
    // Generic Illustrator Target
    var myDoc = app.activeDocument;
    var ab = myDoc.artboards;

	for(i=0;i<ab.length;i++){  
		// Set Point Positions
		var top    = ab[i].artboardRect[1];
		var left   = ab[i].artboardRect[0];
		var width  = ab[i].artboardRect[2]-ab[i].artboardRect[0];
		var height = ab[i].artboardRect[1]-ab[i].artboardRect[3];

		// Create Rectangle
		var rect   = myDoc.pathItems.rectangle (top + bleed, left - bleed, width + (bleed * 2), height + (bleed * 2));

		// Clear Rectangle
		rect.fillColor = rect.strokeColor = new NoColor();  
	}  
}

// Show Dialogue 
dlg.show();
