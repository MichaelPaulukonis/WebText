/* Traditionally, text and image are segregated in Western Art.
   This sketch plays with those boundaries, providing an polychromatic
   text painting environment.

   Mouse click and drag to paint (previous paints will fade slightly).
   Color and size are based on mouse position.
   SPACE to paint without fading previous actions.
   RIGHT/LEFT to increase/decrease rotation of letters.
   R to reset rotation to 0.
   UP/DOWN to change paint mode.
   M to switch between grids and circles
   Delete or Backspace to clear the screen.
   S to Save.

   inspired by Marco Scarfagna's sketch https://class.coursera.org/compartsprocessing-001/forum/thread?thread_id=145#post-1804
   https://class.coursera.org/compartsprocessing-001/forum/profile?user_id=536813
*/

String bodycopy = "An sketch a day keeps the doctor away........*****xxx                                 ";
int curRot = 0;
TextManager t;

void setup(){
  size(900,600);
  strokeWeight(2);
  textAlign(CENTER, CENTER);
  colorMode(HSB, width, height, 100);
  clearScreen();
  t = new TextManager();

}


void draw(){
  // ignore mouse outside confines of window.
  // or you'll crash the app! or something....
  if (mousePressed && mouseY > 0 && mouseY < height
      && mouseX > 0 && mouseX < width) {
    paint(mouseX, mouseY);
  }

}

