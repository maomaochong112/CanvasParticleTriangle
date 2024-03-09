// 在 HTML 文件中创建一个 Canvas 元素
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// 设置 Canvas 的尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义三角形的顶点
const triangle = [
  { x: 100, y: 100 },
  { x: 200, y: 300 },
  { x: 300, y: 100 }
];

// 生成随机颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 初始化粒子数组
const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: getRandomColor(),
    radius: Math.random() * 2,
    angle: Math.random() * Math.PI * 2
  });
}

// 绘制函数
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制三角形
  ctx.beginPath();
  ctx.moveTo(triangle[0].x, triangle[0].y);
  ctx.lineTo(triangle[1].x, triangle[1].y);
  ctx.lineTo(triangle[2].x, triangle[2].y);
  ctx.closePath();
  ctx.stroke();

  // 绘制粒子
  particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
}

// 更新粒子位置并重绘
function update() {
  particles.forEach(particle => {
    particle.x += Math.cos(particle.angle) * 2;
    particle.y += Math.sin(particle.angle) * 2;
    // 简单的 3D 旋转动画
    particle.angle += 0.01;
    // 限制粒子在 Canvas 内部
    if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
      particle.x = canvas.width / 2;
      particle.y = canvas.height / 2;
    }
  });
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  update();
  draw();
}

// 开始动画
animate();
