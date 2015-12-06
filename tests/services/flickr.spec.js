describe("flickr service", function() {
    var flickr, $httpBackend;

    beforeEach(module('guessTheCountry'));
    beforeEach(inject(function($injector) {
        flickr = $injector.get('Flickr');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend
            .whenGET('/api/flickr/place-id/mexico')
            .respond(200, {
                "_content": "Mexico",
                "latitude": "23.625",
                "longitude": "-101.956",
                "place_id": "S._RoQ1TUb4WzNIdpA",
                "place_type": "country",
                "place_type_id": "12",
                "place_url": "/M%C3%A9xico",
                "woe_name": "Mexico",
                "woeid": "23424900"
            });

        $httpBackend
            .whenGET('/api/flickr/photos/S._RoQ1TUb4WzNIdpA')
            .respond(200, {
                "page": 1,
                "pages": 561150,
                "perpage": 5,
                "photo":
                [
                    {
                        "farm":1,
                        "id": "416994204",
                        "isfamily": 0,
                        "isfriend": 0,
                        "ispublic": 1,
                        "owner": "82161892@N00",
                        "secret": "5c6fc1f568",
                        "server": "150",
                        "title": "Girls"
                    },
                    {
                        "farm": 3,
                        "id": "1864278391",
                        "isfamily": 0,
                        "isfriend": 0,
                        "ispublic": 1,
                        "owner": "87908819@N00",
                        "secret": "5e4ebc2e5b",
                        "server": "2119",
                        "title": "furia en rojo - red fury - rot wut - fureur rouge"
                    }
                ],
                "total": "2805747"
            });
    }));

    it("getPlaceID() should return a Place Id", function() {
        flickr.getPlaceID("mexico").then(function(place_id) {
            expect(place_id).toEqual("S._RoQ1TUb4WzNIdpA");
        });

        $httpBackend.flush();
    });

    it("getPhotos() should return an array of 2 photos", function() {
        flickr.getPhotos("S._RoQ1TUb4WzNIdpA").then(function(photos) {
            expect(photos.length).toEqual(2);
        });

        $httpBackend.flush();
    });
});
