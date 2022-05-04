// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

d3.json('data/TACCdata.json').then(data => {

  d3.csv('data/household.csv').then(data2 => {

    console.log('testing');
    const eventName = 'newSelect';

    let vis1 = firstVis()
      .selectionDispatcher(d3.dispatch(eventName))
      ('#vis-svg-1', data[0]);

    let vis2 = barCharts()
      ('#vis-svg-2', data[1][0], 'Roxbury', '$30,534');

    let vis3 = barCharts()
      ('#vis-svg-3', data[1][1],'South Boston Waterfront', '$153,545');

    let vis4 = barCharts()
      ('#vis-svg-4', data[1][2],'Downtown', '$88,750');

    let vis5 = barCharts()
      ('#vis-svg-5', data[1][3],'Dorchester', '$55,009');

    let vis6 = stackedBars()
      ('#vis-svg-6', data2, 'stackedBars');

    vis1.selectionDispatcher().on(eventName, onlyShowByID);
  })
})

  d3.select('#Roxbury')
    .style('display', 'none');

  d3.select('#SouthBostonWaterfront')
    .style('display', 'none');

  d3.select('#Downtown')
    .style('display', 'none');

  d3.select('#Dorchester')
    .style('display', 'none');

  function onlyShowByID(id) {
    console.log(id);
    if (id == 'South Boston Waterfront') {
      id = 'SouthBostonWaterfront';
    }
    d3.selectAll('.vis-holder-2')
      .style('display','none');
    d3.select('#' + id)
      .style('display', 'flex')
  };

  d3.select('#SouthBostonWaterfront')
    .style('display', 'flex');

})());
