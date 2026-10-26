# 특강 HTML 슬라이드 · meta-slide-html

흰 배경·검정 펜 그림·큰 한국어 글씨로 강의자료를 만드는 스킬입니다. Claude와 ChatGPT용 업로드 패키지, Claude Code·Codex용 로컬 스킬, 단일 HTML 제작 템플릿을 제공합니다. 기존 설치와 호출을 유지하기 위해 스킬 이름은 `teukgang-slides`로 유지합니다.

## 현재 강의

- [AI와 친해지기 — 발표용 HTML](slides/AI와-친해지기-검정펜.html)
- [강사용 발화 노트](slides/강사용-발화노트.md)
- [이전 버전과 최신본의 차이](slides/최신본-반영기록.md)
- 2026-10-27 사용자 제공 최신 HTML 기준 **42장: 본편 40장 + 출처 2장**.

HTML을 다운로드한 뒤 브라우저에서 여세요. GitHub 파일 화면에서는 발표 화면이 실행되지 않습니다. 그림과 모션 스크립트가 HTML에 내장되어 있습니다.

| 조작 | 동작 |
| --- | --- |
| ← / →, Page Up / Page Down | 현재 설명의 이전/다음 단계. 해당 방향 끝에서는 이전/다음 슬라이드 |
| Shift + ← / → | 설명 단계를 건너뛰고 즉시 이전/다음 슬라이드 |
| 슬라이드의 빈 화면 왼쪽/오른쪽 클릭 | 즉시 이전/다음 슬라이드 |
| 상단 ← / →, 슬라이드 선택 | 즉시 슬라이드 이동 |
| N / F | 발표자 노트 / 전체화면 |

버튼·링크 클릭, 텍스트 선택, 편집 중에는 빈 화면 클릭 이동을 적용하지 않습니다. 모션은 재생·일시정지·이전·다음·다시시작을 지원합니다. 문구 편집 후에는 **수정 HTML 저장**을 눌러야 파일에 보존됩니다. JSON 내보내기/불러오기도 지원합니다.

원본 표지에는 50분으로 표시되어 있으나 내부 `minutes` 합계는 **40분 52초**, 표시 구간은 마지막 본편에서 **52:00**까지입니다. 중간 공백·누락도 있어 정확한 50분 시간표로 확정할 수 없습니다. 이번 반영에서는 제공된 HTML의 내용과 시간 데이터를 그대로 보존했습니다.

## Claude와 ChatGPT에 설치

[**업로드용 teukgang-slides.zip 다운로드**](dist/teukgang-slides.zip)

ZIP 안에는 `teukgang-slides/SKILL.md`와 템플릿·참고 자료·빌드 스크립트가 들어 있습니다. 이름과 설명을 포함한 공통 SKILL.md 형식을 사용하며 특정 플랫폼의 전용 도구를 필수로 요구하지 않습니다.

- **Claude 웹/데스크톱:** Customize → Skills에서 스킬 추가/업로드를 선택하고 ZIP을 올린 뒤 활성화합니다. 코드 실행이 켜져 있어야 합니다. [Claude 공식 안내](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
- **ChatGPT:** Plugins → Skills → Create → Upload from your computer에서 업로드합니다. 공식 안내상 지원 대상은 해당 기능이 제공되는 Business·Enterprise·Healthcare·Edu 계정이며, 워크스페이스 설정에 따라 달라집니다. [ChatGPT 공식 안내](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)

메뉴·사용 가능 조건 확인일: 2026-10-27. 메뉴가 없는 계정에서는 정식 스킬 설치를 했다고 간주하지 않습니다. 파일 실행이 가능한 일반 대화에서 ZIP을 첨부하고 압축을 풀어 SKILL.md와 템플릿을 읽도록 요청하는 방식으로 지침을 재사용할 수 있지만, 설치된 스킬의 자동 호출과는 다릅니다. 파일 실행이 불가능하면 빌드·검증 기능은 제한됩니다.

두 서비스에 각각 업로드해야 합니다. 한쪽에서 수정·설치한 것이 다른 서비스에 자동 동기화되지는 않습니다. 웹 환경에는 로컬 Codex CLI가 있다고 가정하지 않습니다. 그림은 제공된 참고 이미지나 사용 가능한 이미지 도구를 쓰고, 실제로 수행하지 못한 이미지 생성·브라우저 검증은 결과에서 명시합니다.

호출 예:

> teukgang-slides 스킬로 아래 원고를 비개발자 대상 50분 특강 HTML로 만들어줘. 흰 배경, 검정 펜 그림, 큰 글씨를 유지하고, 방향키로 설명 단계를 진행하게 해줘. 발표자 노트도 넣어줘.

## Claude Code와 Codex

| 환경 | 스킬 폴더 | 호출 |
| --- | --- | --- |
| Claude Code | [.claude/skills/teukgang-slides](.claude/skills/teukgang-slides/SKILL.md) | `/teukgang-slides` |
| Codex | [.codex/skills/teukgang-slides](.codex/skills/teukgang-slides/SKILL.md) | `$teukgang-slides` |

개인용으로 설치하려면 해당 폴더를 각각 `~/.claude/skills/` 또는 `~/.codex/skills/` 아래에 복사하세요. 두 사본은 같은 내용으로 유지하며 패키징 시 일치 여부를 검사합니다. Claude Code에서 Codex CLI가 설치·인증되어 있을 때는 이미지 제작을 선택적으로 위임할 수 있습니다.

채팅 원고, Markdown·TXT·Word·PDF·HTML, 접근 가능한 웹 문서를 입력으로 받을 수 있습니다. 원고 정리 → 흐름·시간 배분 → 그림과 모션 → HTML 빌드 → 브라우저 검증 순서로 제작합니다. 42장·러닝 주제·기존 강사명은 새 강의의 고정값이 아닙니다.

## 템플릿 직접 실행

```sh
python .claude/skills/teukgang-slides/scripts/init_project.py my-lecture
cd my-lecture
python build.py
```

`slides.json`을 새 강의로 수정한 뒤 다시 빌드합니다. `lecture.html`, `slides-built.json`, `발표자-노트.md`를 생성합니다. 원고의 `seconds`를 합산하여 `targetSeconds`와 일치하는지 확인합니다. 템플릿은 5장짜리 범용 예제이며 완성된 42장 강의의 복제본이 아닙니다.

`node validate.cjs`는 Node.js·Playwright와 브라우저가 필요합니다. 시스템 Edge를 쓰려면 환경변수 `BROWSER_CHANNEL=msedge`를 설정하세요. 이미지·화면 경계·모션 버튼, 부모/iframe 단축키, 단계 끝의 장 이동, 빈 화면 클릭, 편집 후 HTML 저장·재개방, JSON 왕복을 검사합니다. DOM/SVG 단계 모션과 제공된 실시간 Remotion을 사용할 수 있습니다. 자세한 기준은 스킬의 references를 참고하세요.

패키지 재생성:

```sh
python scripts/package_skill.py
```

생성된 그림과 문장까지 매번 동일해지는 것은 아닙니다. 실제 Claude/ChatGPT 계정에 업로드한 뒤 호출·제작 테스트를 별도로 확인하세요.
