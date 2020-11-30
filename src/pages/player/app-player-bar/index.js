import React, { memo, useCallback, useEffect,useRef, useState } from "react";
import { getSongDetail } from "@/services/player";
import { getSizeImage, formatDate,getPlayUrl } from "@/utils/format-utils";
import { 
  getSongDetailAction, 
  changeSequenceAction,
  changeCurrentSong,
  changeCurrentLyricIndex
} from "../store/actionCreators";
import {message} from 'antd';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom'

import { Slider, Switch } from "antd";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
export default memo(function HYAppPlayerBar() {
  //props and state
  const [currentTime,setCurrentTime] = useState(0);
  const [progress,setProgress] = useState(0);
  const [isChanging,setIsChanging] = useState(false);
  const [isPlaying,setIsPlaying] = useState(false);
  //redux hooks
  const { currentSong,sequence,lyricList,currentLyricIndex} = useSelector(
    (state) => ({
      currentSong: state.getIn(["player", "currentSong"]),
      sequence:state.getIn(["player","sequence"]),
      lyricList:state.getIn(["player","lyricList"]),
      currentLyricIndex:state.getIn(["player","currentLyricIndex"])
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // other hooks
  const audioRef = useRef();

  useEffect(() => {
    dispatch(getSongDetailAction(1498342485));
  }, [dispatch]);
  useEffect(()=>{
    audioRef.current.src = getPlayUrl(currentSong.id);
    audioRef.current.play().then(res =>{
      setIsPlaying(true);
    }).catch(err =>{
        setIsPlaying(false);
    }

    );
  },[currentSong])
  // other handle
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime,"mm:ss");
  
  //handle function
  const playMusic = () =>{
    
    isPlaying ? audioRef.current.pause():audioRef.current.play();
    setIsPlaying(!isPlaying)
  }
  const timeUpdate = (e) =>{
    // console.log(e.target.currentTime);
    const currentTime = e.target.currentTime;
    if(!isChanging){
      setCurrentTime(currentTime * 1000);
      setProgress(currentTime*1000/duration*100);
    }
    //获取当前的歌词
    let i = 0;
    for(;i<lyricList.length;i++){
      let lyricItem = lyricList[i];
      if(currentTime*1000 < lyricItem.time){
        
        break;
      }
    }
    if(currentLyricIndex !== i-1){
      dispatch(changeCurrentLyricIndex(i-1))
      const content = lyricList[i-1]&&lyricList[i-1].content
      message.open({
        key:"lyric",
        content:content,
        duration:0
      })
    }
    
  }
  const changeSequence = () =>{
    let currentSequence = sequence + 1;
    if(currentSequence > 2){
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  }

  const changeMusic = (tag) =>{
    dispatch(changeCurrentSong(tag))
  }
  const handleMusicEnded = () =>{
    if (sequence === 2){ //单曲
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changeCurrentSong(1))
    }
  }
  const sliderChange = useCallback((value)=>{
    setIsChanging(true);
    const currentTime = value/100 * duration /1000;
    setCurrentTime(currentTime*1000);
    setProgress(value);
  },[duration]);
  const sliderAfterChange = useCallback((value)=>{
    const currentTime = value/100 * duration /1000;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime*1000);
    console.log("After",currentTime);
    console.log("end",value);
    setIsChanging(false);
  },[duration])
  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_player prev"
          onClick={e=>changeMusic(-1)}></button>
          <button className="sprite_player play" 
          onClick={e =>playMusic()}></button>
          <button className="sprite_player next"
          onClick={e=>changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img className="image" src={getSizeImage(picUrl, 356)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{singerName}</span>
            </div>
            <div className="progress">
              <Slider 
              defaultValue={30} 
              value={progress}
              onChange={sliderChange}
              onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" onClick={e=>changeSequence()}></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} 
      onTimeUpdate={timeUpdate} onEnded={e => handleMusicEnded()}/>
    </PlaybarWrapper>
  );
});
