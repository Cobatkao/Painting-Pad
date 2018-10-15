var pad = document.getElementById('pad')
var ctx = pad.getContext('2d')

// 全屏处理
assignSize()

// 监听窗口大小变化
window.onresize = (e) => {
  assignSize()
}

function assignSize() {
  var pageHeight = document.documentElement.clientHeight
  var pageWidth = document.documentElement.clientWidth
  pad.height = pageHeight
  pad.width = pageWidth
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

// 模式切换
var usingOrNot = false
var eraserEnable = false
// 记录上一个点
var lastPoint = {x: undefined, y: undefined}

pad.onmousedown = (e) => {
  // 绘画模式激活
  usingOrNot = true
  var clientX = e.clientX  
  var clientY = e.clientY
  if(eraserEnable) {
    usingOrNot = true
    ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
  } else {
    usingOrNot = true
    lastPoint = {x: clientX, y: clientY}
  } 
}

pad.onmousemove = (e) => {
  // 判断绘画模式已开启
    var clientX = e.clientX
    var clientY = e.clientY
    if(eraserEnable) {
      if(usingOrNot) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      }
    } else {
      if(usingOrNot) {
        var newPoint = {x: clientX, y: clientY}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
}

pad.onmouseup = (e) => {
  usingOrNot = false
}

// 使用橡皮擦
eraser.addEventListener('click', () => {
  eraserEnable = true
})