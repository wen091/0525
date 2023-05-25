//class:類別、例子
class Obj{   //宣告一個類別，針對一個畫的圖案
  constructor(args){//預設值，基本資料(物件的顏色、移動速度、大小、初始顯示位置)
    //this.p = args.p || { x:random(width) , y:random(height) }  //描述該物件的初始位置
                    //||(or)，當產生一個物件時，有傳給位置參數，則使用該參數。如果妹有產生參數，就以||後面設定產出        

    this.p = args.p ||createVector(random(width) , random(height))  //把原本的{x:....,y:....)改成"向量"方式呈現
    //this.v = {x:random(-1,1) , y:random(-1,1)}  //設定一個物件的移動速度
    this.v = createVector(random(-1,1) , random(-1,1))  //把原本的{x:....,y:....)改成"向量"方式呈現
    this.size = random(10,20)  //一個物件的放大倍率
    this.color= random(fill_colors)  //充滿顏色
    this.stroke = random(line_colors)  //外框線條顏色
  }

  draw(){  //畫出單一個物件形狀
    push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
      translate(this.p.x,this.p.y)  //以該物件位置為原點
      scale(this.v.x<0?1:-1,-1)  //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為"上下翻轉"
      fill(this.color)
      stroke(this.stroke)
      strokeWeight(4)  //線條粗細
      beginShape()
        for(var k=0 ; k<points.length ; k=k+1){
          //line(points[k][0]*this.size,points[k][1]*this.size,points[k][2]*this.size)
          //vertex(oints[k][0]*this.size,points[k][1]*this.size)  //只要設定一個點，當指令到ends
          curveVertex(points[k][0]*this.size,points[k][1]*this.size)  //畫線為圓弧方式畫圓
        }
      endShape()
    pop()  //執行pop()，原點(0,0)設定回到整個視窗的左上角
  }

  update(){  //移動的程式碼內容
    //this.p.x = this.p.x+this.v.x  //x軸目前位置(this.p.x)加上x軸的移動速度(this.p.x)
    //this.p.y = this.p.x+this.v.y  //y軸目前位置(this.p.y)加上y軸的移動速度(this.p.y)
    this.p.add(this.v)  //設定好向量後，使用add，就可以與上面兩行指令一樣的效果
    //向量sub==>減號

    //知道滑鼠的位置，並建立一個滑鼠的向量
    let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
    let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)的距離，每次以3移動靠近
    //this.v.mag()代表該物件的速度大小(一個向量值有大小與方向)
    this.p.add(delta)

    if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
      this.v.x = -this.v.x   //把x軸方向，速度方向改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)，或是碰到右邊(>=height)
      this.v.y = -this.v.y   //把y軸方向，速度方向改變
    }
  }
  isBallInRange(x,y){
    let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
    if(d<4*this.size){
      return true  //滑鼠與物件的距離小於物件的寬度，代表觸碰了，則傳回true的值(碰觸)
    }
    else{
      return false  //滑鼠與物件的距離大於物件的寬度，代表觸碰了，則傳回false的值(碰觸)
    }
  }
}