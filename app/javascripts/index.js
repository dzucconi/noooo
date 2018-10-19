import SVG from 'svg.js';

const CONFIG = {
  strokeWidth: 1,
  nWidth: 1 / 3,
  oWidth: 2 / 3,
};

const recurse = ({ draw, prevOWidth = 0, prevOHeight = 0 }) => {
  const boundingRectWidth = ((prevOWidth / 2) * Math.SQRT2);

  const offset = ((prevOWidth - boundingRectWidth) / 2);

  const boundingRect =
    draw
      .rect(
        (boundingRectWidth + offset) || window.innerWidth,
        ((prevOHeight / 2) * Math.SQRT2) || window.innerHeight
      )
      .fill('none');

  boundingRect
    .move(window.innerWidth - boundingRect.width(), 0)
    .cy(window.innerHeight / 2);

  const letterN =
    draw
      .polyline([
        [boundingRect.x(), (boundingRect.y() + boundingRect.height())],
        [boundingRect.x(), boundingRect.y()],
        [boundingRect.x() + (boundingRect.width() * CONFIG.nWidth), (boundingRect.y() + boundingRect.height())],
        [boundingRect.x() + (boundingRect.width() * CONFIG.nWidth), boundingRect.y()],
      ])
      .fill('none')
      .stroke({ width: CONFIG.strokeWidth });

  const letterO =
    draw
      .ellipse((boundingRect.width() * CONFIG.nWidth) * 2, boundingRect.height())
      .fill('none')
      .stroke({ width: CONFIG.strokeWidth })
      .move(boundingRect.x() + letterN.width(), boundingRect.y());

  if (letterO.width() < CONFIG.strokeWidth) return;

  recurse({
    draw,
    prevOWidth: letterO.width(),
    prevOHeight: letterO.height(),
  });
};

export default () => {
  const DOM = {
    app: document.getElementById('App'),
  };

  const init = () => {
    DOM.app.innerHTML = '';

    const w = window.innerWidth;
    const h = window.innerHeight;

    const draw = SVG('App').size(w, h);

    recurse({ draw });
  };

  init();
  window.addEventListener('resize', init);
};
