//Variables
    const width = 1000;
    const height = 700;

//Svg created 

    const svg = d3.select("body")
                    .append("svg")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("viewBox", `0 0 ${width} ${height}`)
                    .attr("preserveAspectRatio", "xMidYMid meet");
//Title

//Description

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
            }
            catch(error){
            window.alert("There was an error trying to obtain data.");
        };    
});

