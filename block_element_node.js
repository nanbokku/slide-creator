// <BlockElement> ::= <Symbol> " " <InlineElement>
var BlockElementNode = function(symbol) {
  this.node = null;
};

BlockElementNode.prototype.parse = function(context) {
  //context.skipToken(this.symbol);
  // 箇条書き(1. or * )
  // 見出し(# or ## or ### or...)
};
