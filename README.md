# 특강 HTML 슬라이드

검정 펜 디자인의 한국어 강의자료와 동일한 제작 방식을 재사용하는 Codex·Claude Code 스킬입니다.

## 현재 강의

- [AI와 친해지기 — 발표용 HTML](slides/AI와-친해지기-검정펜.html)
- [강사용 발화 노트](slides/강사용-발화노트.md)
- 총 45장. 출처 2장을 제외한 본편 50분.

HTML을 다운로드한 뒤 브라우저에서 여세요. 그림과 실시간 Remotion 스크립트가 내장되어 있습니다. GitHub 파일 화면은 HTML을 발표 화면으로 실행하지 않습니다.

일반 ←/→는 슬라이드 이동, Shift+←/→는 현재 애니메이션의 이전/다음 단계입니다. 재생·일시정지·이전·다음·다시시작 버튼, 발표자 노트, 문구 편집, HTML/JSON 저장을 지원합니다. 수정 내용을 보존하려면 ‘수정 HTML 저장’을 사용하세요.

## 특강 슬라이드 스킬

| 환경 | 스킬 | 호출 |
| --- | --- | --- |
| Codex | [.codex/skills/teukgang-slides](.codex/skills/teukgang-slides/SKILL.md) | `$teukgang-slides` |
| Claude Code | [.claude/skills/teukgang-slides](.claude/skills/teukgang-slides/SKILL.md) | `/teukgang-slides` |

개인용으로 설치하려면 해당 폴더를 각각 `~/.codex/skills/` 또는 `~/.claude/skills/` 아래에 복사하세요. Claude Code의 인식 경로는 `.claude`입니다.

예: “특강 슬라이드 스킬로 아래 원고를 비개발자 대상 50분 강의로 만들어줘. 실습 없이 검정펜 디자인을 유지해줘.”

채팅 원고, Markdown·TXT·Word·PDF·HTML, 접근 가능한 웹 문서를 사용할 수 있습니다. 노션 연결은 필수가 아닙니다. 원고 정리 → 흐름·시간 배분 → 그림 생성 → HTML·리모션 → 브라우저 검증 순서로 제작합니다.

두 스킬에는 재사용 템플릿, 초기화·빌드 스크립트, Remotion 소스와 번들, 이미지 참고 자료, 검증 도구가 들어 있습니다. Claude는 이미지가 필요하면 Codex CLI를 실행해 위임하도록 구성했습니다. 실제 CLI 인증 및 이미지 도구 사용 가능 여부는 실행 환경에서 확인합니다.

## 템플릿 직접 실행

```sh
python .codex/skills/teukgang-slides/scripts/init_project.py my-lecture
cd my-lecture
python build.py
```

`slides.json`을 새 강의로 수정한 뒤 다시 빌드합니다. `lecture.html`과 발표자 노트가 생성됩니다. 검증에는 Node.js와 Playwright 및 브라우저가 필요합니다. 세부 절차는 스킬의 references를 참고하세요.

현재 HTML은 완성된 강의이며, 스킬 템플릿은 새로운 강의를 만드는 출발점입니다. 생성된 그림과 문장은 매번 완전히 동일하지 않을 수 있습니다.
