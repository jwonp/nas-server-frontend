## 개요

Front-end 에서는 Nextjs / Back-end 에서는 Django를 사용하고 있습니다.

배포는 AWS EC2에서 Nginx를 사용해 배포하였고

추가적으로 AWS에서는 RDS를 사용해서 DB를, AWS Certificate Manager에서 HTTPS 지원을 위한 TLS/SSL 인증서를 관리하고 있습니다.

## 기술 스택

### Front-end

1. html
2. css
3. typescript
4. react
5. Redux toolkit
6. Next.js

### Back-end

1. python
    1. django-rest-framework
2. django

### Database

1. mysql

# 프로젝트 소개

## 개인 파일 서버

### 개발 배경

집에서 사용하지 않는 컴퓨터가 있어서 활용 방법을 고민하다가 ‘개인 파일 서버를 구축해서 사용하면 어떨까?’라는 아이디어에서 클라우드 파일 서버를 제작하기 시작했습니다.

또한 Django를 익히기 위해 처음 사용해봤는데, Java와 Spring boot, Javascript와 Express를 공부하면서 ‘언어별로, 프레임워크별로 어떤 차이점이 있을까?’라는 호기심으로 사용해보지 않은 Python과 Django로 프로젝트를 하나 진행했습니다.

### 프로젝트 설명

Authorization Code Grant 인증 방식의 Oauth2 application을 django로 등록해서 로그인 구현을 했습니다.

사용자는 자신의 계정을 생성해서 일정량의 저장공간 내에서 파일을 업로드하고 다운로드 할 수 있습니다.

### 개발 후 리뷰

- Front-end
    
    Oauth 로그인을 통해 받아온 access token과 refresh token을 어떻게 관리할지를 더 고민해보고 싶다는 생각이 들었습니다. 이 프로젝트에서는 access token은 localstorage에, refresh token은 httpOnly cookie에 저장해서 관리했는데, nextauth를 사용해서 로그인 로직을 관리하거나, refresh token을 Back-end side에서 관리하는 구조로 token을 관리하는 방법을 더 조사하고 공부해보고 싶다는 생각이 들었습니다.
    
    Redux와 Axios를 사용해서 데이터를 받아오고 State를 관리했는데, 프로젝트를 보완해서 서비스를 확장시킨다면 SWR를 사용해서 받아온 데이터를 관리하는 로직을 분리하는 것도 고려해볼만 하다고 느꼈습니다. useMemo를 사용해서 비슷한 동작 방식을 구현했는데, 프로젝트가 완성되는 시점에서 리뷰했을 때 Axios로 받아오고 Redux로 저장하고 useMemo로 변경하는 과정을 SWR로 바로 해결하는 것이 더 나았을 것 같다고 느꼈습니다.
    
    Axois를 토큰 만료시 재발급이나 중복되는 코드를 줄이는 등, 더 프로젝트에 맞춰서 사용하기 위해 SendRequest라는 함수를 따로 제작했는데, 예상보다 코드를 관리하는데 도움이 되었다고 생각했기 때문에 이런 방식의 함수는 더 최적화 해볼 가치가 있다고 판단했습니다.
    
- Back-end
    
    Back-end 서버가 하나밖에 없었기 때문에 파일을 직접 저장하면서, 요청이 오면 FileSystemStorage를 사용해서 파일을 가져오고 응답해주는 식이었는데, 이런 방식은 프로젝트 크기가 커질 수록 서버의 부하도 커지고 파일을 관리하는게 점점 어려워질 것 같다는 느낌을 받았습니다. 나중에 파일을 링크로 공유할 수 있는 기능을 추가한다면 파일 서버를 따로 만들어 요청할 파일의 URI를 받아오는 방식으로 바꾸는 식으로 확장할 필요를 느꼈습니다.
    
    로그인 인증 처리를 Front-end 서버에서 NextAuth를 사용하는 것과 Back-end에서 Django로 Oauth2 Provider를 구축해서 사용하는 것에서 Django를 먼저 사용해보고 NextAuth를 다음 프로젝트에 적용하기로 정했습니다. 로그인 구현을 하면서 Oauth2 Application을 거쳐서 로그인할 때, Django admin 페이지에 로그인이 되어야 하는데, Front-end측에서 로그인 페이지를 만들어 유저 정보만 넘겨줘서 처리하는 방식으로는 로그인이 제대로 되지 않아서 Django app 내 template에 html로 페이지를 따로 만들어 처리했습니다.
    
    로그인 처리는 방법이 많은 만큼 더 개선할 여지가 남아있다고 생각합니다. 여러 가지 로그인 처리 로직을 구현하면서 나름의 최적의 로그인 로직을 구현하고자 하는 목표를 세울 수 있었습니다.
    
