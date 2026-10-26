"""Package the shared skill and verify local Claude/Codex copies match."""
from pathlib import Path
import hashlib
import zipfile

root = Path(__file__).resolve().parents[1]
claude = root / '.claude/skills/teukgang-slides'
codex = root / '.codex/skills/teukgang-slides'

def manifest(folder):
    return {p.relative_to(folder).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in folder.rglob('*') if p.is_file()
            and not any(part in ('__pycache__', 'node_modules', 'validation') for part in p.parts)
            and p.suffix != '.pyc'}

if manifest(claude) != manifest(codex):
    raise SystemExit('Claude and Codex skill copies differ; sync them before packaging.')
out = root / 'dist/teukgang-slides.zip'
out.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(out, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for relative in sorted(manifest(claude)):
        archive.write(claude / relative, 'teukgang-slides/' + relative)
with zipfile.ZipFile(out) as archive:
    assert 'teukgang-slides/SKILL.md' in archive.namelist()
    assert archive.testzip() is None
print(f'{out}: {out.stat().st_size:,} bytes')
