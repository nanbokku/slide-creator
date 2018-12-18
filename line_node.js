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
      const node = new BlockElementNode();
      node.parse(context);
      this.nodeList.push(node);
    } else {
      // inline element
      const node = new InlineElementNode();
      node.parse(context);
      this.nodeList.push(node);
    }
  }
};

LineNode.prototype.isBlockElement = function(text) {
  const reg = /^#+\s|^\d\.\s|^\*\s/;
  const isblock = reg.test(text);

  return isblock;
};
