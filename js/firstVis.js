// Generates our first visualization
function firstVis() {

    // Defining values for visualization
    let margin = {
        top: 10,
        left: 50,
        right: 30,
        bottom: 10
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      dispatcher;


    // Generates the graph
    function chart(selector, data) {

        // Get svg from selector
        let svg = d3.select(selector);

        // adds tooltip to div
        let  div = d3.select("body").append("div")
            .attr("class", "tooltip2")
            .style("opacity", 0);

        // Sets color scale
        let color = d3.scaleOrdinal(["#5E9BB3", "#5EB398", "#895EB3", "#B35E99", "#EDE45B"])
            .domain(['white','black','hispanic','asian','other']);

        // sets a maximum size for the raddi
        let largestRadius = 125;

        // All arrays follow the order: [Roxbury, South Boston Waterfront, Downtown, Dorchester]
        let names = ["Roxbury","South Boston Waterfront","Downtown","Dorchester"];

        // Radius size of each circle in pixels
        let radii = [];

        // Population of each city
        let populations = [];

        // Racial breakdown, each element is an array in form: [white,black,hispanic,asian,other]
        let percentages = [];

        // Center point coordinates for Dorchester circle
        let x = 400, y = 250;

        // Coordinates of all circles
        //              Roxbury        South Bos    Downtwn       Dorch
        let coords = [[x+165,y+125],[x+133.75,y-64],[x+172.5,y-5],[x,y]];

        // Coordinates of each caption relative to the center of its respective circle
        // Each element is an array of [x shift, y shift, font size]
        let captions = [[100,0,10],[25,-25,6],[65,-10,8],[-200,0,11]];

        // Loops through the 4 data objects and fills arrays
        for(let i = 0; i < 4; i++) {
            let el = data[i];
            populations.push(el.population);
            percentages.push([el.white,el.black,el.hispanic,el.asian,el.other]);
        }

        // Calculates radius in pixels for all circles
        // Preserves ratio of areas: ratio of areas = ratio of populations
        for(let i = 0; i < 3; i++) {
            let ratio = Math.sqrt(populations[i] / populations[3]);
            radii.push((largestRadius * ratio));
        }
        radii.push(largestRadius);

        // Draws all 4 circles
        for(let x = 0; x < 4; x++) {
            svg = d3.select(selector);
            svg = svg.append('g')
                .attr('transform', 'translate(' + coords[x][0] + ',' + coords[x][1] + ')');

            // defining pie chart
            let pie = d3.pie();

            // adding in arcs
            let arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radii[x]);

            // attributes of all arcs
            let arcs = svg.selectAll("arc")
                .data(pie(percentages[x]))
                .enter()
                .append("g")
                .attr("class", "arc")
                .style("opacity", 0.7)
                .on("mouseover", function(event, d) {
                      d3.select(this)
                        .style("opacity", 1)
                    div.style("opacity", .9)
                    div.html(d.data + "%")
                      .style("left", (event.pageX + 40) + "px")
                      .style("top", (event.pageY + 40) + "px")
                    })
                .on("mouseout", function(d) {
                        d3.select(this)
                            .style("opacity", 0.7)
                            div.style("opacity", 0);
                        })
                .on("mousemove", function(event, d) {
                    div.html(d.data + "%")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px")
                });


            // Draws circles and adds unique ID for each one
            arcs.append("path")
              .attr("fill", function(d, i) {
                  return color(i);
              })
              .attr("d", arc)
              .attr("id", names[x]+'_circle')
              .attr("stroke", "white").style("stroke-width", "1px")
              .on("mouseover", function(d) {
                    d3.select(this)
                      .attr("stroke", "orange").style("stroke-width", "2px")
                      .attr("z", "10")
                  })
              .on("mouseout", function(d) {
                      d3.select(this)
                          .attr("stroke", "white").style("stroke-width", "1px")
                          .attr("z", "0")

                      })
              .on("mousedown", function(d) {
                dispatcher.call('newSelect', this, names[x])
            });

            // adds neighborhood name next to correct pie chart
            svg.append("text")
                .attr("x", captions[x][0])
                .attr("y", captions[x][1])
                .style("font-size", captions[x][2] + "px")
                .text(data[x].name);
        }

        // Placing text for legend title
        svg.append("text")
          .attr("x", width - 15)
          .attr("y", -100)
          .text("Legend")
          .style("font-size", "15px")
          .attr("alignment-baseline","middle");

        // Placing colored circle for legend
        svg.append("circle")
          .attr("cx", width-10)
          .attr("cy", -75)
          .attr("r", 6)
          .style("fill", "#5E9BB3");

        // Placing colored circle for legend
        svg.append("circle")
          .attr("cx", width-10)
          .attr("cy", -45)
          .attr("r", 6)
          .style("fill", "#5EB398");

        // Placing colored circle for legend
        svg.append("circle")
          .attr("cx", width-10)
          .attr("cy", -15)
          .attr("r", 6)
          .style("fill", "#895EB3");

        // Placing colored circle for legend
        svg.append("circle")
          .attr("cx", width-10)
          .attr("cy", 15)
          .attr("r", 6)
          .style("fill", "#B35E99");

        // Placing colored circle for legend
        svg.append("circle")
          .attr("cx", width-10)
          .attr("cy", 45)
          .attr("r", 6)
          .style("fill", "#EDE45B");

        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", -70)
          .text("White")
          .style("font-size", "13px")
          .attr("alignment-baseline","middle");

        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", -40)
          .text("Black")
          .style("font-size", "13px")
          .attr("alignment-baseline","middle");
        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", -10)
          .text("Hispanic")
          .style("font-size", "13px")
          .attr("alignment-baseline","middle");

        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", 20)
          .text("Asian")
          .style("font-size", "13px")
          .attr("alignment-baseline","middle");
        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", 50)
          .text("Other")
          .style("font-size", "13px")
          .attr("alignment-baseline","middle");

        // Placing text for legend title
        svg.append("text")
          .attr("x", width - 10)
          .attr("y", 80)
          .text("* Scaled by population size")
          .style("font-size", "10px")
          .attr("alignment-baseline","middle");

        // placing outline of legend
        svg.append('rect')
          .attr('x', width - 27)
          .attr('y', - 126)
          .attr('width', 90)
          .attr('height', 190)
          .attr('stroke', 'black')
          .style('stroke-width', '1')
          .style('stroke', 'white')    // set the line colour
          .attr('fill', '#69a3b2')
          .attr('rx', '20')
          .attr('ry', '20')
          .style("fill-opacity", 0.05);

        // Adding title
        svg = d3.select(selector);
        svg.append("text")
            .attr("x", 300 + width / 2)
            .attr("y", 70)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style('stroke', 'black')
            .style('stroke-width', '1')
            .text("Racial Breakdown of Boston Neighborhoods");

        return chart;
  }

  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

    return chart;
}
