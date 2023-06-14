// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {useState, useRef, useEffect} from 'react';
import {Button, ListGroup, Progress, Select, Label} from 'flowbite-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './App.css';

// import required modules
import Question from "./components/Question";
import Welcome from "./components/Welcome";
import db from "./db";
import CompleteModal from "./components/CompleteModal";

function App() {
    const { itemDB } = db;

    const DEFAULT_QUIZ_COUNT = 5; //기본 문제 수는 5문제
    const DEFAULT_TOTAL_TIME = 60; //기본 제한 시간은 60초

    //문제 수, 시간 제한 초
    const [quizCount, setQuizCount] = useState(DEFAULT_QUIZ_COUNT);
    const [totalTime, setTotalTime] = useState(DEFAULT_TOTAL_TIME);

    //정답
    const [count, setCount] = useState(0);

    //random정렬 후 문제 수 만큼 slice된 문제데이터
    const [items, setItems] = useState([]);

    //시간 제한 초를 0-100 까지의 범위로 환산하여 가지고있는 값
    const [timer, setTimer] = useState(0);

    //게임 시작 했는지 안했는지 상태값
    const [start, setStart] = useState(false);

    //게임 결과 모달 노출
    const [modalShow, setModalShow] = useState(false);

    //웰컴페이지 > 게임페이지 전환 변수
    const [welcome, setWelcome] = useState(true);


    //time progress bar를 그리기위해 시간제한 초를 백분위로 계산한 값.
    let timePiece = Math.round(100 / totalTime * 1000) / 1000;

    //문제 스와이프 ref
    let swiperRef = useRef;


    //게임 데이터를 처음 상태로 초기화시키고 welcome으로 돌아간다.
    function reset() {
        setCount(0);
        setTimer(0);
        setQuizCount(DEFAULT_QUIZ_COUNT);
        setTotalTime(DEFAULT_TOTAL_TIME);
        setStart(false);
        setModalShow(false);
        setItems(itemDB.map(item => item.isAnswer = false));
        setWelcome(true);
    }

    //게임을 시작한다.
    //1. 문제DB를 랜덤 정렬 하고 입력받은 문제 수 만큼 slice(copy)하여 item에 저장한다.
    //2. 게임 시작 상태값을 true로 저장한다.
    //3. 0-100까지 진행정도를 일정 시간 텀으로 progressbar를 그려준다.
    function startGame() {
        setItems(itemDB.slice().sort(() => Math.random() - 0.5).slice(0,quizCount))
        setStart(true);
    }

    //게임 끝내기
    function endGame() {
        setModalShow(true);
        setStart(false);
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    //정답을 맞출 시
    //1. 해당문제의 정답상태를 true로하며
    //2. 정답 갯수 1증가
    //3. 다음 페이지로 스와이프함.
    function increaseAnswerCnt(item) {
        let copyArray = [...items];
        copyArray.find(i => i.word == item.word).isAnswer = true;
        setItems(copyArray);
        setCount((count) => count + 1);
        swiperRef.current.slideNext();
    }

    useInterval(() => {
        //TODO 앱 로딩되자마자 계속 돔... startgame하면서 시작할 순 없을까?
        if (start) {
            if (timer < 100) {
                setTimer(timer => timer + timePiece * 0.05); //
            } else {
                endGame();
            }
        }
    }, 1000 * 0.05);//

    //시작 후 모든 문제를 맞출경우 게임 종료
    useEffect(() => {
        if (start && count == items.length) {
            endGame();
        }
    }, [count, items, start]);

    return welcome ?
        <Welcome
            setQuizCount={setQuizCount}
            setTotalTime={setTotalTime}
            startGame={startGame}
            setWelcome={setWelcome}
        >
        </Welcome>
        :
        (<>
            <Progress progress={timer} size={"xl"}/>
            <Question
                swiperRef={swiperRef}
                increaseAnswerCnt={increaseAnswerCnt}
                items={items}
            >
            </Question>
            <div style={{display: "flex", alignItems: "center"}}>
                <span
                    style={{fontSize: "xx-large", marginLeft: "20px"}}
                    onClick={() => reset()}>🔙</span>
            </div>


            <CompleteModal
                reset={reset}
                modalShow={modalShow}
                count={count}
                setModalShow={setModalShow}
            >
            </CompleteModal>
        </>)
        ;
}

export default App;
