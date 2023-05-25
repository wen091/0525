var monster_colors = "006466-065a60-0b525b-144552-1b3a4b-212f45-272640-312244-3e1f47-4d194d".split("-").map(a=>"#"+a)

class Monster{  //宣告一個怪物類別，名稱為Monster
  constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、初始顯示位置....)
    this.r = args.r ||10  //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以10為主
    this.p = args.p ||createVector(random(width),random(height))   //建立一個向量，由亂數抽取顯示的初始位置
    this.v = args.v ||createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳args參數，就會利用亂數(-1,1)抽出x,y軸的移動速度
    this.color = args.color || random(fill_colors)
    this.mode = random(["happy","bad"])  //隨機抽兩種不同的表情
    this.dead = false
  }
  draw(){  //繪出元件程式
    if(this.dead == false)  //判斷是不能使用雙引號""
    { 
    push()  //重新設定原點位置
      translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)  //畫圓
      //stroke(this.color)
      //strokeWeight(4)
      //line()
      //++++++++++++++++++++++++
      if (this.mode=="happy"){
        fill(255)
        ellipse(0,0,this.r/2)
        fill(0)
        ellipse(0,0,this.r/3)
      }
      else{
        fill(255)
        arc(0,0,this.r/2,this.r/2,0,PI)
        fill(0)
        arc(0,0,this.r/3,this.r/3,0,PI)
      }
      //+++++++++++++++++++++++++++++++(以下是畫怪物的八隻腳)
      stroke(this.color)
      strokeWeight(4)
      noFill()
      //line(this.r/2,0,this.r,0)
      for (var j=0;j<8;j++){
        rotate(PI/5)
        beginShape()
        for (var i=0;i<(this.r/2);i++){  //依照直徑大小來決定小尾巴長度
          vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
        }
        endShape()
      }
      
    pop()  //恢復原點到整個視窗的左上角
    }
    else
    {  //怪物死亡的畫面
      this.timenum = this.timenum + 1

      push()  //重新設定原點位置
        translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)  //畫圓
        stroke(255)
        line(-this.r/2,0,this.r/2,0) 
        stroke(this.color)
        strokeWeight(4)
        noFill()
        //line(this.r/2,0,this.r,0)
        for (var j=0;j<8;j++){
          rotate(PI/4)
          line(this.r/2,0,this.r,0)
        }
    pop()
  }
}

  update(){  //計算出元件移動後的位置
    this.p.add(this.v)
    //++++碰壁彈回+++++
    if (this.p.x<=0 || this.p.x>=width){  //x碰到左邊(<=0)，或是碰到右邊(>=0)
      this.v.x = -this.v.x  //把x軸方向、速度改變
    }
    if (this.p.y<=0 || this.p.y>=height){  //y碰到左邊(<=0)，或是碰到右邊(>=0)
      this.v.y = -this.v.y  //把y軸方向、速度改變
    }
  }
  isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物的範圍內
    let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(飛彈與物件中心點)
    if (d<this.r/2){
      return true  //飛彈(x,y)與物件的距離(this.p.x,this.p.y)小於務件
    }
    else{
      return false  //飛彈(x,y)與物件的距離(this.p.x,this.p.y)大於務件
    }
  }
} 


//畫出一個物件:1.寫出push()、pop() 2.再寫出程式碼

