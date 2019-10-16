// implements graph

function BFS(graph, root) {
  const nodesLen = {}

  for (let i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity
  }

  nodesLen[root] = null

  const queue = [root]
  let current

  while (queue.length !== 0) {
    current = queue.shift()

    const curConnected = graph[current]
    const neighborIdx = []
    let idx = curConnected.indexOf(1)

    while (idx != -1) {
      neighborIdx.push(idx)
      idx = curConnected.indexOf(1, idx + 1)
    }

    for (let j = 0; j < neighborIdx.length; j++) {
      if (nodesLen[neighborIdx[j]] === Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1
        queue.push(neighborIdx[j])
      }
    }
  }

  return nodesLen
}


// main

const graph = [
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
]

console.log(bfs(graph, 1))
