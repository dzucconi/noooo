import parameters from "queryparams";
import SVG from "svg.js";

window.parameters = parameters;

const CONFIG = parameters({
  limit: 5,
  strokeWidth: 2,
  strokeColor: "black",
  nWidth: 1 / 3,
  oWidth: 2 / 3
});

const STROKE = {
  width: CONFIG.strokeWidth,
  color: CONFIG.strokeColor
};

const recurse = ({ draw, prevOWidth = 0, prevOHeight = 0 }) => {
  const boundingRectWidth = (prevOWidth / 2) * Math.SQRT2;

  const offset = (prevOWidth - boundingRectWidth) / 2;

  const boundingRect = draw
    .rect(
      boundingRectWidth + offset || window.innerWidth - CONFIG.strokeWidth * 2,
      (prevOHeight / 2) * Math.SQRT2 ||
        window.innerHeight - CONFIG.strokeWidth * 2
    )
    .fill("none");

  boundingRect
    .move(window.innerWidth - CONFIG.strokeWidth - boundingRect.width(), 0)
    .cy(window.innerHeight / 2);

  const letterN = draw
    .polyline([
      [boundingRect.x(), boundingRect.y() + boundingRect.height()],
      [boundingRect.x(), boundingRect.y()],
      [
        boundingRect.x() + boundingRect.width() * CONFIG.nWidth,
        boundingRect.y() + boundingRect.height()
      ],
      [
        boundingRect.x() + boundingRect.width() * CONFIG.nWidth,
        boundingRect.y()
      ]
    ])
    .fill("none")
    .stroke(STROKE);

  const letterO = draw
    .ellipse(boundingRect.width() * CONFIG.nWidth * 2, boundingRect.height())
    .fill("none")
    .stroke(STROKE)
    .move(boundingRect.x() + letterN.width(), boundingRect.y());

  if (letterO.width() < CONFIG.limit) return;

  recurse({
    draw,
    prevOWidth: letterO.width(),
    prevOHeight: letterO.height()
  });
};

const DOM = {
  app: document.getElementById("App")
};

const init = () => {
  DOM.app.innerHTML = "";

  const w = window.innerWidth;
  const h = window.innerHeight;

  const draw = SVG("App").size(w, h);

  recurse({ draw });
};

init();
window.addEventListener("resize", init);
