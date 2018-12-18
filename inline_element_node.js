// <InlineElement> ::= <WrappedElement> | <literal>
var InlineElementNode = function() {
  this.node = null;
};

InlineElementNode.prototype.parse = function(context) {
  const current = context.currentToken();
  let symbol = null;
  if ((symbol = this.isWrappedElement(current, context))) {
    // wrapped element
    this.node = new WrappedElementNode(symbol);
    this.node.parse(context);
  } else {
    // literal
    this.node = new LiteralNode();
    this.node.parse(context);
  }
};

InlineElementNode.prototype.isWrappedElement = function(text, context) {
  const reg = /^\*+(?!\s)|`/g;
  const result = reg.exec(text);
  if (result === null) {
    return null;
  }

  // search same symbol in context
  const symbol = new RegExp(result[0], 'g');
  const symbolList = symbol.exec(context.joinRemains());
  const same = symbolList.filter(str => {
    return str === result[0];
  });
  if (same.length < 2) {
    return null;
  }

  return result[0];
};
