AutoForm.addHooks(['userProfileEdit'], {
	after: {
		update: function(error, result) {
			if (error) {
				console.log(error);
			} else {
				GAnalytics.event("userProfile", "edit", getUserName(Meteor.user()));
				Modal.hide("userProfile");
			}
		}
	}
});

Template.userProfile.events({
	'click #cancel':function(event, template){
		event.preventDefault();
    	Modal.hide("userProfile");
	}
});

Template.userProfile.rendered = function(){

    // Get an array of the existing tags
    var tagOptions = Tags.find().fetch();

    $('#tags').selectize({
        delimiter: ',',
        persist: false,
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        create: true, // TODO: Add entries to Tags collection.
        highlight: true,
        maxOptions: 5,
        // options: tagOptions,
        onItemAdd: function (item) {
						item = item.toLowerCase();
            // Check to see if tag exists in Tags collection
            // by querying the database for the tag name
            // and checking the length of the result
            var existingTag = Tags.find({"name": {$regex : new RegExp(item, "i") }}).fetch().length;
            console.log(existingTag);
            if (!existingTag) {
                // Add the tag to the Tags collection
                // TODO: figure out how to limit duplicate tags
                // e.g. 'Beans' and 'beans'
                // unless this is not an issue
                Tags.insert({"name": item.toLowerCase()});
            }
        }
    });
}
