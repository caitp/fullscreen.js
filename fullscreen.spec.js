describe('$fullscreen', function() {
    // TODO: Make test suite more useful (unfortunately, testing fullscreen api can require
    // special powers, so... this isn't super useful --- At least it guarantees there aren't
    // any surprises!).
    it('should have method `listen`', function() {
        expect(typeof $fullscreen.listen).toBe('function');
    });


    it('should have method `deafen`', function() {
        expect(typeof $fullscreen.deafen).toBe('function');
    });


    it('should have method `enter`', function() {
        expect(typeof $fullscreen.enter).toBe('function');
    });


    it('should have method `exit`', function() {
        expect(typeof $fullscreen.exit).toBe('function');
    });


    it('should have method `toggle`', function() {
        expect(typeof $fullscreen.toggle).toBe('function');
    });
});
