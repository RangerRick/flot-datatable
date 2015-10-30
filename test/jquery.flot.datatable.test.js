describe('jquery.flot.datatable', function () {

    describe('.createTable', function() {
        it('should generate the appropriate html', function() {

        });
    });

    describe('flot integration', function() {
        var div;

        var series = [
            {
                metric: 'main',
                color: '#feeded',
                data: [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]]
            }
        ];

        beforeEach(function () {
            div = d3.select('body').append('div');
            $(div.node()).width(640).height(480);
        });

        it('should render a canvas and the data/graph tabs', function() {
            $.plot(div.node(), series);

            setTimeout(function(){
                var html = "" + div.node().innerHTML;
                expect(html).toContain("canvas");
                expect(html).toContain("graphTab");
                expect(html).toContain("dataTab");

                done();
            }, 500);
        });
    });
});