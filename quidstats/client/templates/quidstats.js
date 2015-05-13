
// These could be consolidated into a general template helper function
Template.quafflePlayers.helpers({
    quafflePlayersList: function(){
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {players:1}});
    }
});

Template.snitchPlayers.helpers({
    snitchPlayersList: function () {
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {players:1}});
    }
});

Template.quidstats.helpers({
    printsesh: function () {
        var gameid = Session.get('currGameId');
        console.log(gameid);
        return gameid;
    },

    teamName: function() {
        return Session.get('teamName');
    }
});



/*=============================================
 Increment Quaffle Points
 ==============================================*/
Template.quafflePlayers.events({
    'click .quafflePnt': function (e) {
        var name = e.currentTarget.attributes.id.value,
            gameid = Session.get('currGameId');
        Meteor.call('incQuafflePlayer', gameid, name);
    }
});


/*=============================================
 Increment Snitch Grabs
 ==============================================*/
Template.snitchPlayers.events({
    'click .snitchPnt': function (e) {
        var name = e.currentTarget.attributes.id.value,
            gameid = Session.get('currGameId');
        Meteor.call('incSnitchPlayer', gameid, name);
    }
});

/*=============================================
 Add New Quaffle Player
 ==============================================*/
Template.addNewQuafflePlayer.events({
    'click .addQuafflePlayer': function () {
        //var teamName = Session.get('teamName');
        //console.log("teamName = ", teamName);
        //var team = Teamrosters.findOne({name : teamName});
        //console.log("team = ", team);
        //var roster = team.players;//game.players;
        //console.log("roster = ", roster);
        //bootbox.dialog({
        //    title: "Add New Player",
        //    message: "List of Players"
        //});


         var name = prompt("New Player Name: "),
             gameid = Session.get('currGameId');
         Meteor.call('addQuafflePlayer', gameid, name);
    }
});

/*=============================================
 Add New Snitch Player
 ==============================================*/
Template.addNewSnitchPlayer.events({
    'click .addSnitchPlayer': function () {
        var name = prompt("New Player Name: "),
            gameid = Session.get('currGameId');
        Meteor.call('addSnitchPlayer', gameid, name);
    }
});
