module("Action");

test("it has a name", function() {
    var action = new Action(name="action");
    equal(action.name, "action");
});

test("it can do an action", function() {
    var string = "foo"
    var action = new Action(name="action", function() {
        if (string == "foo") {
            string = "bar";
        };
    });
    equal(string, "foo");
    action.doAction();
    equal(string, "bar");
});

module("Menu");

test("it has actions", function() {
    var action1 = new Action("action1");
    var action2 = new Action("action2");
    var menu = new Menu(actions=[
        action1,
        action2
    ]);
    equal(menu.actions[0], action1);
    equal(menu.actions[1], action2);
});

test("it creates an element on page", function() {
    var action1 = new Action("action1");
    var action2 = new Action("action2");
    equal($("div#gamba_menu").length, 1);
    var menu = new Menu(actions=[
        action1,
        action2
    ]);
    equal($("div#gamba_menu").length, 1);
    equal($("div#gamba_menu").children().length, 0);
    menu.show();
    equal($("div#gamba_menu").children().length, 2);
    menu.hide();
    equal($("div#gamba_menu").children().length, 0);
});

test("it binds to an element", function() {
    var element = $("<p />").text("element test");
    var action1 = new Action("action1");
    var action2 = new Action("action2");
    var menu = new Menu(actions=[
        action1,
        action2
    ]);
    element.setMenu(menu);
    $(document.body).append(element);
    equal($("div#gamba_menu").children().length, 0);
    element.contextmenu();
    equal($("div#gamba_menu").children().length, 2);
    menu.hide();
    element.remove();
});

module("Tool");

test("it loads a tool from json url", function() {
    expect(4);
    stop();
    $(document.body).ajaxComplete(function() {
        equal(tool.url, "test_tool.json");
        equal(tool.name, "test tool");
        equal(tool.icon_url, "unexistent.png");
        equal(tool.type, "clickable");
        start();
    });
    var tool = new Tool("test_tool.json");
});
