const fs = require("fs");
const path = require("path");

const nm = "D:/first_one/my-vue-app-new/node_modules";
const pnpmDir = path.join(nm, ".pnpm");

const entries = fs.readdirSync(pnpmDir).filter((e) => !e.startsWith("."));
const byName = new Map();
for (const e of entries) {
  let name;
  if (e.startsWith("@")) {
    const plus = e.indexOf("+");
    const at = e.indexOf("@", 1);
    name = "@" + e.slice(1, plus) + "/" + e.slice(plus + 1, at);
  } else {
    name = e.slice(0, e.indexOf("@"));
  }
  if (!byName.has(name)) byName.set(name, []);
  byName.get(name).push(e);
}

const dups = [...byName].filter(([, v]) => v.length > 1);
console.log(
  "duplicate-version names:",
  dups.length
    ? dups.map(([n, v]) => n + " -> " + v.join(" , ")).join(" ; ")
    : "none"
);

let incomplete = 0;
for (const e of entries) {
  let name;
  if (e.startsWith("@")) {
    const plus = e.indexOf("+");
    const at = e.indexOf("@", 1);
    name = "@" + e.slice(1, plus) + "/" + e.slice(plus + 1, at);
  } else {
    name = e.slice(0, e.indexOf("@"));
  }
  const own = path.join(pnpmDir, e, "node_modules", name);
  if (!fs.existsSync(path.join(own, "package.json"))) {
    incomplete++;
    console.log("ENTRY INCOMPLETE:", e);
  }
}
console.log("incomplete store entries:", incomplete);

let repaired = 0;
let missing = 0;

function isBrokenPkg(p) {
  try {
    return fs.existsSync(p) && !fs.existsSync(path.join(p, "package.json"));
  } catch (e) {
    return true;
  }
}

function repairLink(linkPath, pkgName) {
  const cands = byName.get(pkgName);
  if (!cands || cands.length === 0) {
    missing++;
    console.log("NO ENTRY for", pkgName, "at", linkPath);
    return;
  }
  if (cands.length > 1) {
    console.log("AMBIGUOUS for", pkgName, "candidates:", cands.join(","));
  }
  const target = path.join(pnpmDir, cands[0], "node_modules", pkgName);
  if (!fs.existsSync(path.join(target, "package.json"))) {
    missing++;
    console.log("TARGET INCOMPLETE", target);
    return;
  }
  fs.rmSync(linkPath, { recursive: true, force: true });
  fs.symlinkSync(target, linkPath, "junction");
  repaired++;
}

for (const e of entries) {
  const inner = path.join(pnpmDir, e, "node_modules");
  if (!fs.existsSync(inner)) continue;
  for (const child of fs.readdirSync(inner)) {
    if (child.startsWith(".")) continue;
    const c = path.join(inner, child);
    if (child.startsWith("@")) {
      let kids = [];
      try {
        kids = fs.readdirSync(c);
      } catch (err) {
        continue;
      }
      for (const k of kids) {
        if (k.startsWith(".")) continue;
        const kp = path.join(c, k);
        if (isBrokenPkg(kp)) repairLink(kp, child + "/" + k);
      }
    } else {
      if (isBrokenPkg(c)) repairLink(c, child);
    }
  }
}

for (const child of fs.readdirSync(nm)) {
  if (child.startsWith(".")) continue;
  const c = path.join(nm, child);
  if (child.startsWith("@")) {
    let kids = [];
    try {
      kids = fs.readdirSync(c);
    } catch (err) {
      continue;
    }
    for (const k of kids) {
      if (k.startsWith(".")) continue;
      const kp = path.join(c, k);
      if (isBrokenPkg(kp)) repairLink(kp, child + "/" + k);
    }
  } else {
    if (isBrokenPkg(c)) repairLink(c, child);
  }
}

console.log("repaired:", repaired, "missing:", missing);
