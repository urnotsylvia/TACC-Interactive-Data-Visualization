// Generates our first visualization
function firstVis() {

    // Defining values
    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 60
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


    // Generates the graph
    function chart(selector, data) {

        // Get svg from selector
        let svg = d3.select(selector);

        // Sets color scale
        let color = d3.scaleOrdinal(["#5E9BB3", "#5EB398", "#895EB3", "#B35E99", "#EDE45B"])
            .domain(['white','black','hispanic','asian','other']);

        let largestRadius = 125;

        // All arrays follow the order: [Roxbury, South Boston Waterfront, Downtown, Dorchester]
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

            let pie = d3.pie();

            let arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radii[x]);

            let arcs = svg.selectAll("arc")
                .data(pie(percentages[x]))
                .enter()
                .append("g")
                .attr("class", "arc")

            arcs.append("path")
                .attr("fill", function(d, i) {
                    return color(i);
                })
                .attr("d", arc);

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
          .text("LEGEND")
          .style("font-size", "17px")
          .attr("alignment-baseline","middle");
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
          .attr("y", -75)
          .text("White")
          .style("font-size", "15px")
          .attr("alignment-baseline","middle");
        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", -45)
          .text("Black")
          .style("font-size", "15px")
          .attr("alignment-baseline","middle");
        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", -15)
          .text("Hispanic")
          .style("font-size", "15px")
          .attr("alignment-baseline","middle");
        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", 15)
          .text("Asian")
          .style("font-size", "15px")
          .attr("alignment-baseline","middle");
        // Placing text for legend
        svg.append("text")
          .attr("x", width)
          .attr("y", 45)
          .text("Other")
          .style("font-size", "15px")
          .attr("alignment-baseline","middle");
        // Placing text for legend title
        svg.append("text")
          .attr("x", width - 5)
          .attr("y", 65)
          .text("* Scaled by population size")
          .style("font-size", "10px")
          .attr("alignment-baseline","middle");

        // Adding title
        svg = d3.select(selector);
        svg.append("text")
            .attr("x", 300 + width / 2)
            .attr("y", 100)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Racial Breakdown of Boston Neighborhoods*");
        return chart;
  }

    return chart;
}
