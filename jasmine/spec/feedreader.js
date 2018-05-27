/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against RSS FeedReader Application application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
  
      /*
       * Test that loops through each feed in the allFeeds object,
       * and ensures that it has a URL defined and has minimum 8 characters
       */
      it('URL is defined and not empty', function() {
        for (const feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
          expect(feed.url.length).not.toBeLessThan(08);
          expect(feed.url).toMatch(/^http(s?)\:\/\//);
        };
      });
  
      /*
       * Test that loops in allFeeds object and ensures that
       * name is defined.
       */
      it('Names are defined and not left empty', function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });
  
    /*
     * Test Suite - "The menu" - To check the contents of hammburger icon
     */
  
    describe('The menu', function() {
      /* Menu element to be hidden by default */
  
      it('Menu element is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
  
      /*
       * Checks if menu changes it visibility when clicked
       * Expectations: Does the menu display when clicked and
       * Does it hide when clicked again
       */
  
      it('Menu changes its visibility when clicked', function() {
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });
  
    /* Test Suite : "Initial Entries" */
  
    describe('Initial Entries', function() {
  
      /* test that ensures when the loadFeed function is called and
       * completes its work, there is at least a single .entry element
       * within the .feed container.
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });
  
      //Checks atleast if there is one feed.
  
      it('There should be atleast one feed', function() {
        expect($('.feed .entry').length).not.toBe(0);
      });
    });
  
    /* Test Suite: "New Feed Selection"
     *  test that ensures when a new feed is loaded
     */
  
    describe('New Feed Selection', function() {
      var old, n;
      beforeEach(function(done) {
        loadFeed(0, function() {
          old = $('.feed').text();
          loadFeed(1, function() {
            n = $('.feed').text();
            done();
          });
        });
      });
  
      /* A test to ensure that when a new feed is loaded
       * by the loadFeed function the content actually changes.
       */
      it('Content gets changed when new feed is loaded', function() {
        expect(n).not.toBe(old);
      });
    });
  
  }());
  