#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os

# Criar uma imagem 64x64
img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Desenhar círculo de fundo verde
draw.ellipse([2, 2, 62, 62], fill=(76, 175, 80, 255), outline=(46, 125, 50, 255), width=2)

# Desenhar triângulo de play (branco)
triangle_points = [(24, 18), (24, 46), (46, 32)]
draw.polygon(triangle_points, fill=(255, 255, 255, 255))

# Salvar como PNG
img.save('playButton.png', 'PNG')
print("Ícone playButton.png criado com sucesso!")
