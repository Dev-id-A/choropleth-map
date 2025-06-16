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
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")
        .then(us =>{
            try{
            const counties = topojson.feature(us, us.objects.counties).features;

//Append map to svg
                svg.selectAll("path")
                    .data(counties)
                    .enter()
                    .append("path")
                    .attr("d", d3.geoPath())
//Styling map
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.2)
                    .attr("transform", "translate(100, 10) scale(0.8)");

        }
            catch(error){
            window.alert("There was an error trying to obtain data.");
        };    
});

