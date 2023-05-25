//let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];
let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料

var fill_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
var line_colors = "044389-fcff4b-ffad05-7cafc4-5995ed".split("-").map(a=>"#"+a)

//++++++設定畫points所有"點"的物件變數+++++++
var ball  //目前要處理的元件，暫時放在ball變數內
var balls = []  //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++++++++++++++++

//+++++++++設定飛彈物件的變數+++++++++++++++++
var bullet //目前要處理的元件，暫時放在bullet裡面
var bullets = []  //把產生的"所有"的物件，暫時放在bullets裡面
//+++++++++++++++++++++++++++++++++++

//+++++++++設定怪物物件的變數+++++++++++++++++
var monster //目前要處理的元件，暫時放在monster裡面
var monsters = []  //把產生的"所有"的物件，暫時放在monster裡面
//+++++++++++++++++++++++++++++++++++

//+++++++++設定砲台的位置+++++++++++++
var shipP
//++++++++++++++++++++++++++++++++++




var score = 0

function preload(){
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台位置為(width/2,height/2)-->視窗的中間
  for (var i=0 ; i<10 ; i=i+i){  //i=1，2，3，4....8，9
    ball = new Obj({})  //產生一個Obj class元件
    balls.push(ball)  //把ball的物件放入到balls陣列內
  }
  for (var i=0 ; i<10 ; i=i+i){  //i=1，2，3，4....8，9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把monster的物件放入到monsters陣列內
  }
}

function draw() {
  background(220);
  //for (var j=0 ; j<balls.length ; j=j+1 ){
  //  ball = balls[j]
  //  ball.draw()
  //  ball.update()
  //}

  if (keyIsPressed){  //當鍵盤按鍵被按下
    if(key=="ArrowLeft" || key=="a"){  //按下a也代表向左//"ArrowLeft"代表用鍵盤的"左鍵"移動操作
      shipP.x = shipP.x + 5
    }
    if(key=="ArrowRight" || key=="d"){ //按下d也代表向右//"ArrowRight"代表用鍵盤的"右鍵"移動操作
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowUp" || key=="w"){ //按下w也代表向上//按下w也代表向右//"ArrowUp"代表用鍵盤的"向上鍵"移動操作
      shipP.y = shipP.y + 5
    }
    if(key=="ArrowDown"|| key=="s"){ //按下s也代表向下//"ArrowLeft"代表用鍵盤的"向下鍵"移動操作
      shipP.y = shipP.y - 5
    }
  }

  //大象的顯示
  for(let ball of balls)   //只要是陣列的方式，都可以利用這個方式
  {
    ball.draw()
    ball.update()
    for (let bullet of bullets){   //檢查每一個物件
      if(ball.isBallInRange(bullet.p.x,bullet.p.y))   //飛彈物件有沒有接觸現在的ball
      {
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取出1個
        bullets.splice(bullets.indexOf(bullet),1)  
        score = score - 1
        elephant_sound.play()
      }
    }
  }

  //飛彈的顯示(產生一個飛彈)
  for (let bullet of bullets)   //只要是陣列的方式，都可以利用這個方式
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示
  for (let monster of monsters)   //只要是陣列的方式，都可以利用這個方式
  {
    if(monster.dead == true && monster.timenum>4){
      monsters.splice(monsters.indexOf(monster),1)//從倉庫monsters取出被滑鼠按到的物件編號(monsters.indexOf(ball))，只取出1個 
    }
    monster.draw()
    monster.update()
    for (let bullet of bullets){   //檢查每一個飛彈物件
      if(monster.isBallInRange(bullet.p.x,bullet.p.y)){   //飛彈物件有沒有接觸現在的monster
        //monsters.splice(monsters.indexOf(monster),1) //從倉庫monsters取出被滑鼠按到的物件編號(monsters.indexOf(ball))，只取出1個
        bullets.splice(bullets.indexOf(bullet),1)  
        score = score + 1
        monster.dead = true  //代表怪物死亡
        //elephant_sound.play()
      }
    }
  }

  textSize(50)
  text(score,50,50)  //在座標為(50,50)上，顯示score分數內容
  push()  //重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2
    let dy = mouseY - width/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)  //把砲台的中心點放在視窗的中間
    fill("#ffc03a")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0) //設定點連為一個三角形
    ellipse(0,0,50)
  pop()  //恢復原本設定，原點(0,0)在視窗的左上角
}

