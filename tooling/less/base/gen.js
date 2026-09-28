import less from 'less';
console.log((await less.render('.box { width: (1px + 1px); }')).css);
