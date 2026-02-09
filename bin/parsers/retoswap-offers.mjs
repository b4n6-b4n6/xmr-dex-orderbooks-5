#!/usr/bin/env node

import { parse } from 'acorn';
import { simple } from 'acorn-walk';
import { JSDOM } from 'jsdom';

import fs from 'fs';
import vm from 'vm';

const outputFileName = process.argv[2]
process.stdin.setEncoding('utf-8')
const html = await process.stdin.reduce((acc, chunk) => acc + chunk, '');
const dom = new JSDOM(html);
const scripts = dom.window.document.querySelectorAll('script');

const code = scripts[0].innerHTML;
const ast = parse(code, { ecmaVersion: 2020 });

const weirdStuff = snippet => `const myvar = ${snippet}; myvar;`

simple(ast, {
  Property(node) {
    if (node.key.type === 'Identifier' && node.key.name === 'offers') {
      const snippet = code.slice(node.value.start, node.value.end);
      const offers = vm.runInNewContext(weirdStuff(snippet));
      const json = JSON.stringify(offers, null, 2);
      fs.writeFileSync(outputFileName ?? process.stdout.fd, json);
    }
  }
});
