/*
function main() {
  var presentation = Slides.Presentations.get('1Fa37fPDWLtzfDF39ls8eIcqT4kULR7ICbcL4rJR65fI');
  var slideIndex = 0;
  
  var contents = DriveApp.getFolderById('1R6_FPRlONRFdyTRluIXs0w6hC1tMy6Q_').getFilesByName('test.md').next().getBlob().getDataAsString('utf-8').split(/[\s]+/);
  Logger.log(contents);
  
  contents.forEach(function(line) {
    var lineNode = new LineNode(slideIndex);
    var context = new Context(line);
    
    const reqs = lineNode.getRequests(context);
    var body = Slides.newBatchUpdatePresentationRequest();
    body.requests = reqs;
    
    Slides.Presentations.batchUpdate(body, presentation.presentationId);
  });
}
*/