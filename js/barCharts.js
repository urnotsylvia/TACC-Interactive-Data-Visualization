
function barCharts() {


    function chart(selector,data) {

        //console.log(data);
        // Get svg from selector
        let svg = d3.select(selector).append('g')
            .attr('transform', 'translate(' + 100 + ',' + 100 + ')');
        //svg.append("text").text("Testing!");

        //let labels = ["< 15k","15k - 25k","25k - 35k","35k - 50k","50k - 75k","75k - 100k","100k - 150k","> 150k"];

        let x = d3.scaleBand()
            .range([0, 150])
            .domain(data.map(d => d.range))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + 150 + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
        let y = d3.scaleLinear()
            .domain([0, 7000])
            .range([150,0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
              .attr("x", function(d) {  return x(d.range); })
              .attr("y", function(d) { return y(d.value); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return 150 - y(d.value); })
              .attr("fill", "#69b3a2");
        return chart;
        

    }
    return chart;
}