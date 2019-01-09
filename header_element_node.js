var HeaderElementNode = function(slideIndex) {
  this.literal = '';
  this.slideIndex = slieIndex;
  this.requests = [];
};

HeaderElementNode.prototype.parse = function(context) {
  const symbol = context.currentToken();
  const count = counter(symbol);

  context.skipToken(symbol);
  this.literal = context.joinRemains();

  switch (count) {
    case 1:
      this.requests.push(this.getRequest('TITLE'));
    case 2:
      this.requests.push(this.getRequest('TITLE_AND_BODY'));
  }
  
  return this.slideIndex;
};

HeaderElementNode.prototype.getRequests = function() {
  return this.requests;
}

HeaderElementNode.prototype.counter = function(symbol) {
  return symbol.split('#').length - 1;
};

HeaderElementNode.prototype.createSlide = function(layout) {
  const slideId = "SLIDE_";
  
  const request = Slides.newRequest();
  if (layout === 'TITLE_AND_BODY') {
  request.createSlide = {
    "objectId": (slideId + this.slideIndex),
    "insertionIndex": this.slideIndex,
    "slideLayoutReference": {
      "predefinedLayout": 'TITLE_AND_BODY'
    },
    "placeholderIdMappings": [
      {
        "objectId": slideId + this.slideIndex + 'BODY',
        "layoutPlaceholder": {
          "type": 'BODY',
          "index": 0,
        },
      },
      {
        "objectId": slideId + this.slideIndex + 'TITLE',
        "layoutPlaceholder": {
          "type": 'TITLE',
          "index": 0,
        }
      }
    ]
  };
  } else if(layout === 'TITLE') {
  request.createSlide = {
    "objectId": (slideId + this.slideIndex),
    "insertionIndex": this.slideIndex,
    "slideLayoutReference": {
      "predefinedLayout": 'TITLE'
    },
    "placeholderIdMappings": [
      {
        "objectId": slideId + this.slideIndex + 'TITLE',
        "layoutPlaceholder": {
          "type": 'TITLE',
          "index": 0,
        }
      }
    ]
  };
  }
  
  return request;
}

HeaderElementNode.prototype.getRequest = function(layout) {  
  const request = this.createSlide(layout);
  request.insertText = {"objectId": slideId + this.slideIndex + 'TITLE', "text": this.literal, "insertionIndex": 0};
  
  return request;
};
