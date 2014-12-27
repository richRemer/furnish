var furnish = require(".."),
    Modeler = require("../lib/modeler"),
    expect = require("expect.js");

describe("<module>", function() {
    it("should export Modeler.create", function() {
        expect(furnish).to.be(Modeler.create);
    });
});

describe("Modeler", function() {
    var url = "http://example.com/db";

    describe(".create", function() {
        var modeler = Modeler.create(url);

        it("should return Modeler instance", function() {
            expect(modeler).to.be.a(Modeler);
        });

        it("should set dbUrl", function() {
            expect(modeler.dbUrl).to.be(url);
        });
    });

    it("should expose DB object", function() {
        var modeler = Modeler.create(url);
        expect(modeler.db).to.be.an("object");
    });
});
