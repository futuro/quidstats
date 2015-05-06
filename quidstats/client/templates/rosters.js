Teams = new Mongo.Collection("teams");

Template.rosters.addTeam = function (name) {
    Teams.insert({
        name:name,
        createdAt: new Date()
    })
};
Template.rosters.events({
    'submit .new-roster': function(event){
        var name = event.target.text.value;
        //Meteor.call("addTeam", name);
        Template.rosters.addTeam(name);
        event.target.text.content = "";
        return false;
    }
});

//Meteor.methods({
//    addTeam: function(text){
//        Teams.insert({
//            name:text,
//            createdAt: new Date()
//        })
//    }
//});