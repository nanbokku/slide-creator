/*
function main() {
  const presentation = Slides.Presentations.get('1Fa37fPDWLtzfDF39ls8eIcqT4kULR7ICbcL4rJR65fI');
  var slideIndex = 0;
  
  var contents = DriveApp.getFolderById('1R6_FPRlONRFdyTRluIXs0w6hC1tMy6Q_').getFilesByName('test.md').next().getBlob().getDataAsString('utf-8').split(/[\s]+/);
  Logger.log(contents);
  
  contents.forEach(function(line) {
    const lineNode = new LineNode(slideIndex);
    const context = new Context(line);
    
    slideIndex = lineNode.parse(context);
    const reqs = lineNode.getRequests();
    var body = Slides.newBatchUpdatePresentationRequest();
    body.requests = reqs;
    
    Slides.Presentations.batchUpdate(body, presentation.presentationId);
  });
}
*/