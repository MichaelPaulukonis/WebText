$(document).ready(function() {

//    http://www.devirtuoso.com/2009/08/3d-flying-text-in-jquery/

//Setup Arrays that will hold the x,y,z of each element.
var x = new Array();
var y = new Array();
var z = new Array();

//Get the list of items.
var items = $('li');

//Animate the items.
function animate()
{
   
    //Step through each item.
    for(var i = items.length - 1; i >= 0; --i){
       
       
        //variables for movement.          
        var xVar = 50 + x[i];            // x value
        var yVar = 50 + y[i] * z[i]++;  // y value, move towards bottom of screen
        var zVar = 20 * z[i]++;         // z value, text get larger.
       
       
        //Check to see if text position is still on the screen.
        // the #'s are %.   100 is far right or bottom, 0 is top or left.
        // for z value it's the font size in %.
        if (!xVar || xVar < 0 || xVar > 90||
            yVar < 0 || yVar > 90 ||
            zVar < 0 || zVar > 2500)
        {
            //if it's off the screen randomly pick a starting place.
            x[i]= Math.random() * 2 - 1;
            y[i] = Math.random() * 2 - 1;
            z[i] = 2;
           
        }
        else
        {
            //if it's still on the screen apply the appropiate styles.

            // var item = $(items[i]);
            
            // item.css("position", "absolute"); // make sure we can move the text around.
            // item.css("top", xVar+"%");  // y value
            // item.css("left", yVar+"%"); // x value
           
            // item.css("fontSize", zVar+"%"); // font size (illusion of perspective.)
            // item.css("opacity",(zVar)/3000); // fade in from the distance.

            $(items[i]).css({
                position: 'absolute'
                , top: xVar + '%'
                , left: yVar + '%'
                , fontSize: zVar + '%'
                , opacity: (zVar)/3000
               });
            
        }
    }

    setTimeout(animate, 9);
}

animate();
    
});

