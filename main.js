var pad = document.getElementById('pad')
var ctx = pad.getContext('2d')
var actions = document.getElementById('actions')

autoSetCanvasSize(pad)

listenToMouse(pad)

// 使用橡皮擦
var eraserEnable = false
eraser.addEventListener('click', () => {
  eraserEnable = true
  actions.className = "actions on"
})
brush.addEventListener('click', () => {
  eraserEnable = false
  actions.className = "actions"
})

function listenToMouse(canvas) {
  // 模式切换
  var usingOrNot = false
  // 记录上一个点
  var lastPoint = {x: undefined, y: undefined}

  canvas.onmousedown = (e) => {
    // 绘画模式激活
    usingOrNot = true
    var clientX = e.clientX  
    var clientY = e.clientY

    if(eraserEnable) {
      ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
    } else {
      lastPoint = {x: clientX, y: clientY}
    }
  }
  canvas.onmousemove = (e) => {
    // 判断绘画模式已开启
      var clientX = e.clientX
      var clientY = e.clientY
      if(!usingOrNot) {return}
      if(eraserEnable) {
          ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
        } else {
        var newPoint = {x: clientX, y: clientY}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
  canvas.onmouseup = (e) => {
    usingOrNot = false
    }
  }
}

function autoSetCanvasSize(canvas) {
  assignSize()

  window.onresize = (e) => {
    assignSize()
  }

function assignSize() {
  var pageHeight = document.documentElement.clientHeight
  var pageWidth = document.documentElement.clientWidth
  canvas.height = pageHeight
  canvas.width = pageWidth
  }
}

// 画线
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2)
  ctx.lineWidth = 5
  ctx.stroke();
  ctx.closePath();
}