- 배포
    
    원래 의도는 집에 있는 남는 데스트탑을 사용하는 것이었지만, 도중에 수명을 다해서 AWS를 활용하게 되었습니다. 전에 EC2를 사용한 적은 있지만, django 프로젝트를 uWSGI로 올리는 것과, 그것을 NGINX로 배포하는 것, 추가로 Next.js 프로젝트를 NGINX에 합치는 과정은 처음 하는 작업이었기 때문에 예상보다 일주일 정도 더 오래 걸렸습니다.
    
- 총평
    
    python과 django, nginx를 처음 사용하는 프로젝트였기 때문에 구현 방식을 알고 나서는 간단한 프로젝트였지만 시간이 생각보다 더 오래 걸렸습니다. front-end 측에서는 next.js 상대적으로 많이 사용했지만, 개발 환경과 배포 환경에서 코드가 많이 차이 났다는 것은 이해가 덜 되었다는 증거라고 생각합니다.
    
    이후 코드를 수정하는 과정에서 front-end에서 back-end와 통신하는 방법을 익힐 수 있었습니다.
    
    개발 설계 중에서 개발 의도는 Private하게 사용할 목적으로 제작했지만, 추후에 더 기능을 추가하고 Public하게 서비스를 노출하는 것을 대비해서 즐겨찾기 기능이나 다운로드 링크 생성, 티어별 사용가능 저장공간 차별화 등의 기능을 추가할 예정입니다.
    

### 프로젝트 주소

- github
    
    [https://github.com/jwonp/nas-server-backend](https://github.com/jwonp/nas-server-backend)
    
    [https://github.com/jwonp/nas-server-frontend](https://github.com/jwonp/nas-server-frontend)
    
- 배포
    
    [https://www.ikiningyou.com/](https://www.ikiningyou.com/)
    

### 프로젝트 구조

![프로젝트구조도.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/005ff3e6-ba40-4fe2-918f-0e4959b623b6/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EA%B5%AC%EC%A1%B0%EB%8F%84.png)

### DB 구조

![Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/86cb346c-38a2-46f5-9a9b-10a1b91a796e/Untitled.png)

### 프로젝트 상세 설명

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4dbe5d86-48b9-4d7d-ad30-29a63e7caee8/Untitled.png)

---

인덱스 페이지에서는 저의 기본 프로필을 확인하실 수 있습니다.

상단 ‘로그인’을 통해 회원가입 페이지로 이동해 계정을 생성하거나, 테스트용 계정으로 바로 로그인 할 수 있습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ff1ca12-7229-4b22-be59-97a8749fc730/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c77d2fcd-8b1b-4204-80a7-0d23ab008f75/Untitled.png)

회원가입에서는 간단한 유효성 검사를 실행합니다.

유효성 검사에 어긋나는 경우 빨간 줄로 표시해줍니다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2521fe69-4ac8-46e3-8a46-5b939c4ff0e7/Untitled.png)

로그인 페이지에서 회원가입을 진행할 수 있습니다.

로그인은 Oauth2의 Authorization Code Grant 방식을 사용했습니다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/30f72dee-1823-4d5d-aa24-dc5ac43ffb3f/Untitled.png)

로그인을 성공했을 시 다음과 같은 파일 관리 페이지로 이동합니다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/59acf301-5a73-489c-b1c9-99493ad8575a/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc62247c-734a-4add-896f-b2407e280428/Untitled.png)

좌측의 메뉴에서는 루트 디렉터리로 할 수 있는 버튼과 업로드 할 수 있는 저장용량을 표시했습니다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/57da0313-25a2-461e-887d-8d0b332a68cc/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/162a0b2c-fb13-4ee9-a8f1-22a930f91a52/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e59b844-6a98-4b9d-9619-1ec4a443e524/Untitled.png)

상단 바의 폴더 생성으로 해당 디렉터리의 폴더를 생성할 수 있습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a51ed8a-714f-4212-b635-21b76b3cd8f4/Untitled.png)

폴더로 이동할 경우 상단에 히스토리로 위치를 확인할 수 있습니다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd9d8d6e-3296-405b-8aad-6a42c34688a8/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91be5b94-bf26-4fb5-a03d-8e906952d513/Untitled.png)

브라우저의 크기에 따라 반응형 웹페이지를 지원합니다.

모바일에서 접속했을 때도 반응형 레이아웃을 지원합니다.

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/790c1620-81e0-443c-9e06-92e3c6e6e2cc/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a61a91e8-adda-4fa4-a030-7b1c5559cc41/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de4d33ad-5ed2-4927-ab55-3d7f0d5d49d2/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d8af09c6-347d-4dea-a217-dcce59570bfd/Untitled.png)

파일 또는 폴더를 선택하고 삭제나 다운로드를 할 수 있습니다.

.zip 파일로 다운받을 수 있으며, 폴더를 다운로드 할 경우에는 하위 파일을 전부 다운받을 수 있습니다.