function Action(name, doAction) {
    var self = this;
    self.name = name;
    self.doAction = doAction;
};

function Menu(actions) {
    var self = this;
    self.actions = actions;
    var element = $("<div />").attr({
        id: "gamba_menu"
    });
};
