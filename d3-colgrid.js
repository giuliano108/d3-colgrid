(function() {
  d3.layout.colgrid = function() {
    var x = d3.scale.ordinal(),
        y = d3.scale.ordinal(),
        gridsize = [1, 1],
        nodesize = [0, 0],
        padding = [0, 0],
        cols, rows;

    /* Takes a list of columns. Each column is a list of nodes.
     * Returns a list of {d:node, x:_, y:_} */
    function colgrid(nodes) {
      var ri, ci = -1, 
          n = nodes.length;
      cols = nodes.length;
      rows = d3.max(nodes.map(function(c) {return c.length}));

      x.domain(d3.range(cols)).rangeBands([0, gridsize[0]], padding[0], 0);
      y.domain(d3.range(rows)).rangeBands([0, gridsize[1]], padding[1], 0);
      nodesize[0] = x.rangeBand();
      nodesize[1] = y.rangeBand();

      outnodes = []
      while (++ci < cols) {
          ri = -1;
          while (++ri < rows) {
              if(typeof(nodes[ci][ri]) != 'undefined') {
                  outnode = {}
                  outnode.d = nodes[ci][ri];
                  outnode.x = x(ci);
                  outnode.y = y(ri);
                  outnodes.push(outnode);
              }
          }
      }
      return outnodes;
    }

    colgrid.size = function(value) {
      if (!arguments.length) return gridsize;
      gridsize = value;
      return colgrid;
    }

    colgrid.nodesize = function() {
      return nodesize;
    }

    colgrid.padding = function(value) {
      if (!arguments.length) return padding;
      padding = value;
      return colgrid;
    }

    return colgrid;
  };
})();
