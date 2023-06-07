// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {useState, useRef} from 'react';
import {Button, ListGroup, Progress, Select, Label} from 'flowbite-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './App.css';

// import required modules
import {Pagination} from "swiper";

function App() {
    const itemDB = [
        {word: "1", isAnswer: false},
        {word: "2", isAnswer: false},
        {word: "3", isAnswer: false},
        {word: "4", isAnswer: false},
        {word: "5", isAnswer: false},
        {word: "6", isAnswer: false},
        {word: "7", isAnswer: false},
        {word: "8", isAnswer: false},
        {word: "9", isAnswer: false},
        {word: "10", isAnswer: false},
        {word: "11", isAnswer: false},
        {word: "12", isAnswer: false},
        {word: "13", isAnswer: false},
        {word: "14", isAnswer: false},
        {word: "15", isAnswer: false},
        {word: "16", isAnswer: false},
        {word: "17", isAnswer: false},
        {word: "18", isAnswer: false},
        {word: "19", isAnswer: false},
        {word: "20", isAnswer: false}
    ];
    //문제 수, 시간 제한 초
    const [quizCount, setQuizCount] = useState(5); //기본 문제 수는 5문제
    const [totalTime, setTotalTime] = useState(60); //기본 제한 시간은 60초

    //정답
    const [count, setCount] = useState(0);

    //random정렬 후 문제 수 만큼 slice된 문제데이터
    const [items, setItems] = useState(itemDB);

    //시간 제한 초를 0-100 까지의 범위로 환산하여 가지고있는 값
    const [timer, setTimer] = useState(0);

    //게임 시작 했는지 안했는지 상태값
    const [start, setStart] = useState(false);

    //time progress bar를 그리기위해 시간제한 초를 백분위로 계산한 값.
    let timePiece = Math.round(100 / totalTime * 1000) / 1000;

    //문제 스와이프 ref
    let swiperRef = useRef;

    //정답을 맞출 시
    //1. 해당문제의 정답상태를 true로하며
    //2. 정답 갯수 1증가
    //3. 다음 페이지로 스와이프함.
    function increaseAnswerCnt(item) {
        item.isAnswer = true;
        setCount(count + 1);
        swiperRef.current.slideNext();
    }

    //게임 데이터를 처음 상태로 초기화시킨다.
    function reset() {
        setCount(0);
        setTimer(0);
        setStart(false);
    }

    //게임을 시작한다.
    //1. 문제DB를 랜덤 정렬 하고 입력받은 문제 수 만큼 slice(copy)하여 item에 저장한다.
    //2. 게임 시작 상태값을 true로 저장한다.
    //3. 0-100까지 진행정도를 일정 시간 텀으로 progressbar를 그려준다.
    function startGame() {
        setItems(itemDB.sort(() => Math.random() - 0.5).slice(0,quizCount))
        setStart(true);
        setInterval(() => {
            if (timer < 100) {
                setTimer(timer => timer + timePiece * 0.05);
            }
        }, 1000 * 0.05);
    }

    return start ? (
        <>
            <Progress progress={timer} size={"xl"}/>
            <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
            >
                {
                    items.map((item, index) =>
                        <SwiperSlide key={index}>
                            <div className={"question_wrapper"}>{item.word}</div>
                            <div className={"butten_wrapper"}>
                                <Button disabled={item.isAnswer} onClick={() => increaseAnswerCnt(item)}
                                        size={"xl"}>{item.isAnswer ? "정답완료" : "정답"}</Button>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
            <p>정답수 : {count}</p>
            <Button>처음으로</Button>
        </>
    ) : (<>
            <div className={["quiz_timer"]}>
                <div className={"quiz_select"}>
                    <h1>문제 수를 선택 해 주세요</h1>
                    <Select
                        id="quiz"
                        required
                        className={"text-2xl"}
                        onChange={(event) => setQuizCount(event.target.value)}
                    >
                        <option value={5}>
                            5문제
                        </option>
                        <option value={10}>
                            10문제
                        </option>
                        <option value={15}>
                            15문제
                        </option>
                        <option value={20}>
                            20문제
                        </option>
                    </Select>
                </div>
                <div className={"timer_select"}>
                    <Label
                        htmlFor="timer"
                        value="시간제한을 선택해 주세요."
                    />
                    <Select
                        id="timer"
                        required
                        onChange={(event) => setTotalTime(event.target.value)}
                    >
                        <option value={60}>
                            60초
                        </option>
                        <option value={100}>
                            100초
                        </option>
                        <option value={150}>
                            150초
                        </option>
                        <option value={200}>
                            200초
                        </option>
                    </Select>
                </div>
            </div>
            <Button onClick={() => startGame()}>시작하기</Button>
        </>
    )
        ;
}

export default App;
