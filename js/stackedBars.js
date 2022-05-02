function stackedBars() {


    function chart(selector,data,title) {

        // Get svg from selector
        let svg = d3.select(selector).append('g')
            .attr('transform', 'translate(' + 120 + ',' + 20 + ')');
