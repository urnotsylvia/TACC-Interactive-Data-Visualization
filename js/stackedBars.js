function stackedBars() {


    function chart(selector, data) {

        // Get svg from selector
        let svg = d3.select(selector).append('g')
            .attr('transform', 'translate(' + 120 + ',' + 20 + ')');

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

        }

        return chart;
    }
