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
