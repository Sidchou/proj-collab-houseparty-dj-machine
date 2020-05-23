let tokens = [];


let samples = [];
let playTrack = [];
let lastPlayTrack = [];


function preload(){
  samples.push(loadSound('./sound/drum/080_strange-mermaid.wav'));
  samples.push(loadSound('./sound/drum/080_doublekick-brighthat-crunch.wav'));
  samples.push(loadSound('./sound/drum/080_lofi-hatty-crackle.wav'));
  samples.push(loadSound('./sound/drum/080_too-much-pot-groove.wav'));
  samples.push(loadSound('./sound/bass/SOULSURPLUS_sombersoul_melodic_loop_1_electric_bass_chillhop_80_bpm_cmin.wav'));
  samples.push(loadSound('./sound/bass/SOULSURPLUS_sombersoul_melodic_loop_4_electric_bass_dry_chillhop_80_bpm_fmin.wav'));
  samples.push(loadSound('./sound/bass/SOULSURPLUS_sombersoul_melodic_loop_6_electric_bass_dry_chillhop_80_bpm_FSmin.wav'));
  samples.push(loadSound('./sound/bass/SOULSURPLUS_sombersoul_melodic_loop_14_electric_bass_chillhop_80_bpm_Bmin.wav'));
  samples.push(loadSound('./sound/melody/SOULSURPLUS_sombersoul_melodic_loop_1_electric_guitar_lead_dry_chillhop_80_bpm_cmin.wav'));
  samples.push(loadSound('./sound/melody/SOULSURPLUS_sombersoul_melodic_loop_2_electric_guitar_lead_dry_chillhop_80_bpm_amin.wav'));
  samples.push(loadSound('./sound/melody/SOULSURPLUS_sombersoul_melodic_loop_8_pianet_dry_chillhop_80_bpm_emin.wav'));
  samples.push(loadSound('./sound/melody/SOULSURPLUS_sombersoul_melodic_loop_12_electric_guitar_chords_dry_chillhop_80_bpm_ebmin.wav'));
  samples.push(loadSound('./sound/vocal/91V_TSV_Vocal_Hook_FX_80_Hopez_Clean_Am.wav'));
  samples.push(loadSound('./sound/vocal/jh_kit3_crispy_vocal_loop_80_ASm.wav'));
  samples.push(loadSound('./sound/vocal/SO_JC_80_vocal_hook_beautifuldream_Gm.wav'));


}


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < 15; i++) {
    tokens[i] = new Token(

      width * (0.02 + i * 0.06), height * 0.05, width * 0.055, i)
    //rect(10+i*width * 0.1,10,width * 0.1,width * 0.1)
  }
}

function draw() {
  background(200);
  let playground = [width * 0.2, height * 0.2, width * 0.6, height * 0.6]
  rect(playground[0], playground[1], playground[2], playground[3]);
  let str = ""
  playTrack = [];
  for (i = 0; i < tokens.length; i++) {
    if (tokens[i].check(playground[0], playground[1], playground[2], playground[3])!=null){
      let _str = tokens[i].check(playground[0], playground[1], playground[2], playground[3]);
       str += _str;
      playTrack.push(_str);
    }
    // str += tokens[i].check(playground[0], playground[1], playground[2], playground[3]);
    tokens[i].show();
  }
  textAlign(LEFT,TOP);

  text(str,width * 0.2, height * 0.8)


      for(let i = 0; i < playTrack.length; i++){
        if (!lastPlayTrack.includes(playTrack[i])){

          // if(samples[playTrack[0]].isPlaying()){
            // samples[playTrack[i]].onended(samples[playTrack[i]].play())

      samples[playTrack[i]].play();
      samples[playTrack[i]].setLoop(true);
    // }else{samples[playTrack[0]].play();}
        }
    }
     for(let i = 0; i < lastPlayTrack.length; i++){
        if (!playTrack.includes(lastPlayTrack[i])){


      samples[lastPlayTrack[i]].setLoop(false);
        }
    }


  lastPlayTrack = playTrack.slice()

}

function mousePressed() {

  for (i = 0; i < tokens.length; i++) {
    tokens[i].dragOn(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (i = 0; i < tokens.length; i++) {

    tokens[i].dragOff(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


class Token {
  constructor(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.mX = 0;
    this.mY = 0;
    this.size = size;
    this.id = id;
    this.dragging = false;
  }
  dragOn(x, y) {
    // this.mX = x;
    // this.mY = y;
    if (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size) {
      this.mX = this.x - x;
      this.x += this.mX
      this.mY = this.y - y;
      this.y += this.mY
      this.dragging = true;
    }
  }
  dragOff(x, y) {
    // this.mX = x;
    // this.mY = y;
    let _x = x + this.mX;
    let _y = y + this.mY;
    if (x > _x && x < _x + this.size && y > _y && y < _y + this.size && this.dragging) {
      this.x = _x;
      this.y = _y;
      this.dragging = false;
    }
  }
  check(x, y, w, h) {
    if (this.x + this.size / 2 > x && this.x + this.size / 2 < x + w && this.y + this.size / 2 > y && this.y + this.size / 2 < y + h) {
      return this.id;
    }
    return null;
  }
  show() {
    // let mX = mouseX - this.mX;
    // let mY = mouseY - this.mY;
    textSize(24);
    textAlign(CENTER, CENTER);
    if (this.dragging) {
      rect(mouseX + this.mX, mouseY + this.mY, this.size, this.size)


      text(this.id, mouseX + this.mX + this.size / 2, mouseY + this.mY + this.size / 2)

    } else {
      rect(this.x, this.y, this.size, this.size)
      text(this.id, this.x + this.size / 2, this.y + this.size / 2)

    }


  }

}
