var Context = function(text) {
  this.lineString = text;
  this.current = null;

  this.nextToken();
};

Context.prototype.nextToken = function() {
  const reg = /^#+\s|^\d\.\s|\*+\s?|`/;
  const result = reg.exec(this.lineString);
  if (result === null) {
    this.current = this.lineString;
    this.lineString = null;
    return this.current;
  }

  // TBC
  this.current = this.lineString.slice(0, result[0].length);
  this.lineString = this.lineString.slice(result.index + result[0].length);

  return this.current;
};

Context.prototype.currentToken = function() {
  return this.current;
};

Context.prototype.skipToken = function(token) {
  if (this.current !== token) {
    Logger.log('Error: ' + token + ' is expected, but ' + this.current + ' is found.');
    return false;
  }

  this.nextToken();
  return true;
};

Context.prototype.joinRemains = function() {
  return this.lineString;
};

function main() {
  var context = new Context('aaa');
  Logger.log(context.nextToken());
}
