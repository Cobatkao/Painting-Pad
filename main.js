var pad = document.getElementById('pad')
var ctx = pad.getContext('2d')
var actions = document.getElementById('actions')

autoSetCanvasSize(pad)

listenToUser(pad)

// 使用橡皮擦
var eraserEnable = false

eraser.addEventListener('click', () => {
  eraserEnable = true
  eraser.classList.add('active')
  pen.classList.remove('active')
})

pen.addEventListener('click', () => {
  eraserEnable = false
  pen.classList.add('active')
  eraser.classList.remove('active')
})

var li = document.querySelectorAll('#colors > li')

// 控制颜色的效果
red.addEventListener('click', () => {
  ctx.strokeStyle='red'
  var arrayLi = Array.from(li)
  arrayLi.forEach((item) => {
    if(item.id == 'red') {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
})
green.addEventListener('click', () => {
  ctx.strokeStyle='green';
  var arrayLi = Array.from(li)
  arrayLi.forEach((item) => {
    if(item.id == 'green') {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
})
blue.addEventListener('click', () => {
  ctx.strokeStyle='blue';
  var arrayLi = Array.from(li)
  arrayLi.forEach((item) => {
    if(item.id == 'blue') {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
})
black.addEventListener('click', () => {
  ctx.strokeStyle='black';
  var arrayLi = Array.from(li)
  arrayLi.forEach((item) => {
    if(item.id == 'black') {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
})

// 清空canvas功能
empty.addEventListener('click', () => {
  resetCanvas()
})

// 控制线条粗细
lv1.addEventListener('click', () => {
  lineWidth = 3
})
lv2.addEventListener('click', () => {
  lineWidth = 6
})
lv3.addEventListener('click', () => {
  lineWidth = 10
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
    canvas.width = (pageWidth - 39)
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