var gameDate = new Date();

Template.getsession.helpers({
	date: function() {
		return gameDate;
	}
});

Template.getsession.events({
    'click #newgame': function () {
      var sessionName = document.querySelector('#sessionInput').value;
      var teamName = Session.get("teamName"); // change to Session.get("currTeamName");
      Meteor.call('createGame', sessionName, teamName, date,
            function (error, result) {
                if (error) {
                    console.log(error);
                    Session.set('currGameId', "Couldn't set sesh id")
                } else {
                    Session.set('currGameId', result);
                }
            }
      );
      Router.go('quidstats');
    }
});