Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

function walkObject( o, path ){
  for (var a,p=path.split('.'),i=0; o&&(a=p[i++]); o=o[a]);
  return o;
}
Template.registerHelper('settings', function(key){
  return walkObject(Meteor.settings, key);
});
