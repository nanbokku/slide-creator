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
  request.createSlide = {
    "objectId": (slideId + 0),
    "insertionIndex": 0,
    "slideLayoutReference": {
      "predefinedLayout": 'TITLE_AND_BODY'
    },
    "placeholderIdMappings": [
      {
        "objectId": slideId + 0 + 'BODY',
        "layoutPlaceholder": {
          "type": 'BODY',
          "index": 0,
        },
      },
      {
        "objectId": slideId + 0 + 'TITLE',
        "layoutPlaceholder": {
          "type": 'TITLE',
          "index": 0,
        }
      }
    ]
  };
  
  var body = Slides.newBatchUpdatePresentationRequest();
  body.requests = new Array();
  body.requests.push(request);
  
  var request2 = Slides.newRequest();
  request2.insertText = {"objectId": slideId + 0 + 'TITLE', "text": "testtest", "insertionIndex": 0};
  body.requests.push(request2);
  
  var res = Slides.Presentations.batchUpdate(body, presentation.presentationId);
  Logger.log(res.replies[0].createSlide.objectId);
}
