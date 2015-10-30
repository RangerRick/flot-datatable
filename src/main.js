
function getLabelForXAxis(series, options) {
    if (series.xaxis.options.axisLabel) {
        return series.xaxis.options.axisLabel;
    }
    return options.datatable.xaxis.label;
}

function getLabelForYAxis(series, options, suffix) {
    if (series.label !== undefined && series.label !== null) {
        return series.label;
    }
    if (series.yaxis.options.axisLabel) {
        return series.yaxis.options.axisLabel;
    }
    return options.datatable.yaxis.label + suffix;
}

function createTable(allSeries, options) {

    var xformat = options.datatable.xaxis.format,
        yformat = options.datatable.yaxis.format;

    var T = '<table style="width: 100%"><tr><th align="left">'+getLabelForXAxis(allSeries[0], options)+'</th>',
        t = '',
        i, j, N, M;

    for (j = 0, N = allSeries.length; j < N; j++) {
        if (allSeries[j].nodatatable) {
            continue;
        }
        T += '<th align="left">'+getLabelForYAxis(allSeries[j], options, j)+'</th>';
    }

    T += '</tr>';
    for (i = 0, N = allSeries[0].data.length; i < N; i++) {      // for each x
        t='<tr><td nowrap>'+xformat(allSeries[0].data[i][0])+'</td>';    // 1st colunm, x-value
        for (j = 0, M = allSeries.length; j < M; j++) {         // for each series
            if (allSeries[j].nodatatable) {
                continue;
            }
            t += '<td nowrap>'+yformat(allSeries[j].data[i][1])+'</td>'; // add y-data
        }
        t += '</tr>';
        T += t;
    }
    T += '</table>';

    return T;
}

function init(plot) {

    plot.hooks.drawOverlay.push(function (plot) {
        var placeholder = plot.getPlaceholder();
        // Render the tabs on the first call
        if (placeholder.parent().find("#dataTab").length > 0) {
            return;
        }

        var tabplace = $('<div class="tabplace" style="width: '+placeholder[0].clientWidth+'px;"><div class="tab" id="graphTab">Graph</div><div class="tab" id="dataTab">Data</div></div>');
        var T = $('<div title="Doubleclick to copy" class="tdata" style="width: '+placeholder[0].clientWidth+'px; height: '+placeholder[0].clientHeight+'px; padding: 0px; position: relative; overflow: scroll; background: white; z-index: 10; display: none;">' +
            createTable(plot.getData(), plot.getOptions()) +
            '</div>');

        $(placeholder)
            .wrap("<div class='wrapper'></div>")
            .before(tabplace)
            .append(T);

        bindTabs(tabplace, T);
        bindTable(T);
    });

    function bindTabs(tabs, table){
        tabs.click(function(e){
            switch (e.target.id) {
                case 'graphTab':
                    table.hide();
                    break;
                case 'dataTab':
                    table.show();
                    break;
            }
        });
    }

    function bindTable(table){
        table.bind('dblclick', function() {
            highlightTableRows(table);
        });
    }

    function highlightTableRows(table){
        var selection = window.getSelection(),
        range = document.createRange();
        range.selectNode(table.get()[0]);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
