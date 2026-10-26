# 플랫폼 설치와 실행

이 폴더 자체를 ZIP 최상위 `teukgang-slides/`로 묶어 사용한다. Claude·ChatGPT에는 각각 설치하며 자동 동기화를 전제로 하지 않는다.

- Claude 웹/데스크톱: Customize → Skills에서 ZIP 업로드 후 활성화. 코드 실행이 필요하다. 공식 안내: https://support.claude.com/en/articles/12512180-use-skills-in-claude
- ChatGPT: Plugins → Skills → Create → Upload from your computer. 기능이 제공되는 Business·Enterprise·Healthcare·Edu 계정과 워크스페이스 설정에 따른다. 공식 안내: https://help.openai.com/en/articles/20001066-skills-in-chatgpt
- 메뉴가 없으면 정식 설치를 보장하지 않는다. 파일 실행 가능한 대화에서 ZIP 압축을 풀어 지침을 읽는 방식은 재사용은 가능하지만 자동 호출되는 설치와 다르다.
- Claude Code: 폴더를 `~/.claude/skills/teukgang-slides/`에 배치, `/teukgang-slides`로 호출.
- Codex: 폴더를 `~/.codex/skills/teukgang-slides/`에 배치, `$teukgang-slides`로 호출.

웹 환경에서는 Python/파일 도구가 제공될 때 init_project.py와 build.py를 실행한다. 로컬 CLI·내장 이미지 도구·브라우저가 존재한다고 가정하지 않는다. 실행할 수 없는 검증은 명시한다. 메뉴와 계정 조건은 2026-10-27 공식 문서 확인 기준이며 변경 가능하다.
