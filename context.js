var Context = function(text) {
  this.lineString = text;
  this.current = null;

  this.nextToken();
};

Context.prototype.nextToken = function() {
  const reg = /^#+\s|^\d\.\s|\*+\s?|`/;
  const result = reg.exec(this.lineString);
  if (result === null) {
    this.current = this.lineString;
    this.lineString = null;
    return this.current;
  }

  // TBC
  this.current = this.lineString.slice(0, result[0].length);
  this.lineString = this.lineString.slice(result.index + result[0].length);

  return this.current;
};

Context.prototype.currentToken = function() {
  return this.current;
};

Context.prototype.skipToken = function(token) {
  if (this.current !== token) {
    Logger.log('Error: ' + token + ' is expected, but ' + this.current + ' is found.');
    return false;
  }

  this.nextToken();
  return true;
};

Context.prototype.joinRemains = function() {
  return this.lineString;
};

function main() {
  var presentation = Slides.Presentations.get('1Fa37fPDWLtzfDF39ls8eIcqT4kULR7ICbcL4rJR65fI');
  
  var slideId = 'SLIDE_';
  var request = Slides.newRequest();
  request3.createSlide = {"objectId": (slideId + 0), "insertionIndex": 0, "slideLayoutReference": {
    "predefinedLayout": 'TITLE_AND_BODY'
  }};
  
  var body = Slides.newBatchUpdatePresentationRequest();
  body.requests = new Array();
  body.requests.push(request);
  
  var res = Slides.Presentations.batchUpdate(body, presentation.presentationId);
  Logger.log(res.replies[0].createSlide.objectId);
  
  var info = Slides.Presentations.Pages.get(presentation.presentationId, slideId + 0);
  Logger.log(info);
  var bodyEl = info.pageElements.filter(function(element) {
    return element.shape.placeholder.type === 'BODY';
  });
  
  Logger.log(bodyEl);
  
  var request2 = Slides.newRequest();
  request2.insertText = {"objectId": bodyEl[0].objectId, "text": "testtest", "insertionIndex": 0};
  body.requests.push(request2);
  
  Slides.Presentations.batchUpdate(body, presentation.presentationId);
}
