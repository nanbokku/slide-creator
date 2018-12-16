var Context = function(text) {
  this.lineString = text;
  this.current = null;
  
  this.nextBlock();
}

Context.prototype.nextBlock = function() {
  const reg = /^#+\s|^\d\.\s|\*+|`/;
  const result = reg.exec(this.lineString);
  if (result === null) {
    return null;
  }
  
  this.current = this.lineString.slice(0, result[0].length);
  this.lineString = this.lineString.slice(result.index + result[0].length);
  
  return this.current;
}

Context.prototype.currentBlock = function() {
  return this.current;
}

function main() {
  var context = new Context("`**kk*");
  Logger.log(context.nextBlock());
}