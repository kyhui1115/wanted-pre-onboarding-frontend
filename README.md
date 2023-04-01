## 프로젝트의 실행 방법
> ### 1. 배포링크 접속 ('/signin' 페이지로 리다이렉트)
>> 1. 회원가입하기 클릭('/signup' 페이지로 리다이렉트)
> ### 2. signup 페이지
>> 1. 회원가입 성공 시 '/signin' 페이지로 리다이렉트
>>> * 유효성검사(이메일에 '@'포함, 비밀번호 8자리 이상)
>>> * 로컬스토리지에 토큰이 있는 경우 '/todo' 페이지로 리다이렉트
> ### 3. signin 페이지
>> 1. 로그인 성공시 '/todo' 페이지로 리다이렉트
>>> * 유효성검사(이메일에 '@'포함, 비밀번호 8자리 이상)
>>> * 로컬스토리지에 토큰이 있는 경우 '/todo' 페이지로 리다이렉트
> ### 4. todo 페이지
>> 1. 내용 입력 후 추가버튼 클릭 -> 목록 생성
>> 2. 목록의 글 중 하나에 수정버튼 클릭 후 내용 수정 후 제출
>>> * 취소 시 내용 초기화, 수정모드 비활성화
>>> * 체크박스 선택 및 해제 상태저장 가능
>>> * 로컬스토리지에 토큰이 없는 경우 '/signin' 페이지로 리다이렉트
---
## 배포링크
배포링크 : <https://kyhui1115.github.io/wanted-pre-onboarding-frontend/>
