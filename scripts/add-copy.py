# Usage: python3 scripts/add-copy.py <json-file-with {"en":{...},"ar":{...},"ja":{...}}>
# Deep-merges new copy into messages/*.json, keeping key order.
import json, sys
new = json.load(open(sys.argv[1], encoding="utf8"))
def merge(a, b):
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(a.get(k), dict):
            merge(a[k], v)
        else:
            a[k] = v
for loc, tree in new.items():
    p = f"messages/{loc}.json"
    d = json.load(open(p, encoding="utf8"))
    merge(d, tree)
    with open(p, "w", encoding="utf8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("updated", p)
