function Action(name, doAction) {
    var self = this;
    self.name = name;
    self.doAction = doAction;
    self.element = $("<button />").text(self.name);
};

function Menu(actions) {
    var self = this;
    self.actions = actions;
    self.show = function() {
        self.hide();
        $(actions).each(function(i, action) {
            action.element.click(action.doAction);
            gamba_menu.append(action.element);
        });
        gamba_menu.show();
    };
    self.hide = function() {
        gamba_menu.children().remove();
    };
    $(document).click(function() {
        self.hide();
    });
};

jQuery.fn.setMenu = function(menu) {
    this.contextmenu(function(event) {
        gamba_menu.css({
            position: "absolute",
            left: event.pageX,
            top: event.pageY
        });
        menu.show();
        return false;
    });
};

$(document).ready(function() {
    gamba_menu = $("<div />").attr({
        id: "gamba_menu"
    });
    $(document.body).append(gamba_menu);
});
