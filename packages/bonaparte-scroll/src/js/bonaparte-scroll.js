var bp = require("bonaparte-core");

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("scroll", scroll, ["content", "scrollbar (generated)"]);

///////////////////////////////////////////////////////////////////////////////
function scroll(tag){
  var content, slider, scrollbar, scrollBarVisible;

  if(bp.attribute.get(tag, "scrollbar") === "native") return;

  ///////////////////////////////////////////////////////////////////////////////
  // Initialize
  bp.tag.DOMReady(setContent);
  tag.addEventListener("bonaparte.tag.childrenChanged", setContent);

  if(bp.attribute.get(tag, "resize") !== "false")
    window.addEventListener("resize", update);

///////////////////////////////////////////////////////////////////////////////
// Public

  this.bonaparte.update = update;


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function setContent(){
    if(content === tag.firstElementChild) return;
    content = tag.firstElementChild;
    if(!content) return;
    content.addEventListener("scroll", updatePosition);
    if(tag.children.length === 1) setupScroller();
    update();
  }

///////////////////////////////////////////////////////////////////////////////

  function update(){
    if(!content || !scrollbar) return;

    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    // VISIBILITY
    if(scrollHeight <= containerHeight) {
      if(scrollBarVisible !== false) {
        scrollbar.style.opacity = 0.01;
        scrollBarVisible = false;
      }
    }
    else {
      if(scrollBarVisible !== true) {
        scrollbar.style.opacity = "";
        scrollBarVisible = true;
      }
    }

    // SLIDER SIZE / POSITION
    updatePosition();

  }

///////////////////////////////////////////////////////////////////////////////

  function updatePosition(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    var sliderSize = Math.min(1, Math.max( 0.05, map(scrollHeight/containerHeight, 1, 5, 1, 0.05)));

    var position = scrollHeight-containerHeight > 0 ? content.scrollTop / (scrollHeight-containerHeight) : 0;
    var top = map(position, 0, 1, 0, containerHeight-(containerHeight*sliderSize));

    slider.style.height=(100*sliderSize)+"%";
    slider.style.top=top+"px";
  }

///////////////////////////////////////////////////////////////////////////////

  function setupScroller(){
    // Remove/Hide native Scrollbar
    scrollBarWidth = scrollBarWidth || getScrollBarWidth();
    content.style.marginRight = -scrollBarWidth+"px";
    content.style.paddingRight = scrollBarWidth+"px";

    slider = document.createElement("div")
    slider.setAttribute("class", "slider");

    scrollbar = document.createElement("div")
    scrollbar.setAttribute("class", "scrollbar");
    scrollbar.appendChild(slider);

    tag.appendChild(scrollbar);

  }

///////////////////////////////////////////////////////////////////////////////
// x: current Value,
// cMin: current range min,
// cMax: current range max,
// tMin: target range min,
// tMax: target range max,
// easingFunction: easingFunction (string)

  function map(x, cMin, cMax, tMin, tMax, easingFunction) {
    easingFunction = typeof easing === "object" && easing[easingFunction] !== undefined ?
      easing[easingFunction] :
      function (t, b, c, d) { return b+c*(t/=d) };
    if(x===0) return tMin;
    return easingFunction(x-cMin, tMin, tMax-tMin, cMax-cMin);
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function getScrollBarWidth(){
  var width = document.body.clientWidth;
  var overflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "scroll";
  width -= document.body.clientWidth;
  document.documentElement.style.overflow = overflow;
  return width;
}
