import React, { memo, useCallback, useEffect,useRef, useState } from "react";
import { getSongDetail } from "@/services/player";
import { getSizeImage, formatDate,getPlayUrl } from "@/utils/format-utils";
import { getSongDetailAction } from "../store/actionCreators";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Slider, Switch } from "antd";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
export default memo(function HYAppPlayerBar() {
  //props and state
  const [currentTime,setCurrentTime] = useState(0);
  const [progress,setProgress] = useState(0);
  const [isChanging,setIsChanging] = useState(false);
  const [isPlaying,setIsPlaying] = useState(false);
  //redux hooks
  const { currentSong } = useSelector(
    (state) => ({
      currentSong: state.getIn(["player", "currentSong"]),
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
    
    if(!isChanging){
      setCurrentTime(e.target.currentTime * 1000);
      setProgress(currentTime/duration*100);
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
          <button className="sprite_player prev"></button>
          <button className="sprite_player play" onClick={e =>playMusic()}></button>
          <button className="sprite_player next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <a href="/#">
              <img className="image" src={getSizeImage(picUrl, 356)} alt="" />
            </a>
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
        <Operator>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop"></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate}/>
    </PlaybarWrapper>
  );
});
