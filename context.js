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
  
  var properties = Slides.newPageElementProperties();
  var dimention = Slides.newDimension();
  var size = Slides.newSize();
  var transform = Slides.newAffineTransform();
  transform.scaleX = 1.0;
  transform.scaleY = 1.0;
  transform.translateX = 100;
  transform.translateY = 100;
  transform.unit = 'EMU';
  dimention.magnitude = 8000000;
  dimention.unit = 'EMU';
  size.width = dimention;
  dimention.magnitude = 2000000;
  size.height = dimention;
  properties.pageObjectId = presentation.slides[0].objectId;
  properties.size = size;
  properties.transform = transform;
  
  var request = Slides.newRequest();
  request.createShape = {"elementProperties": properties, "shapeType": 'TEXT_BOX'};

  var body = Slides.newBatchUpdatePresentationRequest();
  body.requests = new Array();
  body.requests.push(request);
  
  var response = Slides.Presentations.batchUpdate(body, presentation.presentationId);
  Logger.log(response);
  
  var request2 = Slides.newRequest();
  request2.insertText = {"objectId": response.replies[0].createShape.objectId, "text": "testtest", "insertionIndex": 0};
  Logger.log(request2);
  body.requests.push(request2);
  Slides.Presentations.batchUpdate(body, presentation.presentationId);
}
