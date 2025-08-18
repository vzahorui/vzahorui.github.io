// Load the graph data from a JSON file
d3.json('{{ site.baseurl }}/assets/data/graph.json').then(data => {

    const width = 1800;
    const height = 2200;

    // Create the SVG container and set its dimensions
    const svg = d3.select("#chartId")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .classed("svg-content-responsive", true);

    const container = svg.append("g");

    // Define the force simulation for the graph
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(d => d.distance).strength(1))
        .force("charge", d3.forceManyBody().strength(-600))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.03))
        .force("y", d3.forceY(height / 2).strength(0.01));

    // Create the links (lines)
    const link = container.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .join("line");

    // Create a group for each node, which will contain both the circle and the text label
    const node = container.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(data.nodes)
        .join("g")
        .call(drag(simulation))
        .on("click", (event, d) => window.open(d.url, '_blank'));

    // Append the circles to the node group
    const radius = d3.scaleSqrt().range([5, 25]); // Use a better radius scale
    node.append("circle")
        .attr("r", d => radius(d.size))
        .attr("fill", "#2ecc71"); // A fresh, modern green

    // Append the text labels to the node group
    node.append("text")
        .text(d => d.id)
        .attr("font-size", d => d.font + 'em')
        .attr("dx", 15)
        .attr("dy", 4);

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // --- Drag Behavior ---
    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; // Release the node
            d.fy = null; // Release the node
        }
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
});