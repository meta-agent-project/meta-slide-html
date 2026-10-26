# 모션과 빌드

## 프로젝트

`init_project.py`는 새 폴더에 `build.py`, `shell.html`, `style.css`, `slides.json`, `assets`, `motion`, `validate.cjs`를 복사한다. 예제 원고는 새 강의로 교체한다. 스킬 폴더는 설치 위치와 무관하게 이동 가능하다.

slides.json의 각 항목: `key`(안정적인 식별자), `title`, `chapter`, `kind`(intro/divider/content), `seconds`(정수), `body`(HTML), `notes`. 최상위 `title`, `targetSeconds`. motion 항목은 `html`, `steps`, 선택 `cycle`, `maze`; 각 단계 요소에 `data-flow-step="0"`부터 순서대로 부여한다. 이미지 표기는 `{{asset:professor.png}}`. assets 내부 파일만 사용한다.

`python build.py` → `lecture.html`, `slides-built.json`, `발표자-노트.md`. HTML은 CDN이나 원본 프로젝트 경로 없이 작동한다. 수정 후 재빌드하면 HTML 편집기에서만 고친 내용은 덮이므로, JSON 내보내기/원고 동기화를 먼저 한다.

## 실시간 모션

- 제공하는 assets/flow-live.js는 미리 번들한 Remotion이다. 단순 흐름은 JSON 변경만으로 동작한다. 소스를 수정할 때는 motion에서 `npm install`, `node bundle.cjs`, 프로젝트 루트에서 `python build.py`.
- 제공 소스는 Remotion 4.0.536, React 19.3.1, esbuild 0.28.2로 고정한다. 설치 환경에서 호환성을 확인하고 무조건 최신으로 바꾸지 않는다. 런타임을 사용할 수 없으면 모션 완성이라고 보고하지 않는다.
- 48fps 기준, 기본 등장 효과10프레임(약0.21초), 단계 간28프레임(약0.58초). ‘2배 빠르게’의 기준을 이 수치로 보존한다. 단순히 fps만 반복해서 두 배로 올리지 않는다.
- 버튼 순서: **재생 · 일시정지 · 이전 · 다음 · 다시시작**. 이전/다음은 의미 있는 설명 단계에 정지한다. Remotion 모션은 공통 controls.jsx를 사용하고, DOM 모션도 같은 순서·동작으로 맞춘다.
- 일반 ←/→ 및 Page Up/Down은 현재 설명의 이전/다음 단계를 우선 이동하고, 해당 방향 끝에서는 슬라이드를 이동한다. **Shift+←/→는 즉시 이전/다음 슬라이드**. shell의 키 핸들러가 iframe 내부 `data-motion-direction="previous|next"` 버튼(또는 정확히 ‘이전’/‘다음’인 버튼)을 클릭한다. 버튼 클릭 전 자동재생을 멈추고 단계 변화가 없을 때만 장을 넘긴다. 모션은 `data-live-frame` 또는 `data-flow-frame` 등 단계 표식을 갱신한다. 화면 왼쪽/오른쪽의 빈 곳 클릭은 즉시 이전/다음 장 이동이다. 버튼·링크·편집/텍스트 선택은 클릭 이동에서 제외한다. 본문 편집/input/select에서는 단축키가 타이핑을 가로채지 않는다. 부모 화면과 iframe에 포커스가 있을 때 모두 확인한다.
- DOM/SVG 상태 전환이나 Player와 useCurrentFrame으로 새 경로/누적/대화 장면을 만든다. 화살표는 위치·선 진행으로 실제 이동을 표현한다. 모든 장면을 단순 페이드로만 대체하지 않는다.
- 연구 설명→사례처럼 서로 다른 내용을 갈아끼우기만 하는 화면은 두 장으로 분리하고 내부 모션 버튼을 없앤다.
- 이미지만 넘어가는 영상, MP4, WebM, GIF로 Remotion을 대체하지 않는다. `<video>` 없이 모션이 DOM에서 작동해야 한다. 이미 생성한 그림을 배경/인물로 넣는 것은 가능하다.
- 내보낸 HTML에도 JS·설정·이미지가 남아 다시 열었을 때 모션이 작동해야 한다. 리모션 영역은 `data-sr-opaque`로 일반 문구 편집 대상과 구분한다.

## 출처와 플랫폼

웹 검색·이미지 생성·검증 브라우저는 실행 환경에 실제 제공된 도구를 이용한다. Claude Code에 Codex 내장 도구가 있다고 가정하지 않는다. Claude Code에서 Codex CLI 이미지 위임을 선택한 경우에만 [Codex CLI spawn 절차](claude-codex.md)를 따른다. Claude 웹/ChatGPT에서는 로컬 CLI를 전제로 하지 않고 제공된 그림이나 사용 가능한 이미지 도구를 사용한다. 위임 환경에서도 도구를 사용할 수 없으면 제약을 밝히고 나머지 제작을 진행한다. 승인 없이 외부 유료 API를 설정하지 않는다.

