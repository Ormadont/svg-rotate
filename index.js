const root = document.getElementById('root');
const scaled = document.getElementById('scaled');

const sMatrix = scaled.getCTM();

const {
    x,
    y,
    width,
    height
} = scaled.getBBox();

 const pt = root.createSVGPoint();
 pt.x = x + width / 2;
 pt.y = y + height / 2;

// применяем трансформацию элемента к координатам центра
// и находим координаты центра относительно документа
const elCenter = pt.matrixTransform(sMatrix);

// const centerPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

// centerPoint.cx.baseVal.value = elCenter.x;
// centerPoint.cy.baseVal.value = elCenter.y;
// centerPoint.r.baseVal.value = 2;
// root.appendChild(centerPoint);


function rotate(el, matrix, radians, center) {

  const translateMatrix = createSVGMatrix(),
    rotateMatrix = createSVGMatrix();

  const cos = Math.cos(radians),
    sin = Math.sin(radians);

  rotateMatrix.a = cos;
  rotateMatrix.b = sin;
  rotateMatrix.c = -sin;
  rotateMatrix.d = cos;
  
  translateMatrix.e = center.x;
  translateMatrix.f = center.y;

// составляем матрицу вращения вокруг центра фигуры
// translate(cx cy) X rotate(deg) X translate(-cx -cy)
 const rMatrix = translateMatrix
    .multiply(rotateMatrix)
    .multiply(translateMatrix.inverse());
    
 // применяем к текущей матрице
 // rotate(deg, cx, cy) X CTM
  const elMatrix = rMatrix.multiply(matrix);

  el.setAttribute(
    'transform',
    matrixToString(elMatrix)
  );
}

function matrixToString(m) {
  return `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`;
}

function createSVGMatrix() {
  return document
    .createElementNS('http://www.w3.org/2000/svg', 'svg')
    .createSVGMatrix();
}

let r = 0;

setInterval(() => {
  rotate(scaled, sMatrix, r, elCenter);
  r += 0.1;
}, 150)

// https://ru.stackoverflow.com/questions/970063/%D0%92%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-svg-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%B2%D0%BE%D0%BA%D1%80%D1%83%D0%B3-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0