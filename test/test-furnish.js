var furnish = require(".."),
    Modeler = require("../lib/modeler"),
    Model = require("../lib/model"),
    expect = require("expect.js");

describe("<module>", function() {
    it("should export Modeler.create", function() {
        expect(furnish).to.be(Modeler.create);
    });
});

describe("Modeler", function() {
    var url = "http://example.com/db",
        modeler = Modeler.create(url);

    describe(".create", function() {
        describe("(string)", function() {
            it("should return Modeler instance", function() {
                expect(modeler).to.be.a(Modeler);
            });

            it("should set dbUrl", function() {
                expect(modeler.dbUrl).to.be(url);
            });
        });
    });

    describe("#db", function() {
        it("should be DB object", function() {
            expect(modeler.db).to.be.an("object");
            expect(modeler.db.insert).to.be.a("function");
        });
    });

    describe("#model", function() {
        var ctor = function() {},
            model = modeler.model(ctor);

        describe("(function)", function() {
            it("should return Model instance", function() {
                expect(model).to.be.a(Model);
            });

            it("should set ctor property", function() {
                expect(model.ctor).to.be(ctor);
            });

            it("should set modeler property", function() {
                expect(model.modeler).to.be(modeler);
            });
        });
        
        describe("(string, function)", function() {
            it("should create named model", function() {
                var FooModel = modeler.model("Foo", ctor);
                
                expect(modeler.models.Foo).to.be(FooModel);
            });
            
            it("should throw on duplicate name", function() {
                expect(modeler.model.bind(modeler)).withArgs("Foo", ctor)
                    .to.throwError();
            });
        });
    });
});

describe("Model", function() {
    var proto = {foo: 42},
        ctor = function() {this.str = "foo";};

    ctor.prototype = proto;

    var url = "http://example.com/db",
        modeler = Modeler.create(url),
        model = modeler.model("example", ctor);
    
    describe("#create", function() {
        it("should construct a model instance", function() {
            var m = model.create();
            expect(m).to.be.an("object");
            expect(m.foo).to.be(42);
            expect(m.str).to.be("foo");
        });
    });
});
