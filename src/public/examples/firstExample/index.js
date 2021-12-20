async function getMainNode() {
    let width = 300;
    let height = 502;
    let tipoVotoPorProvincia = await d3.json("/api/provincias/tipovoto");
    let provincias = await d3.json("/api/provincias");
    let tiposDeVotos = await d3.json("/api/tiposDeVotos");
    let idNulos = tiposDeVotos.find((e) => {
        return e.name == "nulos";
    }).id;

    let data = {};
    for (const p of provincias) {
        data[p.name] = {
            votos_nulos: tipoVotoPorProvincia[p.id].find((e) => {
                return e.idtipovoto == idNulos;
            }).votos,
            votos_totales: tipoVotoPorProvincia[p.id].reduce((acc, curr) => {
                return curr.votos + acc;
            }, 0),
        };
    }
    function getData(d){
        if(d == "Tierra del Fuego") return data["Tierra del Fuego, Antártida e Islas del Atlántico Sur"]
        else if(d == "Capital Federal") return data["Ciudad Autónoma de Buenos Aires"]
        else return data[d]
      }


    let minVotos = Math.min(
        ...Object.values(data).map((v) => v.votos_nulos / v.votos_totales)
    );
    let maxVotos = Math.max(
        ...Object.values(data).map((v) => v.votos_nulos / v.votos_totales)
    );

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
        .style("fill", function (a) {
            let d = getData(a.properties.nombre);
            return d3.interpolateReds(
                d.votos_nulos / d.votos_totales / maxVotos
            );
        })
        .style("stroke", "#ccc")
        .on("mouseover", function (event, a, i) {
            let d = getData(a.properties.nombre);
            return tooltip
                .text(
                    `${a.properties.nombre}:${d.votos_nulos} votos nulos de ${
                        d.votos_totales
                    } (${((d.votos_nulos / d.votos_totales) * 100).toFixed(
                        2
                    )}%)`
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

d3.select("body")
    .node()
    .appendChild(await getMainNode());
