import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {Button} from "flowbite-react";

import React, {useRef} from 'react';

import './Question.css';

const Question = ({items, swiperRef, increaseAnswerCnt}) => {




    return (
        <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
            onSwiper={(swiper) => swiperRef.current = swiper}
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
    );
};

export default Question;

