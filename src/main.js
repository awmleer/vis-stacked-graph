let data = [
  [100, 30, 20, 50, 20, 60],
  [30, 20, 10, 40, 0, 10],
];

let x = [0, 20, 40, 60, 80, 100];

const colors = [
  '#00aa00',
  '#aa0000',
]

let canvas = document.getElementById('stacked-graph');
let ctx = canvas.getContext('2d');
// ctx.fillStyle = 'rgb(200, 0, 0)';
// ctx.fillRect(10, 10, 50, 50);

// ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
// ctx.fillRect(30, 30, 50, 50);

data.forEach((points, index) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x[0], points[0]);
  let i;
  for (i = 1; i < points.length - 2; i ++) {
    var xc = (x[i] + x[i+1]) / 2;
    var yc = (points[i] + points[i + 1]) / 2;
    ctx.quadraticCurveTo(x[i], points[i], xc, yc);
  }
  ctx.quadraticCurveTo(x[i], points[i], x[i+1], points[i+1]);
  ctx.lineTo(x[i+1], 0);
  ctx.closePath();
  ctx.fillStyle = colors[index];
  ctx.fill();
  ctx.stroke();
})


// ctx.moveTo(x[0], data[0][0])
// ctx.lineTo(x[0], data[1][0])
// ctx.moveTo(x[5], data[0][5])
// ctx.lineTo(x[5], data[1][5])



// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.quadraticCurveTo(20, 100, 200, 20);
// ctx.stroke();
