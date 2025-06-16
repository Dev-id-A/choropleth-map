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
            eData.forEach(d => educationMap[d.fips] = d.bachelorsOrHigher)

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
                    .attr("transform", "translate(100, 10) scale(0.8)")
                    .attr("fill", d => colorScheme(educationMap[d.id]));

        }
            catch(error){
            window.alert("There was an error trying to obtain data.");
        };    
});

