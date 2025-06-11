//Variables
    const width = 1000;
    const height = 700;
    const padding = 200;

//Svg created 

    const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", `translate(${width/3} ${padding/5})`);
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
                    .attr("stroke-width", 0.2);
        }
            catch(error){
            window.alert("There was an error trying to obtain data.");
        };    
});

