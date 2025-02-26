// 맛집 리스트 (JSON 포맷)
const restaurantList = [
    { name: "교동면옥", type: "냉면", menu: ["물냉면", "비빔냉면"] },
    { name: "수쉐프", type: "양식", menu: ["파스타", "돈까스", "스테이크"] },
    { name: "동성로 김치찜", type: "한식", menu: ["김치찜"] },
    { name: "다옴", type: "한식", menu: ["뷔페"] },
    { name: "만복이", type: "한식", menu: ["쭈꾸미"] },
    { name: "박가부대찌개", type: "한식", menu: ["박가부대찌개"] },
    { name: "북창동순두부", type: "한식", menu: ["순두부찌개"] },
    { name: "동백돼지국밥", type: "한식", menu: ["돼지국밥","순대국밥"] },
    // ...추가 리스트
];

// 최근에 갔던 식당
const recentRestaurant = [
    { name:"다옴", date:"2024-08-30"},
    { name:"동백돼지국밥", date:"2024-08-28"},
    { name:"박가부대찌개", date:"2024-08-27"},
    { name:"수쉐프", date:"2024-08-22"},
    { name:"종가집", date:"2024-08-21"},
    { name:"동성로 김치찜", date:"2024-08-19"},
    { name:"교동면옥", date:"2024-08-16"},
    { name:"만복이", date:"2024-08-16"},
    { name:"북창동순두부", date:"2024-08-16"},
];

// 날씨 및 시간 정보를 가져오는 함수
async function getWeatherAndTime() {
    const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.8734848&longitude=128.6249023&current_weather=true');
    const weatherData = await weatherResponse.json();
    const currentWeather = weatherData.current_weather;
    const currentTime = new Date().getHours();

    return { currentWeather, currentTime };
}

// 날씨 상태 코드를 텍스트로 변환하는 함수
function getWeatherDescription(weathercode) {
    switch(weathercode) {
        case 0: return "맑음";
        case 1: return "대체로 맑음";
        case 2: return "구름 많음";
        case 3: return "흐림";
        case 45:
        case 48: return "안개";
        case 51: return "이슬비";
        case 61: return "약한 비";
        case 71: return "약한 눈";
        case 80: return "가벼운 소나기";
        case 95: return "천둥번개";
        // 더 많은 코드를 추가할 수 있습니다.
        default: return "알 수 없는 날씨";
    }
}


document.getElementById('recommendButton').addEventListener('click', async () => {
    const response = await getRecommendationFromChatGPT();
    document.getElementById('recommendation').innerText = response;
});

document.getElementById('weatherButton').addEventListener('click', async () => {
    console.log(await getWeatherAndTime());
});

// 메뉴 추천 함수
async function getRecommendationFromChatGPT() {
    const apiKey = "YOUR_API_KEY";  // OpenAI API 키를 여기에 넣으세요
    const endpoint = 'https://api.openai.com/v1/chat/completions';


    // 날씨 및 시간 정보 가져오기
    const { currentWeather, currentTime } = await getWeatherAndTime();
    const weatherDescription = getWeatherDescription(currentWeather.weathercode);

    // 식당 리스트를 JSON 문자열로 변환
    const restaurantListString = JSON.stringify(restaurantList);

    // 최근 방문 리스트를 JSON 문자열로 변환
    const recentRestaurantString = JSON.stringify(recentRestaurant);

    // ChatGPT에게 보낼 메시지
    const message = {
        model: "gpt-4o-mini",  // 모델 선택
        messages: [
            { role: "system", content: "넌 점심메뉴를 추천해주는 역할이야." },
            { role: "user", content: "뭐 먹으면 좋을까?" },

            { role: "assistant", content: `내가 가진 식당 리스트야: ${restaurantListString}.`},
            { role: "assistant", content: `최근에 갔던 식당은 ${recentRestaurantString}이고, 7일 이내에 갔던 식당에서 파는 메뉴와 비슷한 종류의 음식은 피해줘.`},
            { role: "assistant", content: `현재 날씨는 ${currentWeather.temperature}°C이고 날씨 상태는 ${weatherDescription}.`},
            { role: "assistant", content: `그리고 현재 시각은 ${currentTime}시야.`},
            { role: "assistant", content: `내가 가진 리스트 안에서 식당 하나만 추천해줘.`},
        ]
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        const data = await response.json();

        console.log(data);

        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        return 'Sorry, something went wrong.';
    }
}