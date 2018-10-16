# 🎨Painting-Pad | 移动端

> Draw anything your want | a simple drawing tool via Canvas & Plain Javascript

**keywords**: Canvas、plain javascript、移动端适配、特性检测

# 简述

使用原生js实现画板应用，通过调用html5 Canvas API，实现了以下功能：
- 调整🖌️粗细
- 调色🎨
- 橡皮擦
- 清屏
- 下载画布保存为png
- 移动端触屏设备兼容

源码链接：https://github.com/Cobatkao/Painting-Pad

预览链接：http://isaacgao.cn/Painting-Pad/pad.html

# 细节

## canvas提供的画图api

1. 使用canvas
```javascript
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
```

2. 封装一个画实心圆的函数
```javascript
function drawCircle(x, y, r) {
  context.beginPath()
  context.arc(x,y,r,0,Math.PI*2)
  context.fill();
}
```
3. 封装一个画线的函数
```javascript
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
```
4. 橡皮擦
```javascript
eraser.addEventListener('click', () => {
  eraserEnable = true // key
  eraser.classList.add('active')
  pen.classList.remove('active')
})

pen.addEventListener('click', () => {
  eraserEnable = false // key
  pen.classList.add('active')
  eraser.classList.remove('active')
})

if(eraserEnable) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      } else ...
```
利用一个变量来控制橡皮擦按钮的开关，进而进行操作，使其与画线功能分开。

5. 🎨封装调色板效果切换函数
```javascript
// 调色效果切换
function colorSwitch(color) {
  ctx.strokeStyle = color;
  var arrayLi = Array.from(li)
  arrayLi.forEach((item) => {
    if(item.id == color) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}
```
⚠️ forEach前面的元素必须是nodelist，是类数组对象，且要将其转换为数组才能遍历。具体可参考我的一篇博客：[摸清类数组对象和arguments
](http://blog.leanote.com/post/isaacgao/%E6%91%B8%E6%B8%85%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E5%92%8Carguments)

## 画笔轨迹问题

浏览器触发画笔的`onmousedown`事件的事件间隔过大，若画笔移动过快，则线条不连贯，频繁出现断点，如下图：

![pic](https://ws2.sinaimg.cn/large/006tNbRwgy1fw92qccmazj309y04qjra.jpg)

1. 点（圆的半径）和线条宽度（lineWidth）大小相同，或前者小于后者；
2. 其次，用线条将每两次之间移动造成的不连贯点连起来，再把当前点作为上一个点和下一个点连线，这样画出来的就是一条连贯的直线；

## 画笔与橡皮按钮切换

不推荐使用js来写，尽量让一个按钮做一件事情，简化代码，所以控制css的display属性来做。

## 清空画布

```javascript
function resetCanvas() {
  // 方法1: 直接重置canvas画布
  pad.width = pad.width
```
```javascript
  // 方法2: 用clearRect清空画布前
  cxt.fillStyle = "#000";
  cxt.beginPath();  
  cxt.fillRect(0, 0, pad.width, pad.height);  
  cxt.closePath();  
}
```

## 移动端上下滑动屏幕会抖动

禁用滚动即可，通过js实现：
```javascript
canvas.ontouchstart = (e) => {
      // 防止默认滚动
      e.preventDefault() //key
```

## 用变量来表示状态

1. 记录线条粗细
2. 记录按钮状态，控制逻辑

## 函数封装

这个项目中自己封装了两个函数`resetCanvas()`，`xxx()`

# 知识点

## 鼠标/触摸事件

PC端
- `onmousedown`: 鼠标被按下
- `onmousemove`: 鼠标被移动
- `onmouseup`: 鼠标被松开时

鼠标点击事件的clientX/Y的距离是相对于视口的位置，而不是canvas的位置。

移动端
- `touchstart`
- `touchmove`
- `touchend`

触摸事件的clientX/Y api在touches中，因为触屏设备多点触控的原因，touches是一个哈希，`e.touches[0].clientX`。

## ⚠️ 监听视口宽高
```javascript
// @param canvas画布元素 
function autoSetCanvasSize(canvas) {
  assignSize()

  window.onresize = (e) => {
    assignSize()
  }

  function assignSize() {
    // 页面宽高api
    var pageHeight = document.documentElement.clientHeight
    var pageWidth = document.documentElement.clientWidth
    canvas.height = pageHeight
    // 扣除工具栏宽度
    canvas.width = (pageWidth - 39)
  }
}
```
canvas无法通过css设置宽高，就算设置了也仅是起到同比放大作用；因此需要监听视口宽高，如果窗口变化了，可以调用这个函数重新设置canvas的**宽高属性**，使其始终和视口保持相同尺寸。

## 特性检测

通过特性检测，来决定事件是touch还是mouse。

如果设备支持touch事件，就用touch，反之，使用mouse。
- 若设备不支持touch事件，则`canvas.ontouchstart`返回`undefined`，所以使用`undefined`来做判断；

```javascript
// 特性检测
if(document.body.ontouchstart !== undefined) {
  ...触屏设别，执行鼠标事件
  } else {
    ...非触屏设备
  }
```

## canvas保存图片

调用api：`toDataURL("image/png")`，图片将会被转换为base64字符串的形式展示出来。

```javascript
save.addEventListener('click', () => {
  var url = pad.toDataURL("image/png")
  var tagA = document.createElement('a')
  tagA.href = url
  document.body.appendChild(tagA)
  tagA.download = 'your_sample'
  tagA.click()
})
```

⚠️ 下载后的图片背景色是透明的，因此需要在绘图动作之前先重置一次画布！

## 🌿局域网调试

1. 确保手机和电脑在同个wifi环境下
2. 查看电脑ipv4地址
3. 在手机浏览器中打开ipv4