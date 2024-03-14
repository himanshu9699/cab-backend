// dijkstra.js

// Define the graph with distances between nodes
const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, E: 20, D: 15 },
    C: { A: 7, E: 35, D: 5 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { E: 10, D: 20 }
  };
  
  // Function to calculate the shortest path using Dijkstra's algorithm
  function dijkstra(graph, start, target) {
    let distances = {};
    let visited = new Set();
    let nodes = Object.keys(graph);
    let previous = {};
  
    for (let node of nodes) {
      distances[node] = Infinity;
      previous[node] = null;
    }
  
    distances[start] = 0;
  
    while (nodes.length) {
      nodes.sort((a, b) => distances[a] - distances[b]);
      let closestNode = nodes.shift();
  
      if (distances[closestNode] === Infinity) break;
  
      visited.add(closestNode);
  
      for (let neighbor in graph[closestNode]) {
        if (!visited.has(neighbor)) {
          let newDistance = distances[closestNode] + graph[closestNode][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = closestNode;
          }
        }   
      }
    }
  
    let length = distances[target];
    return length !== Infinity ? length : null; // Return null if no path found
  }
  
  module.exports = dijkstra;
  