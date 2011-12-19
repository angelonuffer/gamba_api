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
