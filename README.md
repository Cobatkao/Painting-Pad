# Painting-Pad

> Draw anything your want | a simple drawing tool via Canvas & Plain Javascript

**keywords**: Canvas、plain javascript

# 细节

## 画笔轨迹问题

浏览器触发画笔的`onmousedown`事件的事件间隔过大，若画笔移动过快，则线条不连贯，频繁出现断点，如下图：

![pic](https://ws2.sinaimg.cn/large/006tNbRwgy1fw92qccmazj309y04qjra.jpg)

1. 点（圆的半径）和线条宽度（lineWidth）大小相同，或前者小于后者；
2. 其次，用线条将每两次之间移动造成的不连贯点连起来，再把当前点作为上一个点和下一个点连线，这样画出来的就是一条连贯的直线；

## 画笔与橡皮按钮切换

不推荐使用js来写，尽量让一个按钮做一件事情，简化代码，所以控制css的display来做。

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

## 移动端上下滑动屏幕会抖动

禁用滚动即可。

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

调用api：`toDataURL("image/png")`