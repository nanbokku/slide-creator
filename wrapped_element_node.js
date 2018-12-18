// <WrappedElement> ::= <Symbol> <literal> <Symbol> | <Symbol> <WrappedElement> <Symbol>
var WrappedElementNode = function(symbol) {
  this.symbol = symbol;
  this.node = null;
};

WrappedElementNode.prototype.parse = function(context) {
  context.skipToken(this.symbol);
  let str = '';

  while (context.currentToken() !== this.symbol) {
    str += context.currentToken();
    context.nextToken();
  }

  const inner = new Context(str);
  // 太字(**)
  // 斜字(****)
};
