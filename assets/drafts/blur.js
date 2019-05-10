function blur() {
  context.fillStyle = 'rgb(249, 195, 182)';
  context.fillRect(0, 0, width, height);

  context.arc(width / 2, height / 2 + 50, 70, 0, Math.PI, false);
  context.fillStyle = 'rgba(233, 244, 249, 1)';
  context.fill();

  for (let i = 0; i < 60; i++) {
    context.beginPath();
    context.filter = `blur(${1 + i * 5}px)`;
    context.arc(0 + i * 5, height + 50 - i * 10, 70, 0, Math.PI * 2, false);
    context.fillStyle = `rgba(182, 206, 235, ${1 - i * 0.05})`;

    context.fill();
  }
}
