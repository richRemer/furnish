var furnish = require(".."),
    Modeler = require("../lib/modeler"),
    expect = require("expect.js");

describe("furnish module", function() {
    it("should export Modeler.create", function() {
        expect(furnish).to.be(Modeler.create);
    });
});
