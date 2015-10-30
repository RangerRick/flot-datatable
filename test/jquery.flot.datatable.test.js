describe('jquery.flot.datatable', function () {

    describe('.createTable', function() {
        it('should generate the appropriate html', function() {
            var allSeries = [
                {
                    metric: 'xx',
                    id: 'xx',
                    xaxis: {
                        options: {

                        }
                    },
                    yaxis: {
                        options: {

                        }
                    },
                    data: [[0, 100], [1, 101]]
                }
            ];

            var tableHtml = createTable(allSeries, d3.format(".2f"), d3.format(".2f"));
            expect(tableHtml).toBe("<table><tr><th>x</th><th>y0</th></tr><tr><th>0.00</th><td>100.00</td></tr><tr><th>1.00</th><td>101.00</td></tr></table>");
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