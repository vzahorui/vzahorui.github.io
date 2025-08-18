import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

const WIDTH = 1800;
const HEIGHT = 2200;

const raw = document.getElementById('graph-data').textContent;
const graph = JSON.parse(raw);

// radius scale from node sizes
const sizes = graph.nodes.map(n => (typeof n.size === 'number' ? n.size : 1));
const radius = d3.scaleSqrt()
  .domain(d3.extent(sizes))
  .range([6, 34]);

// prepare label two-node trick
const label = { nodes: [], links: [] };
graph.nodes.forEach((n, i) => {
  label.nodes.push({ node: n });
  label.nodes.push({ node: n });
  label.links.push({ source: i * 2, target: i * 2 + 1 });
});

// container
const root = d3.select('#chartId');
root.selectAll('*').remove();

const wrapper = root.append('div').classed('svg-container', true);

const svg = wrapper.append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
  // center the content in the container (was xMinYMin)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  // ensure svg fills the container box
  .attr('width', '100%')
  .attr('height', '100%')
  .classed('svg-content-responsive', true)
  .attr('role', 'img')
  .attr('aria-label', 'Article relationship graph');

// allow normal vertical scrolling and pinch when appropriate
svg.style('touch-action', 'pan-y pinch-zoom');

const g = svg.append('g').attr('class', 'graph-root');

// zoom behavior: wheel zoom only when Ctrl/Cmd is pressed
const zoom = d3.zoom()
  .scaleExtent([0.2, 4])
  .filter((event) => {
    if (event.type === 'wheel') return event.ctrlKey || event.metaKey;
    return true;
  })
  .on('zoom', (event) => {
    g.attr('transform', event.transform);
  });

// attach zoom (filter handles wheel behavior)
svg.call(zoom);

// links
const link = g.append('g').attr('class', 'links')
  .selectAll('line')
  .data(graph.links)
  .enter()
  .append('line')
  .attr('stroke', '#273746')
  .attr('stroke-width', 1.5);

// node groups
const nodeG = g.append('g').attr('class', 'nodes')
  .selectAll('g')
  .data(graph.nodes)
  .enter()
  .append('g')
  .attr('class', 'node')
  .style('cursor', 'grab')
  .on('dblclick', (event, d) => {
    if (d.url) window.open(d.url, '_blank');
  })
  .on('click', (event, d) => {
    if (event.defaultPrevented) return;
    const gEl = d3.select(event.currentTarget);
    const circ = gEl.select('circle');
    const pinned = circ.classed('node-pinned');
    if (!pinned) {
      circ.classed('node-pinned', true).attr('fill', '#f1c40f'); // ensure visible yellow
      d.fx = d.x;
      d.fy = d.y;
    } else {
      circ.classed('node-pinned', false).attr('fill', '#d4d3da');
      d.fx = null;
      d.fy = null;
    }
  });

// circle + title
nodeG.append('circle')
  .attr('r', d => radius(d.size))
  .attr('fill', '#d4d3da')
  .attr('stroke', '#273746')
  .attr('stroke-width', 1.5);

nodeG.append('title').text(d => `${d.id}\n${d.url || ''}`);

// label nodes (two-node trick) as links
const labelNode = g.append('g').attr('class', 'labelNodes')
  .selectAll('text')
  .data(label.nodes)
  .enter()
  .append('a')
  .attr('href', d => d.node.url || '#')
  .attr('target', '_blank')
  .append('text')
  .text((d, i) => (i % 2 === 0 ? '' : d.node.id))
  .attr('fill', '#333')
  .attr('font-family', 'Arial')
  .attr('font-size', d => (d.node.font ? `${d.node.font}em` : '1em'))
  .attr('text-anchor', 'start')
  .attr('dx', 6);

// simulations
const labelSim = d3.forceSimulation(label.nodes)
  .force('charge', d3.forceManyBody().strength(-30))
  .force('link', d3.forceLink(label.links).distance(0).strength(1))
  .alphaDecay(0.05);

const sim = d3.forceSimulation(graph.nodes)
  .force('link', d3.forceLink(graph.links).id(d => d.id).distance(d => d.distance || 100).strength(1))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))
  .force('collide', d3.forceCollide().radius(d => radius(d.size) + 6).strength(1))
  .force('x', d3.forceX(WIDTH / 2).strength(0.02))
  .force('y', d3.forceY(HEIGHT / 2).strength(0.01))
  .on('tick', ticked);

// drag
const drag = d3.drag()
  .on('start', (event, d) => {
    event.sourceEvent.stopPropagation();
    if (!event.active) sim.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
    d3.select(event.sourceEvent.target.closest ? event.sourceEvent.target.closest('.node') : event.currentTarget).style('cursor', 'grabbing');
  })
  .on('drag', (event, d) => {
    d.fx = event.x; d.fy = event.y;
  })
  .on('end', (event, d) => {
    if (!event.active) sim.alphaTarget(0);
    const nodeSel = d3.select(event.sourceEvent.target.closest ? event.sourceEvent.target.closest('.node') : event.currentTarget);
    const circ = nodeSel.select('circle');
    const pinned = circ.classed('node-pinned');
    if (!pinned) {
      d.fx = null; d.fy = null;
      circ.attr('fill', '#d4d3da');
    } else {
      d.fx = event.x; d.fy = event.y;
      circ.attr('fill', '#f1c40f');
    }
    nodeSel.style('cursor', 'grab');
  });

nodeG.call(drag);

function ticked() {
  link
    .attr('x1', d => fix(d.source.x))
    .attr('y1', d => fix(d.source.y))
    .attr('x2', d => fix(d.target.x))
    .attr('y2', d => fix(d.target.y));

  nodeG.attr('transform', d => `translate(${fix(d.x)},${fix(d.y)})`);

  labelSim.alphaTarget(0.3).restart();

  labelNode.each(function(d, i) {
    if (i % 2 === 0) {
      d.x = d.node.x;
      d.y = d.node.y;
    } else {
      const b = this.getBBox();
      const diffX = d.x - d.node.x;
      const diffY = d.y - d.node.y;
      const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1;
      let shiftX = b.width * (diffX - dist) / (dist * 2);
      shiftX = Math.max(-b.width, Math.min(0, shiftX));
      const shiftY = 6;
      this.setAttribute('transform', `translate(${shiftX},${shiftY})`);
    }
  });

  labelNode.attr('x', d => fix(d.x)).attr('y', d => fix(d.y));
}

function fix(v) { return Number.isFinite(v) ? v : 0; }

// responsive: recenter on resize (debounced)
let rt;
window.addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(() => {
    const box = svg.node().getBoundingClientRect();
    sim.force('center', d3.forceCenter(box.width / 2, box.height / 2));
    sim.alpha(0.5).restart();
  }, 150);
}, { passive: true });