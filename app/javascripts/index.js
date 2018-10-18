const toNode = html =>
  new DOMParser().parseFromString(html, 'text/html').body.firstChild;


export default () => {
  const DOM = {
    app: document.getElementById('App'),
  };

  const canvas = toNode(`
    <canvas></canvas>
  `);

  DOM.app.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const draw = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const nw = w / 3;
    const ow = w - nw;

    canvas.width = w;
    canvas.height = h;

    ctx.lineWidth = 25;

    const drawTo = (x, y) => {
      ctx.lineTo(x, y);
      ctx.moveTo(x, y);
    };

    const N = () => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      drawTo(0, 0);
      drawTo(nw, h);
      drawTo(nw, 0);
      ctx.stroke();
    };

    const O = () => {
      ctx.beginPath();
      ctx.ellipse(((ow / 2) + nw), (h / 2), (ow / 2), (h / 2), 0, 0, 2 * Math.PI);
      ctx.stroke();
    };

    N();
    O();
  };

  draw();
  window.addEventListener('resize', () => draw());
};
