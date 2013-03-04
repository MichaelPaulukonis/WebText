$(document).ready(function() {

    page18();

});


var page18 = function() {

    var _isPaused = false,
        _isEditing = false,
        _frames = [],
        _speedIncr = 50,
        _anim,
        direction = { forward: 1,
                      reverse: -1
                    },
        _curDirection = direction.forward,
        _frameTemplate = $('#frametemplate')[0].innerHTML;;
    
    
    var debug = (SketchLib.GetOption('debug') == 'true');

    var speed = parseInt(SketchLib.GetOption('speed'), 10);
    speed  = (isNaN(speed) ? 100 : speed);
    
    var _curFrame = parseInt(SketchLib.GetOption('frame'), 10);
    _curFrame = (isNaN(_curFrame) ? 0 : _curFrame);

    var clearFrameStorage = function() {
        localStorage.removeItem('frameset');
    };
   
    var getFrames = function() {

        var frames = [];

        // the frames are stored differently in localstorage vs our initial template
        if (localStorage.getItem('frameset')){
            var text = localStorage.getItem('frameset');
            frames = text.split(',');
        } else {
            var text = _frameTemplate;
            // TODO: create multiple frames...
            for (var i = 0; i < 5; i++) {
                // NOTE: if i.length > 1 you're gonna need to change this....
                frames[i] = text.replace('.', i+1);
            }
        }

        return frames;
        
    };

    // TODO: this is a lousy name for a function
    // also, the space key might not be the best way to restart when we are editing
    // ALSO the check for pause needs to be rewritten.
    // see that Paul Irish video....
    var pauser = function() {
        
        _isPaused = !_isPaused;

    };

    // toggle edit mode, and save changes on exit
    var editToggle = function() {

        _isEditing = !_isEditing;
        _isPaused = _isEditing;

        bindKeys(!_isEditing, animKeybindings);
        bindKeys(_isEditing, editKeybindings);
        
        $('#displaypage').attr('contenteditable', _isEditing);
        updateStatus();

        // when we leave edit mode, save the current fame
        if(!_isEditing) {
            saveFrame();
        }
        
    };

    var saveFrame = function() {
        _frames[_curFrame] = $('#displaypage')[0].innerHTML;
        storeFrames(_frames);
    };

    var forwardFrame = function() {
        
        _curDirection = direction.forward;
        changeFrame();

    };

    var backwardFrame = function() {

        _curDirection = direction.reverse;
        changeFrame();
        
    };

    var changeFrame = function() {

        if (_isEditing) {
            saveFrame(); // save off current frame before leaving
        }
        else if (!_isPaused) {
            return;
        }
        
        _curFrame += _curDirection;
        display();
    };
    
    var displayNext = function() {

        if (_isPaused) { return; }

        _curFrame += _curDirection;

        display();
        
    };


    var display = function() {

        if (_curFrame >= _frames.length ) { _curFrame = 0; }
        if (_curFrame < 0) { _curFrame = _frames.length -1; }

        $('#displaypage').html(_frames[_curFrame]);
        updateStatus();
    };

    var updateStatus = function() {

        var fn = zeroFill(_curFrame +1, 3), all = zeroFill(_frames.length, 3);
        var status = 'frame: ' + fn + '/' + all + (_isEditing ? ' Edit' : '');
        $('#status').html(status);

    };

    var _fillZeroes = "00000000000000000000";  // max number of zero fill ever asked for in global
    var zeroFill = function (number, width) {
        var input = number + "";  // make sure it's a string
        return(_fillZeroes.slice(0, width - input.length) + input);
        
        // width -= number.toString().length;
        // if ( width > 0 )
        // {
        //     return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        // }
        // return number + ""; // always return a string
    };
    

    var appendFrame = function() {
        _frames.push(_frameTemplate);
        updateStatus();
    };

    var insertFrame = function() {
        _frames.splice(_curFrame + 1, 0, _frameTemplate);
        updateStatus();
    };
    
    var decreaseSpeed = function() {

        speed += _speedIncr;

        if (speed > 1000) { speed = 1000; }

        setSpeed();
        
    };

    var increaseSpeed = function() {

        speed -= _speedIncr;

        if (speed < 0) { speed = 1; }

        setSpeed();
        
    };

    var setSpeed = function() {

        clearInterval(_anim);

        _anim = setInterval(displayNext, speed);
        
    };

    var storeFrames = function(frames) {

        localStorage.setItem('frameset', _frames);

    };

    // pass in true/false to bind/unbind
    var bindKeys = function(on, bindings) {

        for (var key in bindings) {
            if (bindings.hasOwnProperty(key)) {
                var handler = bindings[key];
                
                var dir = (on ? 'binding ' : 'unbinding ');
                SketchLib.Log(dir + key);

                if (on) {
                    $(document).bind('keydown', key, handler );
                } else {
                    $(document).unbind('keydown',  handler );
                };
            }
        }
        
    };

    
    var animKeybindings = {
        'p':     pauser ,          
        'up':    increaseSpeed,
        'down':  decreaseSpeed,
        'left':  backwardFrame,        
        'right': forwardFrame
    };

    var allKeybindings = { 
       'alt+ctrl+e':  editToggle
    };

    var editKeybindings = {
        'alt+a': appendFrame,
        'alt+i': insertFrame,
        'alt+ctrl+left':  backwardFrame,        
        'alt+ctrl+right': forwardFrame
    };


    if (SketchLib.GetOption('clearstorage') == 'true') {
        clearFrameStorage();
    };
    
    _frames = getFrames();

    if (_curFrame > _frames.length) { _curFrame = 0; }
    
    $('#displaypage').html(_frames[_curFrame]);

    // $('pre').center();
    $('#displayarea').width($('pre').width());
    $('#displayarea').center();

    _anim = setInterval(displayNext, speed);

    bindKeys(true, animKeybindings);
    bindKeys(true, allKeybindings);

    $('#infobox').fadeOut(3000);

};
