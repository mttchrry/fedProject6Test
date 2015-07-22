/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
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
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls', function() {
            for(var i = 0; i < allFeeds.length; i++)
            {
                var feed = allFeeds[i];
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
                expect(feed.url).toMatch(/^http(s?)\:\/\//);
            }
        });
        /* Makes sure the each feed has a name and it is a string. */ 
        it('have names', function() {
            for(var i = 0; i < allFeeds.length; i++)
            { 
                var feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
                expect(typeof feed.name).toBe('string');
            }
        });

    });


    /* A test suite for "The menu" */
    /* This is our second test suite, for the menu */
    describe('The menu', function() {
        var spyEvent;

        /* ensure hidden by default */
        it('is hidden by default', function() {
            expect(document.getElementsByClassName('menu-hidden')).toBeDefined();
            expect(document.getElementsByClassName('menu-hidden').length).toBe(1);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is unhidden and rehidden when menu button clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
     });

         
    /* A new test suite for "Initial Entries" */
    describe('Initial entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
           loadFeed(0,done);
        });

        it('have at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* A new test suite named "New Feed Selection" that ensures that the feeds 
    are switched appropriately when clicked*/
    describe('New feed selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var contentBefore, contentAfter;
        beforeEach(function(done) {
            loadFeed(0, function() {
                contentBefore = $('.feed').html();
                done();
            });
        });

        it("content changes after load feed function runs", function(done) {
            loadFeed(1, function() {
                contentAfter = $('.feed').html();
                expect(contentBefore).not.toBe(contentAfter);
                done();
            });
        });
    });
}());
