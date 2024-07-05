# 프로젝트 소개

**PLAVE shop** 은 버추얼 아이돌 그룹 플레이브의 MD 상품을 판매/구매 할 수 있는 가상의 쇼핑몰 입니다.
기존 사이트에서 불편함을 느낀 점을 개선하는 방향으로 재구성하여 진행한 프로젝트 입니다.

> 💻 배포 URL : https://plaveshop.vercel.app

- 개발 기간 : 2024.04 ~ 진행중
  <br/><br/>

![sample_site_gif](https://firebasestorage.googleapis.com/v0/b/hanghea99-commerce.appspot.com/o/images%2FplaveShop-sample.gif?alt=media&token=f4f00aba-009b-4306-b9df-e7a65a6b72d3)

## 주요 기능

- Firebase 를 이용하여 로그인, 회원가입, 데이터 통신 구현
- 시리즈/카테고리 별 상품 페이지 구현
- `판매자`용 상품 CRUD 구현
- `구매자`용 위시리스트/장바구니 CRUD 구현

### 테스트 계정

```
* 판매자 계정
ID: gawawe8457@idsho.com
PW: 1234qwer!

* 구매자 계정
ID: wowim80580@rartg.com
PW: 1234qwer!
```

## 사용 기술

![React](https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ReactQuery](https://img.shields.io/badge/reactquery-FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white)
![ReactHookForm](https://img.shields.io/badge/reactHookForm-EC5990.svg?style=for-the-badge&logo=reactquery&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-06B6D4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcnui](https://img.shields.io/badge/shadcnui-000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vite](https://img.shields.io/badge/vite-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=white)

## 트러블 슈팅
- [이벤트 전파(Event Propagation) 제어하기](https://velog.io/@poan1221/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%A0%84%ED%8C%8CEvent-Propagation-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0)
- [파이어베이스 보안규칙 권한 설정하기](https://velog.io/@poan1221/firebase-Token-renewal-error-FirebaseError-Missing-or-insufficient-permissions)

## 아키텍쳐

![architecture](https://firebasestorage.googleapis.com/v0/b/hanghea99-commerce.appspot.com/o/images%2Farchitecture.png?alt=media&token=e6f6e1fa-481a-4d51-b3ad-6206844a5d26)

## 폴더 구조

```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂form
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂product
 ┃ ┃ ┗ 📂wish
 ┃ ┗ 📂ui
 ┣ 📂hooks
 ┣ 📂layouts
 ┣ 📂pages
 ┣ 📂router
 ┣ 📂store
 ┣ 📂types
 ┣ 📂utils
```

- `components` : 화면 구조와 기능에 따른 추상화를 진행한 컴포넌트 파일을 포함합니다.
- `hooks` : 커스텀 훅 파일을 포함합니다.