function mousePressed(){

  //++++++++++產生一個物件+++++++++++
  //ball = new Obj({
  //  p:{x:mouseX,y:mouseY}
  //})  //在滑鼠按下的地方，產生一個新的物件Obj calss元件
  //balls.push(ball)  //把ball物件放入到balls陣列中(丟到倉庫)
  //+++++++++++++++++++++++++++++++++

  //在物件上按下滑鼠，物件消失不見，分數加1分+++++++
  //for(let ball of balls){  //檢查每一個物件
  //  if(ball.isBallInRange(x,y)){
  //    balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取出1個
  //    score = score + 1
  //  }
  //}
  //++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++按一下產生一個飛彈+++++++++++
  bullet = new Bullet({})  //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
  bullets.push(bullet)  //把bullet物件放入到bullets陣列中(丟到倉庫)
  bullet_sound.play() 
}

function keyPressed(){
  if(key==" "){ //按下空白建，發射飛彈，其實跟按下滑鼠的功能一樣//""內的空格代表用空格操作
    bullet = new Bullet({})  //在滑鼠按下的地方，產生一個新的Bullet class的原件(產生一個飛彈)
    bullet.push(bullet)
    bullet_sound.play()
  }
  
}


//++++++以下為Obj.js之設定+++++++
//class:類別、例子
//class Obj{   //宣告一個類別，針對一個畫的圖案
//  constructor(args){//預設值，基本資料(物件的顏色、移動速度、大小、初始顯示位置)
//    //this.p = args.p || { x:random(width) , y:random(height) }  //描述該物件的初始位置
                    //||(or)，當產生一個物件時，有傳給位置參數，則使用該參數。如果妹有產生參數，就以||後面設定產出        

//    this.p = args.p ||createVector(random(width) , random(height))  //把原本的{x:....,y:....)改成"向量"方式呈現
//    //this.v = {x:random(-1,1) , y:random(-1,1)}  //設定一個物件的移動速度
//    this.v = args.v ||createVector(random(-1,1) , random(-1,1))  //把原本的{x:....,y:....)改成"向量"方式呈現
//    this.size = random(15,20)  //一個物件的放大倍率
//    this.color= random(fill_colors)  //充滿顏色
//    this.stroke = random(line_colors)  //外框線條顏色
//  }

//  draw(){  //畫出單一個物件形狀
//    push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
//      translate(this.p.x,this.p.y)  //以該物件位置為原點
//      scale(this.v.x<1,-1)  //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為"上下翻轉"
//      fill(this.color)
//      stroke(this.stroke)
//      strokeWeight(4)  //線條粗細
//      beginShape()
//        for(var k=0 ; k<points.length ; k=k+1){
//          //line(points[k][0]*this.size,points[k][1]*this.size,points[k][2]*this.size)
//          //vertex(oints[k][0]*this.size,points[k][1]*this.size)  //只要設定一個點，當指令到ends
//          curveVertex(oints[k][0]*this.size,points[k][1]*this.size)  //畫線為圓弧方式畫圓
//        }
//      endShape()
//  }
//  update(){
//    //this.p.x = this.p.x+this.v.x  //x軸目前位置(this.p.x)加上x軸的移動速度(this.p.x)
//    //this.p.y = this.p.x+this.v.y  //y軸目前位置(this.p.y)加上y軸的移動速度(this.p.y)
//    this.p.add(this.v)  //設定好向量後，使用add，就可以與上面兩行指令一樣的效果
//    //向量sub==>減號

//    //知道滑鼠的位置，並建立一個滑鼠的向量
//    let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
//    let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)的距離，每次以3移動靠近
//    //this.v.mag()代表該物件的速度大小(一個向量值有大小與方向)
//    this.p.add(delta)

//    if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
//      this.v.x = -this.v.x   //把x軸方向，速度方向改變
//    }
//    if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)，或是碰到右邊(>=height)
//      this.v.y = -this.v.y   //把y軸方向，速度方向改變
//    }
//  }
//  isBallInRange(){
//    let d = dist(mouseX,mouseY,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
//    if(d<4*this.size){
//      return true  //滑鼠與物件的距離小於物件的寬度，代表觸碰了，則傳回true的值(碰觸)
//    }
//    else{
//      return false  //滑鼠與物件的距離大於物件的寬度，代表觸碰了，則傳回false的值(碰觸)
//    }
//  }
//}

//+++++++++設定大象(point 所有點)的定義+++++++++
//var ball  //目前要處理的元件，暫時放在ball裡面
//var balls = []  //把產生的"所有"的物件，暫時放在balls裡面

//+++++++++設定飛彈物件的變數+++++++++++++++++
//var bullet //目前要處理的元件，暫時放在bullet裡面
//var bullets = []  //把產生的"所有"的物件，暫時放在bullets裡面
//var score = 0


