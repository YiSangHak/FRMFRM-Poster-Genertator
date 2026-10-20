export const rectGeometry = ({col,row,w,h}) => ({x:16.5+col*30,y:16.5+row*30,width:w*30-3,height:h*30-3});
export const markers = Array.from({length:165},(_,i)=>({x:15+(i%11)*30,y:15+Math.floor(i/11)*30}));
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
