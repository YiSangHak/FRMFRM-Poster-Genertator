export const rectGeometry = ({col,row,w,h}) => ({x:16.5+col*30,y:16.5+row*30,width:w*30-3,height:h*30-3});
export const markers = Array.from({length:165},(_,i)=>({x:15+(i%11)*30,y:15+Math.floor(i/11)*30}));
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

// Cells are local to an element so moving or copying preserves its silhouette.
export function shapeCells(e){return e.cells ?? Array.from({length:e.w*e.h},(_,i)=>[i%e.w,Math.floor(i/e.w)]);}
export function shapePath(e){
 const cells=shapeCells(e), occupied=new Set(cells.map(([x,y])=>`${x},${y}`));
 const has=(x,y)=>occupied.has(`${x},${y}`), parts=[];
 const rect=(x,y,w,h)=>parts.push(`M${15+e.col*30+x} ${15+e.row*30+y}h${w}v${h}h${-w}Z`);
 for(const [x,y] of cells){
  rect(x*30+1.5,y*30+1.5,27,27);
  if(e.rectMode==='cells')continue;
  if(has(x+1,y))rect(x*30+28.5,y*30+1.5,3,27);
  if(has(x,y+1))rect(x*30+1.5,y*30+28.5,27,3);
  if(has(x+1,y)&&has(x,y+1)&&has(x+1,y+1))rect(x*30+28.5,y*30+28.5,3,3);
 }
 return parts.join('');
}
export function joinShapes(elements,id){
 let shape=elements.find(e=>e.id===id);
 if(!shape||shape.type!=='rect'||shape.rectMode==='cells')return elements;
 const joined=new Set([id]);
 const absolute=e=>shapeCells(e).map(([x,y])=>[x+e.col,y+e.row]);
 const occupied=new Map(absolute(shape).map(c=>[c.join(','),c]));
 let changed=true;
 while(changed){changed=false;for(const e of elements){
  if(joined.has(e.id)||e.type!=='rect'||e.rectMode==='cells'||e.fill!==shape.fill||e.autoColor!==shape.autoColor)continue;
  const cells=absolute(e);
  if(!cells.some(([x,y])=>[[x,y],[x-1,y],[x+1,y],[x,y-1],[x,y+1]].some(c=>occupied.has(c.join(',')))))continue;
  joined.add(e.id);cells.forEach(c=>occupied.set(c.join(','),c));changed=true;
 }}
 if(joined.size===1)return elements;
 const cells=[...occupied.values()],col=Math.min(...cells.map(c=>c[0])),row=Math.min(...cells.map(c=>c[1]));
 shape={...shape,col,row,w:Math.max(...cells.map(c=>c[0]))-col+1,h:Math.max(...cells.map(c=>c[1]))-row+1,cells:cells.map(([x,y])=>[x-col,y-row])};
 return elements.filter(e=>!joined.has(e.id)||e.id===id).map(e=>e.id===id?shape:e);
}
