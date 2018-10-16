var pad = document.getElementById('pad')
var ctx = pad.getContext('2d')
var actions = document.getElementById('actions')
var li = document.querySelectorAll('#colors > li')
var svg = document.querySelectorAll('#actions > svg')
var palette = document.getElementById('palette')
var lineWidth = 2

autoSetCanvasSize(pad)

resetCanvas()

listenToUser(pad)

// 画笔放大效果函数
function ZoomInTools(i) {
  var ArraySvg = Array.from(svg)
  ArraySvg.forEach((item) => {
    if(item.id == i) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}

// 调色效果切换函数
function colorSwitch(color) {
  ctx.strokeStyle = drow() || color
  var arrayLi = Array.from(li)
  arrayLi.forEach((item) => {
    if(item.id == color) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}

// 清空canvas功能
empty.addEventListener('click', () => {
  resetCanvas()
})

function listenToUser(canvas) {
  // 模式切换
  var usingOrNot = false
  // 记录上一个点
  var lastPoint = {x: undefined, y: undefined}

  // 特性检测
  if(document.body.ontouchstart !== undefined) {
    // 触屏设别
    canvas.ontouchstart = (e) => {
      // 防止默认滚动
      e.preventDefault()

      // 绘画模式激活
      usingOrNot = true
      var clientX = e.touches[0].clientX
      var clientY = e.touches[0].clientY
      
      if(eraserEnable) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      } else {
        lastPoint = {x: clientX, y: clientY}
      }
    }
    canvas.ontouchmove = (e) => {
      // 判断绘画模式已开启
        var clientX = e.touches[0].clientX
        var clientY = e.touches[0].clientY

        if(!usingOrNot) {return}
        if(eraserEnable) {
            ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
          } else {
          var newPoint = {x: clientX, y: clientY}
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    }
    canvas.ontouchend = (e) => {
      usingOrNot = false
    }
  } else {
    // 非触屏设备
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
    // 扣除工具栏宽度
    canvas.width = (pageWidth - 49)
  }
}

// 画线
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2)
  // 宽度取当前宽度
  ctx.lineWidth = lineWidth
  ctx.stroke();
  ctx.closePath();
}

function resetCanvas() {
  // pad.width = pad.width
  ctx.fillStyle = "#fff";
  ctx.beginPath();  
  ctx.fillRect(0, 0, pad.width, pad.height);
  ctx.closePath();  
}

/* 功能按钮事件监听 */
var eraserEnable = false

pencil.addEventListener('click', () => {
  ZoomInTools('pencil')
})
pen.addEventListener('click', () => {
  ZoomInTools('pen')
})
brush.addEventListener('click', () => {
  ZoomInTools('brush')
})
eraser.addEventListener('click', () => {
  eraserEnable = true
  ZoomInTools('eraser')
})

pencil.addEventListener('click', () => {
  lineWidth = 2
  console.log('pencil')
})
pen.addEventListener('click', () => {
  lineWidth = 4
  console.log('pen')
})
brush.addEventListener('click', () => {
  lineWidth = 6
  console.log('brush')
})

// 控制颜色的效果
red.addEventListener('click', () => {
  colorSwitch('red')
})
green.addEventListener('click', () => {
  colorSwitch('green')
})
blue.addEventListener('click', () => {
  colorSwitch('blue')
})
black.addEventListener('click', () => {
  colorSwitch('black')
})

function drow() {
  palette.onclick = function() {
    palette.click()
    console.log(this.value)
    ctx.strokeStyle = this.value
    ctx.stroke()
  }
}

// 保存功能
save.addEventListener('click', () => {
  var url = pad.toDataURL("image/png")
  var tagA = document.createElement('a')
  tagA.href = url
  document.body.appendChild(tagA)
  tagA.download = '我的画板'
  tagA.target = '_blank'
  tagA.click()
})