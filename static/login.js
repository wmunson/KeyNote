

require.config({
  baseUrl: '/js',
  paths: {
    d3: "http://d3js.org/d3.v3.min"
  }
});

require(["d3", "c3"], function(d3, c3) {
  c3.generate({
    
    bindto: '#chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }


  });
});