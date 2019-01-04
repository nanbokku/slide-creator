// <BlockElement> ::= <Symbol> <InlineElement>
var BlockElementNode = function() {
  this.node = null;
  this.objectId = '';
};

BlockElementNode.prototype.parse = function(context) {
  const symbol = context.currentToken();
  if (/^#+\s/.test(symbol)) {
    // header
    this.node = new HeaderElementNode();
    this.node.parse(context);
  } else if (/^\d\.\s/.test(symbol)) {
    // ordered list
  } else if (/^\*+\s/.test(symbol)) {
    // unordered list
  }
  //context.skipToken(this.symbol);
  // 箇条書き(1. or * )
  // 見出し(# or ## or ### or...)
};