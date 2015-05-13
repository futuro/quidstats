

Template.quafflePlayers.helpers({
    quafflePlayersList: function(){
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {quafflePlayers:1}});
    }
});

Template.snitchPlayers.helpers({
    snitchPlayersList: function () {
        var gameid = Session.get('currGameId');
        return GameSummaries.find({"_id":gameid}, {fields: {snitchPlayers:1}});
    }
});

Template.quidstats.helpers({
    printsesh: function () {
        var gameid = Session.get('currGameId');
        console.log(gameid);
        return gameid;
    }
});



/*=============================================
 Increment Quaffle Points
 ==============================================*/
Template.quafflePlayers.events({
    'click .quafflePnt': function (e) {
        var name = e.currentTarget.parentNode.querySelector('.name').innerHTML,
            gameid = Session.get('currGameId');
        Meteor.call('incQuafflePlayer', gameid, name);
    }
});


/*=============================================
 Increment Snitch Grabs
 ==============================================*/
Template.snitchPlayers.events({
    'click .snitchPnt': function (e) {
        var name = e.currentTarget.parentNode.querySelector('.name').innerHTML,
            gameid = Session.get('currGameId');
        Meteor.call('incSnitchPlayer', gameid, name);
    }
});

/*=============================================
 Add New Quaffle Player
 ==============================================*/
Template.addNewQuafflePlayer.events({
    'click .addQuafflePlayer': function () {
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
