from pathlib import Path
import argparse,shutil
p=argparse.ArgumentParser();p.add_argument('destination');args=p.parse_args()
dest=Path(args.destination).resolve()
if dest.exists():raise SystemExit('Destination exists; choose a new directory. Existing work is not overwritten.')
shutil.copytree(Path(__file__).resolve().parents[1]/'assets/template',dest)
print(dest)
