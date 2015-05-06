Router.map(function (){
    this.route('home', {path: '/'});
    this.route('quidstats');
    this.route('oldgames');
    this.route('rosters');
    this.route('summary');
    this.route('roster/:_teamname', function () {
        this.render('roster', {
            data: _teamname
        })
    });
});
