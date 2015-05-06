Router.map(function (){
    this.route('home', {path: '/'});
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
});
