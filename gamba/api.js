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

function Tool(url) {
    var self = this;
    self.url = url;
    self.ready = function() {};
    jQuery.get(self.url, function(text) {
        self.tool_context = eval("(" + text + ")");
        self.name = self.tool_context.name;
        self.icon_url = self.tool_context.icon;
        self.type = self.tool_context.type;
        self.ready();
    });
};

function SelectableTool(url) {
    var self = this;
    Tool.call(self, url);
    self.ready = function() {
        self.select = self.tool_context.select;
        self.unselect = self.tool_context.unselect;
    };
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
