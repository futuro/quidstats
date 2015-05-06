Router.map(function (){
    this.route('home', {path: '/'});
    this.route('/quidstats', function () {
        this.render('quidstats')
    });
});