Template.registerHelper('activeIfTemplateIs', function(template) {
    var templ = Router._layout.region('main').template();
    return templ && templ.toUpperCase() == template.toUpperCase() ? 'active' : '';
});