let agrupaciones = await d3.json(`http://localhost:8080/api/agrupaciones`);
let jsData = await d3.json(`http://localhost:8080/api/provincias/1/cargo/3/agrupacion`);
let values = []
for (const d of jsData) {
    if (d.idAgrupacion != null) {
        values.push({
            agrupacion: agrupaciones.find(v => {
                return v.id == d.idAgrupacion;
            })?.name,
            votos:d.votos
        });
    }
}

const spec = {
    height:300,
    width:400,
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Bar chart votos del frente de izquierda",
    "data": {
      "values": values
    },
    "mark": "bar",
    "encoding": {
      "y": {"field": "agrupacion", "type": "nominal", "axis": {"labelAngle": 0},},
      "x": {"field": "votos", "type": "quantitative"}
    },
    "config": {}
  };



vegaEmbed("#vis", spec, {mode: "vega-lite"}).then(console.log).catch(console.warn);