# 특강 디자인 기준

- 슬라이드 1280×720, 흰 배경 #fff, 본문/강조 #111. 기본 강조는 굵기·선·여백으로 표현한다. 최신 강의의 에이전트 도식·완료 상태·마지막 핵심 문장처럼 역할과 상태를 구분해야 할 때는 파랑 #3158b7과 연한 파랑 #f5f8ff/#e6edff를 제한적으로 사용한다. 오류/지우기 표시에는 빨강을 쓸 수 있고 기록·비활성 항목은 연회색을 쓴다. 전체 슬라이드의 배경과 캐릭터 그림은 흰 배경·검정 펜을 유지한다. 화면 UI도 흰 바탕과 검정 테두리.
- 글꼴은 Malgun Gothic, sans-serif. 제목 40–48px, 본문 24–30px, 보조 18–22px. 간지에는 영어/한글 개념 하나를 90–120px로 가운데 둔다. 강사 소개는 제공된 이름·직함만 크게.
- 기본 좌우 여백64px, 상단50px. 하단 출처/페이지 표시와 본문을 겹치지 않는다. 글자가 넘치면 줄이거나 장을 나누고 무조건 축소하지 않는다.
- 한 장에 핵심 하나. 정의 → 쉬운 비유 → 구체적 사례 → 다음 개념의 필요 순으로 이어간다. 원고의 용어와 연구를 장식용으로 나열하지 않는다.
- 대비/표/말풍선/흐름도는 HTML 또는 SVG로 그린다. 본문을 그림에 굽지 않는다. 텍스트·표는 편집할 수 있어야 한다.
- 그림은 굵은 검정 펜 선, 커다란 볼과 배, 짧은 팔다리의 귀여운 통통한 캐릭터. 흰 배경, 색/회색 음영 없음. 필요한 인물은 같은 화풍으로 일관되게 만든다. `assets/professor.png`는 원본 특강에서 생성한 화풍 참고용이며 모든 장에 의무적으로 넣지 않는다.
- 기본 생성 프롬프트: Pure white background, black pen outlines only, adorable very chubby hamster character, huge cheeks and belly, tiny limbs, clear readable expression and pose, full body, clean bold hand-drawn lines, no color, no gray shading, no text or watermark. Add the requested role, gesture, and scene.
- 생성된 말풍선 문자를 쓰지 말고 말풍선과 한국어 대사는 HTML로 겹쳐 만든다. 각 등장인물의 발화 방향을 맞춘다.
- 이미지 원본을 보존하고 프로젝트 assets에 보관한다. 이미지 안에 기존 사용자의 이름이나 사실 주장 등을 임의 생성하지 않는다.
- 최종 정리는 배운 개념 전체를 연결하고 ‘다음에 무엇을 준비할지’로 끝낸다. 출처 슬라이드는 발표 종료 뒤 참고용임을 표시한다.
