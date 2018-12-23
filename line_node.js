// <Line> ::= <BlockElement> <end> | <InlineElement>* <end>
var LineNode = function() {
  this.nodeList = [];
};

LineNode.prototype.parse = function(context) {
  const current = context.currentToken();
  while (true) {
    if (current === null) {
      // end
      break;
    } else if (this.isBlockElement(current)) {
      // block element
      const block = new BlockElementNode();
      block.parse(context);
      this.nodeList.push(block);
    } else {
      // inline element
      const inline = new InlineElementNode();
      inline.parse(context);
      this.nodeList.push(inline);
    }
  }
};

LineNode.prototype.isBlockElement = function(text) {
  const reg = /^#+\s|^\d\.\s|^\*\s/;
  const isblock = reg.test(text);

  return isblock;
};
