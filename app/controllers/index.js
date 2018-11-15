
$.index.open();

Alloy.Collections.Station.reset(require('data').getData());

function transformStation(model) {
    
    return {
        name: model.attributes.name,
        country: model.attributes.country,
        backgroundColor: parseInt(model.attributes.id) % 2 == 0 ? '#ccc' : "#fff",
        editActions: [
            {color: "blue", title: "Edit", style: Titanium.UI.iOS.ROW_ACTION_STYLE_NORMAL, identifier: "edit"},
            {color: "red", title: "Delete", style: Titanium.UI.iOS.ROW_ACTION_STYLE_DESTRUCTIVE, identifier: "delete"},
        ],
        template: model.attributes.template ? model.attributes.template : "compact"
    };
}

function handleRefresh(e){
    console.log(e);
    e.source.title = Ti.UI.createAttributedString({
        text: "Refreshing"
    });
    refreshList();
    e.source.endRefreshing();
}

var filterOnCountry = 'NL';

function filterCountries(collection) {

    return _.filter(collection.models, function(model){
        if (model.attributes.country == "NL" && model.attributes.alias === "false") {
            //model.set({"template": Math.round(Math.random()*3) == 1 ? "large" : "compact"}, {silent: true});
            return true;
        };
    });
}

function handleEditAction(e){
    console.log(e.source.sections[e.sectionIndex].items[e.itemIndex]);
    
    if (e.identifier === 'edit') {
        Alloy.Collections.Station.models[0].set({template: "large"});
    }
}
