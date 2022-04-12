// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  d3.json('data/TACCdata.json').then(data => {

    console.log('testing');

    let vis1 = firstVis()
      ('#vis-svg-1', data[0]);

    let vis2 = barCharts()
      ('#vis-svg-2', data[1][0]);
    
  });

  d3.select('#Roxbury')
    .style('display', 'none');

  d3.select('#SouthBostonWaterfront')
    .style('display', 'none');

  d3.select('#Downtown')
    .style('display', 'none');

  d3.select('#Dorchester')
    .style('display', 'none');

  // d3.select('#vis-holder-2')
  //   .selectAll('div')
  //   .style('visibility','hidden');
  function onlyShowByID(id) {
    d3.select('#' + id)
      .style('display', 'flex');
    d3.select('#vis-holder-2')
      .selectAll('div')
      .style('visibility','hidden');
  };

  onlyShowByID('Downtown');

})());
