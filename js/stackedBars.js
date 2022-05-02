function stackedBars() {

    let width = 200;
    let height = 200;

    function chart(selector, data) {

        // Get svg from selector
        let svg = d3.select(selector).append('g')
            .attr('transform', 'translate(' + -50 + ',' + 20 + ')');

        let subgroups = data.columns.slice(1);

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        //let groups = d3.map(data, function(d){return(d.Neighborhood)}).keys();

        let groups = ["Roxbury","South Boston Waterfront","Downtown","Dorchester"];

        console.log(groups);
        
        // Add X axis
        let x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));

        console.log(x("Roxbury"));
        console.log(x("Dorchester"));
        
        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0, 100])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));
        
        // color palette = one color per subgroup
        let color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c','#377eb8','#4daf4a','#ababab','#db7a87']);
        
        // Normalize the data -> sum of each group must be 100!
        // console.log(data)
        // dataNormalized = []
        // data.forEach(function(d){
        //   // Compute the total
        //   tot = 0
        //   for (i in subgroups){ name=subgroups[i] ; tot += +d[name] }
        //   // Now normalize
        //   for (i in subgroups){ name=subgroups[i] ; d[name] = d[name] / tot * 100}
        // })
        
        //stack the data? --> stack per subgroup
        var stackedData = d3.stack()
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
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())

/*
        //add title
         svg.append("text")
             .attr("x", (svg.attr("width") / 2 + 170))
             .attr("y", -10)
             .attr("text-anchor", "middle")
             .style("font-size", "7px")
             .style('stroke', 'black')
             .style('stroke-width', '0.5')
             .text('Household Owner Type');

         // add x-axis
          svg.append("text")
              .attr("x", (svg.attr("width") / 2 + 170))
              .attr("y", 150)
              .attr("text-anchor", "middle")
              .style("font-size", "6px")
              .text('Boston Neighborhood');

         // add y-axis
          svg.append("text")
              .attr("x", (svg.attr("width") / 2 - 75))
              .attr("y", +70)
              .attr("text-anchor", "middle")
              .style("font-size", "6px")
              .attr('transform', 'rotate(-90)')
              .text('Percentage of Households');

             return chart;
*/
            return chart;

        }

        return chart;
    }
