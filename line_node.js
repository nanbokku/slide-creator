// <Line> ::= <BlockElement> <end> | <InlineElement>* <end>
var LineNode = function(slideIndex) {
  this.slideIndex = slideIndex;
  this.nodeList = [];
  this.requests = [];
};

LineNode.prototype.parse = function(context) {
  const current = context.currentToken();

  while (true) {
    if (current === null) {
      // end
      break;
    } else if (this.isBlockElement(current)) {
      // block element
      const block = new BlockElementNode(this.slideIndex);
      this.slideIndex = block.parse(context);
      //const reqs = block.getRequests(context);
      //this.requests = this.requests.concat(reqs);
      this.nodeList.push(block);
    } else {
      // inline element
      const inline = new InlineElementNode(this.slideIndex);
      inline.parse(context);
      //inline.getRequests(context);
      this.nodeList.push(inline);
    }
  }
  
  return this.slideIndex;
};

LineNode.prototype.getRequests = function() {
  var reqs = [];
  this.nodeList.forEach(function(node) {
    reqs.concat(node.getRequests());
  });
  
  return reqs;
}

LineNode.prototype.isBlockElement = function(text) {
  const reg = /^#+\s|^\d\.\s|^\*\s/;
  const isblock = reg.test(text);

  return isblock;
};
