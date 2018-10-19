import SVG from 'svg.js';

const CONFIG = {
  strokeWidth: 1,
  nWidth: 1 / 3,
  oWidth: 2 / 3,
};

const next = ({ draw, prevOWidth = 0, prevOHeight = 0 }) => {
  const boundingRectWidth = ((prevOWidth / 2) * Math.SQRT2);
  const offset = ((prevOWidth - boundingRectWidth) / 2);
  const boundingRect = draw
    .rect(
      (boundingRectWidth + offset) || window.innerWidth,
      ((prevOHeight / 2) * Math.SQRT2) || window.innerHeight
    )
    .fill('none');

  boundingRect.move(window.innerWidth - boundingRect.width(), 0).cy(window.innerHeight / 2);

  const nextN = draw
    .polyline([
      [boundingRect.x(), (boundingRect.y() + boundingRect.height())],
      [boundingRect.x(), boundingRect.y()],
      [boundingRect.x() + (boundingRect.width() * CONFIG.nWidth), (boundingRect.y() + boundingRect.height())],
      [boundingRect.x() + (boundingRect.width() * CONFIG.nWidth), boundingRect.y()],
    ])
    .fill('none').stroke({ width: CONFIG.strokeWidth });

  const nextO = draw
    .ellipse((boundingRect.width() * CONFIG.nWidth) * 2, boundingRect.height())
    .fill('none').stroke({ width: CONFIG.strokeWidth })
    .move(boundingRect.x() + nextN.width(), boundingRect.y());

  if (nextO.width() < 1) return;

  next({
    draw,
    prevOWidth: nextO.width(),
    prevOHeight: nextO.height(),
  });
};

export default () => {
  const DOM = {
    app: document.getElementById('App'),
  };

  const draw = () => {
    DOM.app.innerHTML = '';

    const w = window.innerWidth;
    const h = window.innerHeight;

    const draw = SVG('App').size(w, h);

    next({ draw });
  };

  draw();
  window.addEventListener('resize', () => draw());
};
