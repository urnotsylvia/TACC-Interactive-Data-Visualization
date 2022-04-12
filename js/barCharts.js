
function barCharts() {


    function chart(selector,data,title) {

        // Get svg from selector
        let svg = d3.select(selector).append('g')
            .attr('transform', 'translate(' + 100 + ',' + 20 + ')');

        // get
        let x = d3.scaleBand()
            .range([0, 165])
            .domain(data.map(d => d.range))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + 150 + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end")
                .style("font-size", "5px");
        let y = d3.scaleLinear()
            .domain([0, 50 + d3.max(data, d => d.value)])
            .range([150,0]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .style("font-size", "5px");

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
              .attr("x", function(d) {  return x(d.range); })
              .attr("y", function(d) { return y(d.value); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return 149.5 - y(d.value); })
              .attr("fill", "#328fa8");

       //add title
        svg.append("text")
            .attr("x", (svg.attr("width") / 2 + 80))
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .text(title + ' Income Distribution');

        // add x-axis
         svg.append("text")
             .attr("x", (svg.attr("width") / 2 + 70))
             .attr("y", 185)
             .attr("text-anchor", "middle")
             .style("font-size", "6px")
             .text('Income Distribution Ranges');

        // add y-axis
         svg.append("text")
             .attr("x", (svg.attr("width") / 2 - 80))
             .attr("y", -30)
             .attr("text-anchor", "middle")
             .style("font-size", "6px")
             .attr('transform', 'rotate(-90)')
             .text('Neighborhood Residents');

        return chart;
    }
    return chart;
}
