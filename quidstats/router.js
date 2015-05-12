Router.configure({
    layoutTemplate: 'layout',
    onBeforeAction: function () {
        document.title = 'Quidstats';
        this.next();
    }
});

Router.map(function (){
    this.route('home', {path: '/'});
    this.route('pickteam');
    this.route('quidstats');
    this.route('oldgames');
    this.route('rosters');
    this.route('summary');
    this.route('rosters/:_teamname', function () {
        this.render('teamroster', {
            data: function () {
                return Teamrosters.findOne({name: this.params._teamname});
            }
        })
    });
    this.route('summary/:_sessionname', function () {
        this.render('summary', {
            data: function () {
                return GameSummaries.findOne({session: this.params._sessionname});
            }
        })
    });
    this.route('quidstats/:_teamname', function () {
        this.render('quidstats', {
            data: {
                teamname : this.params._teamname
            }
        })
    });
});
