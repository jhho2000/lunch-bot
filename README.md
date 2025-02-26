# 🍽️ Lunch Bot

## 📌 프로젝트 소개
**Lunch Bot**은 사용자의 최근 방문한 식당 및 현재 날씨 정보를 바탕으로 점심 메뉴를 추천하는 웹 애플리케이션입니다. OpenAI API를 활용하여 추천을 제공합니다.

---

## 📂 프로젝트 구조
``` 
root
│── index.html    # 웹페이지 UI 및 구조
│── app.js        # 메인 기능 (추천 로직 및 API 연동)
│── README.md     # 프로젝트 설명 및 실행 방법
```


---

## 🛠️ 기술 스택
- **HTML / CSS**: UI 및 스타일링
- **JavaScript (Vanilla JS)**: 로직 구현
- **OpenAI API**: ChatGPT 기반 메뉴 추천
- **Open-Meteo API**: 날씨 정보 제공

---

## 🎯 주요 기능
- 사용자의 최근 방문한 식당 리스트를 반영하여 메뉴 추천
- 현재 날씨와 시간에 맞는 음식 추천
- OpenAI API를 이용한 맞춤형 식사 추천 기능
- 깔끔한 UI와 간편한 버튼 클릭 방식

---

## 🚀 실행 방법
1. **파일 다운로드**: 프로젝트 파일을 로컬에 저장합니다.
2. **API 키 설정**: `app.js` 파일에서 `YOUR_API_KEY` 부분을 실제 OpenAI API 키로 변경합니다.
3. **로컬에서 실행**: `index.html` 파일을 브라우저에서 실행합니다.

---

## 🔗 API 사용 방법
### 1️⃣ OpenAI API
- `getRecommendationFromChatGPT()` 함수에서 OpenAI API를 호출하여 추천을 받습니다.
- `messages` 배열에 날씨 및 최근 방문 식당 정보를 포함하여 최적의 메뉴를 추천받습니다.

### 2️⃣ Open-Meteo API
- `getWeatherAndTime()` 함수를 통해 현재 날씨 및 시간을 가져옵니다.
- 날씨 상태 코드에 따라 적절한 설명을 반환합니다.

---

## 📌 개선 및 추가 기능
- ✅ 더 많은 식당 및 메뉴 데이터 추가
- ✅ 추천 알고리즘 개선 (예: 사용자 선호도 반영)
- ✅ 다양한 UI 개선 및 애니메이션 추가
- ✅ OpenAI API 외 다른 AI 모델 적용 가능성 검토

---
