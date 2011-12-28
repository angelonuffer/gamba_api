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
    self.ready_functions = [];
    self.ready = function(ready) {
        self.ready_functions.push(ready);
    };
    jQuery.get(self.url, function(text) {
        self.tool_context = eval("(" + text + ")");
        self.name = self.tool_context.name;
        self.icon_url = self.tool_context.icon;
        self.type = self.tool_context.type;
        self.element = $("<img />").attr({
            src: self.icon_url
        });
        $(self.ready_functions).each(function(i, ready) {
            ready();
        });
    });
};

function SelectableTool(url) {
    var self = this;
    Tool.call(self, url);
    self.ready(function() {
        self.select = self.tool_context.select;
        self.unselect = self.tool_context.unselect;
    });
};

function Toolbar(default_tools) {
    var self = this;
    self.selectable_tools = [];
    self.addTool = function(tool) {
        if (tool.__proto__ === SelectableTool.prototype) {
            self.selectable_tools.push(tool);
        };
        self.element.append(tool.element);
    };
    self.add_tool_action = new Action("add tool", function() {
        var tool = new SelectableTool("line.json");
        self.addTool(tool);
    });
    self.menu = new Menu([self.add_tool_action]);
    $(default_tools).each(function(i, tool) {
        tool.ready(function() {
            self.addTool(tool);
        });
    });
    self.element = $("<div />").addClass("gamba_toolbar");
    self.element.css({
        width: "30",
        height: "100%",
        position: "absolute",
        "background-color": "#30372a",
        top: 0,
        left: 0
    });
    self.element.setMenu(self.menu);
    $(document.body).append(self.element);
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
