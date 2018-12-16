// <Line> ::= <Block>* <end>
var LineNode = function() {
  
}

LineNode.prototype.parse = function(context) {
  while(true) {
    if (context.currentToken() == null) {
      break;
    } else {
      const node = new BlockNode();
      node.parse(context);
    }
  }
}