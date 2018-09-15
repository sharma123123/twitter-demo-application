
var _ = require('underscore');
// var str = "Hi @vivek how are you @shikha";
// var p1=parseMentions(str);
// console.log(p1);


function parseMentions(text) {
    var mentionsRegex = new RegExp('@([a-zA-Z0-9\_\.]+)', 'gim');

    var matches = text.match(mentionsRegex);
    if (matches && matches.length) {
        matches = matches.map(function(match) {
            return match.slice(1);
        });
        return _.uniq(matches);
    } else {
        return [];
    }
}

module.exports={
  parseMentions

}
