//Variables
    const width = 960;
    const height = 600;

//Svg created 

    const svg = d3.select("body")
                    .append("svg")
                    .attr("viewBox", `0 0 ${width} ${height}`)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .style("width", "100%")
                    .style("height", "100%");



//Map fetched
Promise.all([
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"),
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
]).then(([us, eData]) =>{
            try{
            const counties = topojson.feature(us, us.objects.counties).features;


//Data education 
            const minEData = d3.min(eData, d => d.bachelorsOrHigher);
            const maxEData = d3.max(eData, d => d.bachelorsOrHigher);

            const colorScheme = d3.scaleQuantize()
                                    .domain([minEData,maxEData])
                                    .range(d3.schemeReds[7]);

            const educationMap = {};
            eData.forEach(d => educationMap[d.fips] = d);

//Append map to svg
            svg.selectAll("path")
                    .data(counties)
                    .enter()
                    .append("path")
                    .attr("data-fips", d => d.id)
                    .attr("data-education", d => educationMap[d.id].bachelorsOrHigher)
                    .attr("class", "county")
                    .attr("d", d3.geoPath())

//Styling map
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.2)
                    .attr("transform", "translate(100, 10) scale(0.8)")
                    .attr("fill", d => colorScheme(educationMap[d.id].bachelorsOrHigher));


//Legend
                const colorThresholds = colorScheme.thresholds();
                const legendHeight = 20;
                const legendWidth = 20

                const legend = svg.append("g")
                    .attr("id", "legend")
                    .attr("transform", "translate(620, 50)");

                legend.selectAll("rect")
                    .data(colorScheme.range())
                    .enter()
                    .append("rect")
                    .attr("height", legendHeight)
                    .attr("width", legendWidth)
                    .attr("x", (d, i) => i * legendWidth)
                    .attr("y", 0)
                    .attr("fill", d => d)
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.3);

//Legend text 
                legend.selectAll("text")
                        .data([minEData, ...colorThresholds, maxEData])
                        .enter()
                        .append("text")
                        .attr("x", (d, i)=> i * (legendWidth + 1))
                        .attr("y", legendHeight + 10)
                        .text(d => Math.round(d) + "%")
                        .attr("text-anchor", "middle")
                        .style("font-size", "9px");

//Tooltip
                const tooltip = d3.select("body")
                                    .append("div")
                                    .attr("id", "tooltip")

//Tooltip styling
                                    .style("position", "absolute")
                                    .style("opacity", 0)
                                    .style("padding", "1%")
                                    .style("text-align", "center")
                                    .style("font-size", "12px");

//Tooltip addition
                svg.selectAll("path")
                    .on("mouseover", (e, d) =>{
                        const htmlData = educationMap[d.id];
                        console.log(htmlData);

                        tooltip.attr("data-education", htmlData.bachelorsOrHigher)
                                .style("opacity", 1)
                                .style("display", "block")
                                .style("background-color", "aliceblue")
                                .html(`${htmlData.area_name}<br>
                                     ${htmlData.state}: ${htmlData.bachelorsOrHigher}%`)
                                .style("left", (e.pageX + 10) + "px")
                                .style("top", (e.pageY + 10) + "px");            
                    })
                    .on("mouseout", e => 
                        tooltip.style("opacity", 0)
                                .style("display", "none")
                    )

        }
            catch(error){
            window.alert("There was an error trying to obtain data. " + error);
        };    
});

