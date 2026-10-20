import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import opentype from 'opentype.js';
test('real OTF glyphs scale to 27 mm and are centered in each cell',()=>{const b=fs.readFileSync('public/assets/fonts/FRMFRMMONO-Regular.otf');const font=opentype.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));for(const c of 'FRMFRM'){const g=font.charToGlyph(c),box=g.getBoundingBox(),s=27/(box.y2-box.y1);assert.ok(g.index>0);assert.ok(Math.abs((box.y2-box.y1)*s-27)<1e-9);const tx=30-(box.x1+box.x2)/2*s;const ty=30+(box.y1+box.y2)/2*s;assert.ok(Math.abs(tx+(box.x1+box.x2)/2*s-30)<1e-9);assert.ok(Math.abs(ty-(box.y1+box.y2)/2*s-30)<1e-9)}});
