Accounts.emailTemplates.siteName = "We Work Meteor";
Accounts.emailTemplates.from = FROM_EMAIL;

Accounts.onCreateUser(function(options, user) {
  if (options.profile){
    user.profile = options.profile;
  } else {
    user.profile = {};
  }
  user.profile.tags = 'iwant'

  var email = getUserEmail(user);
  if(email){
  	user.emailHash = CryptoJS.MD5(email.trim().toLowerCase()).toString();
  }

  return user;
});
