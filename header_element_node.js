var HeaderElementNode = function() {
  this.literal = '';
  this.size = 10;
  this.objectId = '';
  this.slideIndex;
};

HeaderElementNode.prototype.parse = function(context) {
  const symbol = context.currentToken();
  const count = counter(symbol);

  context.skipToken(symbol);
  this.literal = context.joinRemains();

  switch (count) {
    case 1:
      // set character size
      break;
    case 2:
      break;
  }
};

HeaderElementNode.prototype.counter = function(symbol) {
  return symbol.split('#').length - 1;
};

HeaderElementNode.prototype.getRequest = function() {
  const slideId = "SLIDE_";
  
  const request = Slides.newRequest();
  request.createSlide = {
    "objectId": slideId + this.slideIndex,
    "insertionIndex": this.slideIndex,
    "slideLayoutReference": {"predefinedLayout": 'TITLE'}
};

  const style = Slides.newTextStyle(Slides.newSize({"magnitude": this.size, "unit": 'EMU'}));
  const range = Slides.newRange({"type": 'ALL'});
  //const request = Slides.newRequest().updateTextStyle({"objectId": this.objectId, "style": style, "textRange": range, "fields": "textSize"});

  return request;
};
