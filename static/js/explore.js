
require.config({
			baseUrl: '/js',
			paths: {
    		d3: "http://d3js.org/d3.v3.min"
  			}
		});
require(["d3", "c3"], function(d3, c3) {
  			
	var chart = c3.generate({
    bindto: '.graph',
    data: {
        
        columns: [
            ['data1', .30],
            ['data2', 1.30],
            ['data3', -1.30],
            ['data4', 1.3],
            ['data5', 6.30],
            ['data6', 2.30],
            ['data7', -10.00],
            ['data8', -1.30],
            ['data9', -.01],
            ['data30', -1.90],
            ['data0', .30],
            ['data33', -.10]
        ],
        type: 'bar',
    	axis: {
    		x: {
    			type: 'category',
    			categories: ['Technology']

    		}
    	}
    },

    bar: {
        width: {
            ratio: .9 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
});

// setTimeout(function () {
//     chart.load({
//         columns: [
//             ['data3', 130, -150, 200, 300, -200, 100]
//         ]
//     });
// }, 1000);


});