void mousePressed() {
  fill(#FFFFFF, 50);
  noStroke();
  rect(0,0,width,height);
}


void paint(int xPos, int yPos) {
  switch(drawMode) {
  case 0:
  default:
    drawGrid(xPos, yPos);
    break;
  case 1:
    drawCircle(xPos, yPos);
    break;
  }
}

void drawCircle(int xPos, int yPos) {

  String message = bodycopy;

  // The radius of a circle
  float r = xPos;
  float circumference = 2 * PI * r;
  int tx = xPos / 2;
  if (tx < 1) tx = 1;
  // println(tx);
  textSize(tx);

  pushMatrix();
  // Start in the center and draw the circle
  translate(width / 2, height / 2);

  // We must keep track of our position along the curve
  // offset the start/end point based on mouse position...
  // this will change the while condition
  float arclength = 0;

  // random chars until we've come... full-circle
  while (arclength < circumference) {
    // Instead of a constant width, we check the width of each character.
    char currentChar = t.getChar();
    float w = textWidth(currentChar);

    // Each box is centered so we move half the width
    arclength += w/2;
    // Angle in radians is the arclength divided by the radius
    // Starting on the left side of the circle by adding PI
    float theta = PI + arclength / r;

    pushMatrix();
    // Polar to cartesian coordinate conversion
    translate(r*cos(theta), r*sin(theta));
    // Rotate the "box" so letters conform to circle
    //    rotate(theta+PI/2); // rotation is offset by 90 degrees
    rotate(radians(curRot)); // this is an absolute rotation...
    // there are 2 * PI, or 6.28 radians
    // so make this a percentage multiplier....
    // TODO: combine the two, somehow?

    // Display the character
    // this is again ANOTHER paint mode, effectively
    // since it is not grid-based. hrm.....
    setPaintMode(yPos, yPos);
    text(currentChar,0,0);
    popMatrix();
    // Move halfway again
    arclength += w/2;

  }
  popMatrix();
}

void drawGrid(int xPos, int yPos) {

  int stepX = xPos + 5;
  textSize(stepX);

  for (int gridY = 0; gridY < height; gridY += stepX) {
    for (int gridX = 0; gridX < width; gridX += stepX) {

      setPaintMode(gridX, gridY);

      stroke(255);
      char letter = t.getCharRandom();

      pushMatrix();

      // move to the CENTER of the invisible rectangle [that we aren't drawing]
      // to be honest, stepX/5 was found experimentally.
      // since characters can be all over the place in the max/min of the font
      // it's really hard [for me] to find a good all-over alignment
      // and this is wonky with rotation (see horizontal roation, f'r example)
      translate(gridX + stepX/2, gridY + stepX/5);

      rotate(radians(curRot));
      text(letter, 0, 0);

      popMatrix();

    }
  }

}

char getText() {
  int i = int(random(bodycopy.length()));
  return bodycopy.charAt(i);
}

// TODO rename Screen to canvas ?
void clearScreen() {
  background(0, 0, 100);
}

void fadeCanvas() {
  fill(#FFFFFF, 50);
  noStroke();
  rect(0,0,width,height);
}


int drawMode = 0;
int drawModes = 2;
void nextDrawMode(int direction) {
  drawMode = (drawMode + direction) % drawModes;
  if (drawMode < 0) drawMode = drawModes - 1;
}

int nextPaintMode(int direction) {

  currentPaintMode = (currentPaintMode + direction) % paintModes;
  if (currentPaintMode < 0) currentPaintMode = paintModes - 1;

  return currentPaintMode;
}


void nextRotation(int direction) {
  int step = 5;
  curRot = (curRot + step*direction) % 360;
  if (curRot < 0) curRot = 360;
}

int paintModes = 4;  // 1..n
int currentPaintMode = 0;
void setPaintMode(int gridX, int gridY) {

  // TODO: I don't understand the third-parameter here, in HSB mode.

  switch(currentPaintMode) {

  case 1:
    fill(width-gridX, gridY, 100, 100);
    break;

  case 2:
    fill(gridX/2, gridY/2, 900, 180);
    break;

  case 3: // offset from default
    int x = (gridX + width/2) % width;
    int y = (height-gridY + height/2) % height;
    fill(x, y, 900, 180);
    break;

  case 0:
  default:
    fill(gridX, height-gridY, 900, 180);
    break;

  }
}

// only resets the angle, for now...
void reset() {
  curRot = 0;
}

void save() {
  saveFrame("polychrome.text.####.png");
  // println("saved!");
}


void keyPressed() {

  if (key == CODED) {

    if (keyCode == UP || keyCode == DOWN) {
      if (keyCode == UP) {
        nextPaintMode(1);
      } else {
        nextPaintMode(-1);
      }
      // println("currentPaintMode: " + currentPaintMode);
    }
    if (keyCode == LEFT || keyCode == RIGHT) {
      if (keyCode == LEFT) {
        nextRotation(-1);
      } else {
        nextRotation(1);
      }
    }
  }

  if (key == BACKSPACE || key == DELETE) {
    clearScreen();
  }

  switch(key) {

  case ' ':
    paint(mouseX, mouseY);
    break;

  case 'm':
    nextDrawMode(1);
    break;
  case 'M':
    nextDrawMode(-1);
    break;

  case 'r':
  case 'R':
    reset();
    break;

  case 's':
  case 'S':
    save("screenshot####.png");
    // println("saved");
    break;

  case 'x':
    shift(10, 0);
    break;
  case 'X':
    shift(-10, 0);
    break;

  case 'z':
    shift(0, -10);
    break;
  case 'Z':
    shift(0, 10);
    break;

  case '1':
    paint1();
    break;

  case '2':
    paint2();
    break;

  case '3':
    paint3();
    break;

  case '4':
    paint4();
    break;

  case '5':
    paint5();
    break;

  case '6':
    paint6();
    break;

  }

}

void paint1() {
  drawGrid(20, 10);
}

void paint2() {
  drawCircle(89, 89);
  drawCircle(50, 50);
  drawCircle(40, 40);
  drawCircle(30, 30);
  drawCircle(100, 100);
}

void paint3() {
  for (int i = 1; i < width/2; i+= 10) {
    drawCircle(i,i);
  }
}

void paint4() {
  int origRot = curRot;
  for (int i = width; i > width/2; i-= 20) {
    if (i < ((width/3) * 2)) curRot = 90;
    drawGrid(i,i);
5  }
  curRot = origRot;
}

void paint5() {
  drawGrid(4, 4);
}

void paint6() {
  // println("paint6 start");
  for (int i = 1; i < width; i+=5) {
    drawGrid(i, mouseY);
  }
  // println("paint6 end");

}
// shift pixels in image... somehow
// http://processing.org/reference/PImage_loadPixels_.html
// http://processing.org/discourse/beta/num_1269545825.html
void shift(int verticalOffset, int horizontalOffset) {
  PImage screen = createImage(width, height, RGB);
  PImage temp = createImage(width, height, RGB);

  loadPixels();
  screen.pixels = pixels;


  int offset = verticalOffset * width + horizontalOffset;
  int totPixels = width * height;
  // println("totPixels: " + totPixels + " offset: " + offset);
  for (int i = 0; i < totPixels; i++) {
    int orig = (i + offset) % totPixels;
    if (orig < 0) orig += totPixels; // nope, not quite;
    //println("index: " + i + " orig: " + orig);
    temp.pixels[i] = screen.pixels[orig];
  }

  screen.pixels = temp.pixels;
  screen.updatePixels();
  image(screen, 0, 0);

  // println("updated!");

}

class TextManager {

  String w = "";
  String defaultText = "These are the pearls that were his eyes";
  String randomText = defaultText + "...........---___*****xxx                                            ";
  String SPLIT_TOKENS = " ?.,;:[]<>()\"";
  String words[];
  int charIndex = 0;
  int wordIndex = 0;

  TextManager() {
    w = defaultText;
    words = splitTokens(w,SPLIT_TOKENS);
  }

  TextManager(String wInput) {
    w = wInput;
    words = splitTokens(w, SPLIT_TOKENS);
  }

  // getChar and getWord indexes are not yoked together
  char getChar() {
    char c = w.charAt(charIndex);
    charIndex = (charIndex + 1) % w.length();
    return c;
  }

  char getCharRandom() {
    char c = randomText.charAt((int)random(randomText.length()))  ;
    return c;
  }

  String getWord() {
    String word = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
    return word;
  }

  String getText() {
    return w;
  }

}
