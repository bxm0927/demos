/*
 * Canvas Utils
 * @see https://github.com/bxm0927/html5-demos
 * @Author: xiaoming.bai
 * @Date: 2021-01-17
 */

/**
 * π
 */
export const PI = Math.PI

/**
 * 角度转换成弧度
 * 弧度 = (Math.PI / 180) * 角度
 * @param {Number} angle 角度
 */
export const angle2radians = (angle) => (Math.PI / 180) * angle

/**
 * 绘制圆角矩形
 * @param {*} ctx Canvas 对象
 * @param {*} x 起点坐标 x
 * @param {*} y 起点坐标 y
 * @param {*} w 矩形的宽
 * @param {*} h 矩形的高
 * @param {*} r 半径
 */
export const drawRoundRect = (ctx, x, y, w, h, r) => {
  if (w < 2 * r) {
    r = w / 2
  }
  if (h < 2 * r) {
    r = h / 2
  }
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * 返回画布中指定位置的颜色 (RGB 格式)
 * @param {*} ctx Canvas 对象
 * @param {*} x
 * @param {*} y
 */
export const getPixelColor = (ctx, x, y) => {
  const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data
  return { r, g, b, a }
}

/**
 * 返回画布中特定颜色 (RGB 格式) 的像素数量
 * @param {*} canvas
 * @param {*} r red
 * @param {*} g green
 * @param {*} b blue
 */
export const getPixelAmount = (ctx, r, g, b) => {
  const pixelsData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  let amount = 0
  for (i = 0; i < pixelsData.length; i += 4) {
    if (pixelsData[i] === r && pixelsData[i + 1] === g && pixelsData[i + 2] === b) {
      amount++
    }
  }
  return amount
}

/**
 * 将 img 图片转换为 canvas 画布，并返回新的 canvas 元素
 * drawImage: https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
 * @param {Element} image
 */
export const convertImageToCanvas = (image) => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  canvas.getContext('2d').drawImage(image, 0, 0)
  return canvas
}

/**
 * 将 canvas 画布转换为 img 图片，并返回新的 img 元素
 * toDataURL: https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
 * @param {Element} canvas
 */
export const convertCanvasToImage = (canvas, encoderOptions = 'image/png') => {
  const image = new Image()
  image.src = canvas.toDataURL(encoderOptions)
  return image
}

/**
 * 判断某个坐标是否位于某个部件内部 (射线法)
 * @param {Object} point { x: offsetX, y: offsetY }
 * @param {Array} polylinePoints [[0, 0], [100, 0], [100, 100], [0, 100]]
 */
export const checkPointInPolyline = (point, polylinePoints) => {
  let leftSide = 0
  const A = point
  for (let i = 0; i < polylinePoints.length; i++) {
    let B, C
    if (i === polylinePoints.length - 1) {
      B = {
        x: polylinePoints[i][0],
        y: polylinePoints[i][1],
      }
      C = {
        x: polylinePoints[0][0],
        y: polylinePoints[0][1],
      }
    } else {
      B = {
        x: polylinePoints[i][0],
        y: polylinePoints[i][1],
      }
      C = {
        x: polylinePoints[i + 1][0],
        y: polylinePoints[i + 1][1],
      }
    }
    // 判断左侧相交
    let sortByY = [B.y, C.y].sort((a, b) => a - b)
    if (sortByY[0] < A.y && sortByY[1] > A.y) {
      if (B.x < A.x || C.x < A.x) {
        leftSide++
      }
    }
  }
  return leftSide % 2 === 1
}

/**
 * 绘制多行文本，支持超出省略
 * @param {*} ctx Canvas 对象
 * @param {*} text 要绘制的字符串
 * @param {*} x 起始坐标 x
 * @param {*} y 起始坐标 y
 * @param {*} maxWidth 每行最大宽度
 * @param {*} maxLines 最大行数，为空则不限制
 * @param {*} lineHeight 行高，一般可设置为 fontSize 的 1.5 倍
 */
export const drawMultilineText = (ctx, text, x, y, maxWidth, maxLines, lineHeight) => {
  let row = 1
  let lineWidth = 0
  let startIndex = 0

  for (let i = 0; i < text.length; i++) {
    lineWidth += ctx.measureText(text[i]).width
    if (lineWidth > maxWidth) {
      let lineText = text.substring(startIndex, i + 1)

      // 超出省略
      row++
      if (maxLines && row > maxLines && text.length > i) {
        lineText = text.substring(startIndex, i) + '...'
      }

      ctx.fillText(lineText, x, y)
      y += lineHeight
      lineWidth = 0
      startIndex = i + 1
      if (maxLines && row > maxLines) {
        break
      }
    }

    if (i === text.length - 1) {
      ctx.fillText(text.substring(startIndex, i + 1), x, y)
    }
  }
}
