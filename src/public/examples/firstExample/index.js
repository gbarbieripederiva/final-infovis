async function getMainNode(){
    let width = 300;
    let height = 502;
    let geodata = await d3.json("/assets/ProvinciasArgentina.geojson");
    let projection = d3.geoIdentity().reflectY(true).fitWidth(width, geodata);
    let path = d3.geoPath(projection);
    
    let div = d3.create("div");
    let svg = div.append("svg").attr("width", width).attr("height", height);
    
    let tooltip = div
        .append("div")
        .style("position", "fixed")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-color", "gray")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("width", "10em");
    svg.selectAll("path")
        .data(geodata.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#fff")
        .style("stroke", "#ccc")
        .on("mouseover", function (event, a, i) {
            let d = getData(a.properties.nombre);
            return tooltip
                .text(
                    "ejemplo tooltip"
                )
                .style("visibility", "visible");
        })
        .on("mousemove", function (event) {
            let maxExtOfDiv = div.node().getBoundingClientRect().bottom;
            let tooltipHeight = tooltip.node().getBoundingClientRect().height;
            let maxExtOfTooltip = event.clientY + tooltipHeight;
            if (maxExtOfDiv > maxExtOfTooltip) {
                tooltip
                    .style("top", event.clientY + "px")
                    .style("left", event.clientX + "px");
            } else {
                tooltip
                    .style("top", event.clientY - tooltipHeight + "px")
                    .style("left", event.clientX + "px");
            }
        })
        .on("mouseout", function (event) {
            return tooltip.style("visibility", "hidden");
        });

    return div.node();
}

d3.select("body").node().appendChild(await getMainNode());