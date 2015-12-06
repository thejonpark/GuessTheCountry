describe("game controller", function() {
    var $controller;

    beforeEach(module('guessTheCountry'));
    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
    }));

    it("should increment points by 1 with exact match with answer", function() {
        var controller = $controller('GameController');
        controller.answer = "Mexico";
        controller.points = 0;
        controller.countryName = "Mexico";
        controller.submitAnswer();
        expect(controller.points).toEqual(1);
    });

    it("should increment points by 1 with not case sensitive match with answer", function() {
        var controller = $controller('GameController');
        controller.answer = "Mexico";
        controller.points = 0;
        controller.countryName = "mexico";
        controller.submitAnswer();
        expect(controller.points).toEqual(1);
    });

    it("should not increment points by 1 with different country than answer", function() {
        var controller = $controller('GameController');
        controller.answer = "Mexico";
        controller.points = 0;
        controller.countryName = "Canada";
        controller.submitAnswer();
        expect(controller.points).toEqual(0);
    });
});
