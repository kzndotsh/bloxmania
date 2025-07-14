#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

names = [
  'Ali-A','CaseOh','DanTDM','Flamingo',
  'KreekCraft','LanasLife','SypherPK','TypicalGamer'
]

def make_circle(src:Path):
  if not src.exists(): print(f'[skip] {src}'); return
  im = Image.open(src).convert('RGBA')
  w,h = im.size
  side = max(w,h)

  # 1️⃣ fresh transparent square
  out = Image.new('RGBA',(side,side),(0,0,0,0))

  # 2️⃣ solid-opaque circular mask (no anti-alias trickery)
  mask = Image.new('L',(side,side),0)
  ImageDraw.Draw(mask).ellipse((0,0,side-1,side-1),fill=255)

  # 3️⃣ paste original centred, but only where mask is white
  out.paste(im,((side-w)//2,(side-h)//2),mask)

  dst = src.with_stem(src.stem + '_circle').with_suffix('.png')
  out.save(dst)
  print(f'Created: {dst.name}')

for n in names:
  make_circle(Path(f'{n}.png'))
