#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from "node:path"
import { readFile, writeFile } from "node:fs/promises"
import Converter from "convert-svg-to-png"
const { convert } = Converter

const TARGET=[
    {name:"pwa-192x192.png", width:192, height:192},
    {name:"pwa-512x512.png", width:512, height:512},
    {name:"apple-touch-icon.png", width:180, height:180},
]

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public")
const SVGPath = resolve(publicDir, "./favicon.svg")
const SVGBuffer = await readFile(SVGPath)
for await (let {name,width,height} of TARGET){
    const png = await convert(SVGBuffer, {width,height})
    writeFile(resolve(publicDir, `./${name}`), png)
}
