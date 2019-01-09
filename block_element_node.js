// <BlockElement> ::= <Symbol> <InlineElement>
var BlockElementNode = function(slideIndex) {
  this.node = null;
  this.slideIndex = slideIndex;
  this.requests = [];
};

BlockElementNode.prototype.parse = function(context) {
  const symbol = context.currentToken();
  if (/^#+\s/.test(symbol)) {
    // header
    this.slideIndex++;
    // TODO: slideIndexの更新を通知する
    this.node = new HeaderElementNode(this.slideIndex);
    this.node.parse(context);
  } else if (/^\d\.\s/.test(symbol)) {
    // ordered list
  } else if (/^\*+\s/.test(symbol)) {
    // unordered list
  }
  //context.skipToken(this.symbol);
  // 箇条書き(1. or * )
  // 見出し(# or ## or ### or...)
  
  return this.slideIndex;
};

BlockElementNode.prototype.getRequests = function() {
  return this.node.getRequests();
}