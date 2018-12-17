const textarea = document.getElementById('textarea-data');
textarea.value = `
[
  [100, 30, 20, 50, 20, 60, 40, 10, 0, 20, 30],
  [30, 20, 10, 40, 0, 10, 20, 50, 30, 80, 60],
  [0, 0, 20, 30, 20, 10, 0, 30, 80, 10, 0],
  [50, 50, 20, 30, 80, 20, 10, 50, 0, 100, 50]
]
`;

let x = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

const colors = [
  '#00aa00',
  '#aa0000',
  '#0000aa',
  '#333333',
  '#ffffff',
]

let canvas = document.getElementById('stacked-graph');
let ctx = canvas.getContext('2d');

ctx.translate(0, canvas.height/2);
ctx.scale(1, -1);


function draw(data) {
  data.forEach((points, index) => {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2 + 1);
    ctx.lineTo(x[0], points[0]);
    let i;
    for (i = 1; i < points.length - 2; i ++) {
      var xc = (x[i] + x[i+1]) / 2;
      var yc = (points[i] + points[i + 1]) / 2;
      ctx.quadraticCurveTo(x[i], points[i], xc, yc);
    }
    ctx.quadraticCurveTo(x[i], points[i], x[i+1], points[i+1]);
    ctx.lineTo(x[i+1], canvas.height/2 + 1);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();
    ctx.stroke();
  })
}

function reduceWiggle(data) {
  const n = data.length;
  const g0 = [];
  let g = 0;
  for (let x = 0; x < data[0].length; x++) {
    data.forEach((points, index) => {
      const i = index + 1;
      g += (n - i + 1) * points[x];
    })
    g = -g / (n+1);
    g0.push(g);
  }
  return g0;
}

function normalize(data) {
  const g0 = reduceWiggle(data);
  const normalizedData = [ g0 ];
  data.forEach((points, i) => {
    normalizedData[i+1] = [];
    points.forEach((point, j) => {
      normalizedData[i+1][j] = normalizedData[i][j] + point;
    })
  })
  // let max = 0, min = 0;
  // normalizedData.forEach((points) => {
  //   points.forEach((point) => {
  //     if (point > max) max = point;
  //     if (point < min) min = point;
  //   })
  // })
  // const scale = canvas.height / (max - min);
  // const translate = -(max + min);
  // console.log(scale, translate);
  // normalizedData.forEach((points) => {
  //   points.forEach((point, j) => {
  //     points[j] = (point + translate) * scale;
  //   })
  // })
  return normalizedData;
}


function apply() {
  // console.log(textarea.value);
  const data = JSON.parse(textarea.value);
  const normalizedData = normalize(data);
  draw(normalizedData);
}

apply();
