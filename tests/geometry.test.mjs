import test from 'node:test';
import assert from 'node:assert/strict';
import {rectGeometry,markers} from '../src/geometry.mjs';
test('1×1 and 3×2 rectangles use a single outer inset',()=>{assert.deepEqual(rectGeometry({col:0,row:0,w:1,h:1}),{x:16.5,y:16.5,width:27,height:27});assert.deepEqual(rectGeometry({col:2,row:3,w:3,h:2}),{x:76.5,y:106.5,width:87,height:57})});
test('165 markers and only interior intersections are covered',()=>{assert.equal(markers.length,165);assert.deepEqual(markers.at(-1),{x:315,y:435});const r=rectGeometry({col:0,row:0,w:3,h:2});const inside=markers.filter(p=>p.x>r.x&&p.x<r.x+r.width&&p.y>r.y&&p.y<r.y+r.height);assert.deepEqual(inside,[{x:45,y:45},{x:75,y:45}]);assert.equal(r.x-1.5,15);assert.equal(r.x+r.width+1.5,105)});
