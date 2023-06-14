import React from 'react';
import {Button, Label, Select} from "flowbite-react";

const Welcome = ({setQuizCount, setTotalTime, startGame, setWelcome}) => {
    return (
            <div className={["quiz_timer"]} style={{fontSize: "1.5em"}}>
                <div className={"quiz_select"}>
                    <h1>문제 수를 선택 해 주세요</h1>
                    <Select
                        id="quiz"
                        required
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
                <Button
                    className="btn_start"
                    onClick={() => {
                        setWelcome(false);
                        startGame()
                    }}>시작하기
                </Button>
                <div className={"timer_select"}>
                    <h1>시간제한을 선택해 주세요.</h1>
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
    );
};

export default Welcome;