function stackedBars() {

    let width = 185;
    let height = 150;

    function chart(selector, data) {

        // Get svg from selector
        let svg = d3.select(selector).append('g')
            .attr('transform', 'translate(' + -130 + ',' + 30 + ')');

        // making subgroups aka list of all the neighborhoods
        let subgroups = data.columns.slice(1);

        // adding tooltip to div
        let div = d3.select("body").append("div")
            .attr("class", "tooltip2")
            .style("opacity", 0);

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        //let groups = d3.map(data, function(d){return(d.Neighborhood)}).keys();

        let groups = ["Roxbury","South Boston Waterfront","Downtown","Dorchester"];

        // Add X axis
        let x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .selectAll("text")
                .style("text-anchor", "middle")
                .style("font-size", "5px");

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0, 100])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .style("font-size", "5px");

        // color palette = one color per subgroup
        let color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#8b62b5','#769dcf','#ff9696', '#5fb374','#ffc496']);

        //stack the data? --> stack per subgroup
        let stackedData = d3.stack()
            .keys(subgroups)
            (data);

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { return d; })
            .enter().append("rect")
                .attr("x", function(d) { return x(d.data.Neighborhood); })
                .attr("y", function(d) { return y(d[1]) - 0.5; })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())
                .style("opacity", 0.7)
                .attr('stroke', 'white').style("stroke-width", "0.5px")
                .attr("z", "0")
                .on("mouseover", function(d) {
                      d3.select(this)
                        .style("opacity", 1)
                        .attr("z", "100")
                        .attr("stroke", "orange").style("stroke-width", "2px")
                    div.style("opacity", .9)
                    div.html(x(data.Neighborhood) + "%")
                      .style("left", (event.pageX - 10) + "px")
                      .style("top", (event.pageY + 50) + "px"); })
                .on("mouseout", function(d) {
                        d3.select(this)
                            .style("opacity", 0.7)
                            .attr("stroke", "white").style("stroke-width", "1px")
                        div.style("opacity", 0); })
                .on("mousemove", function(event, d) {
                    div.html((d[1] - d[0]).toFixed(1) + "%")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px")
                })
                .on("mousedown", function(d) {
                  d3.select(this).classed('selected', true)
              });

        //add title
         svg.append("text")
             .attr("x", (svg.attr("width") / 2 + 85))
             .attr("y", -10)
             .attr("text-anchor", "middle")
             .style("font-size", "7px")
             .style('stroke', 'black')
             .style('stroke-width', '0.5')
             .text('Household Owner Type');

         // add x-axis
          svg.append("text")
              .attr("x", (svg.attr("width") / 2 + 85))
              .attr("y", 180)
              .attr("text-anchor", "middle")
              .style("font-size", "6px")
              .text('Boston Neighborhood');

         // add y-axis
          svg.append("text")
              .attr("x", (svg.attr("width") / 2 - 75))
              .attr("y", - 20)
              .attr("text-anchor", "middle")
              .style("font-size", "6px")
              .attr('transform', 'rotate(-90)')
              .text('Percentage of Households');

          // Placing colored circle for legend
          svg.append("circle")
            .attr("cx", width + 10)
            .attr("cy", 10)
            .attr("r", 3)
            .style("fill", "#ffc496");

          // Placing colored circle for legend
          svg.append("circle")
            .attr("cx", width + 10)
            .attr("cy", 20)
            .attr("r", 3)
            .style("fill", "#5fb374");

          // Placing colored circle for legend
          svg.append("circle")
            .attr("cx", width + 10)
            .attr("cy", 30)
            .attr("r", 3)
            .style("fill", "#ff9696");

          // Placing colored circle for legend
          svg.append("circle")
            .attr("cx", width + 10)
            .attr("cy", 40)
            .attr("r", 3)
            .style("fill", "#769dcf");

          // Placing colored circle for legend
          svg.append("circle")
            .attr("cx", width + 10)
            .attr("cy", 50)
            .attr("r", 3)
            .style("fill", "#8b62b5");

          // Placing text for legend
          svg.append("text")
            .attr("x", width + 15)
            .attr("y", 10)
            .text("Householder Not Living Alone")
            .style("font-size", "5px")
            .attr("alignment-baseline","middle");

          // Placing text for legend
          svg.append("text")
            .attr("x", width + 15)
            .attr("y", 20)
            .text("Householder Living Alone")
            .style("font-size", "5px")
            .attr("alignment-baseline","middle");

          // Placing text for legend
          svg.append("text")
            .attr("x", width + 15)
            .attr("y", 30)
            .text("Female Householder")
            .style("font-size", "5px")
            .attr("alignment-baseline","middle");

          // Placing text for legend
          svg.append("text")
            .attr("x", width + 15)
            .attr("y", 40)
            .text("Male Householder")
            .style("font-size", "5px")
            .attr("alignment-baseline","middle");

          // Placing text for legend
          svg.append("text")
            .attr("x", width + 15)
            .attr("y", 50)
            .text("Married Couple Family")
            .style("font-size", "5px")
            .attr("alignment-baseline","middle");

            return chart;

        }

        return chart;
    }
