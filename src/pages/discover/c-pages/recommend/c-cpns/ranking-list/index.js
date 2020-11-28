import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import HYThemeHeaderRCM from '@/components/theme-header-rcm';
import HYTopRanking from "@/components/top-ranking";
import {
    RankingWrapper
  } from "./style";
import {
    getTopListAction
} from "../../store/actionCreators";






export default memo(function HYRankingList() {
  // redux
  const dispatch = useDispatch();
  const state = useSelector((state) => ({
    upRanking: state.getIn(["recommend", "upRanking"]),
    newRanking: state.getIn(["recommend", "newRanking"]),
    originRanking: state.getIn(["recommend", "originRanking"])
  }), shallowEqual);

  // hooks
  useEffect(() => {
    dispatch(getTopListAction(0));
    dispatch(getTopListAction(2));
    dispatch(getTopListAction(3));
  }, [dispatch])

  return (
    <RankingWrapper>
      <HYThemeHeaderRCM title="榜单" moreLink="/discover/ranking"/>
      <div className="tops">
        <HYTopRanking info={state.upRanking}/>
        <HYTopRanking info={state.newRanking}/>
        <HYTopRanking info={state.originRanking}/>
      </div>
    </RankingWrapper>
  )
})
