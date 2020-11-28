import React, { memo,useEffect } from 'react'
import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import {shallowEqual, useDispatch,useSelector} from 'react-redux'
import {HOT_RECOMMEND_LIMIT} from '@/common/contants'
import {
    HotRecommendWrapper
} from './style'
import HYSongsCover from '@/components/songs-cover';
import { getHotRecommendAction } from '../../store/actionCreators'

export default memo(function HYHotRecommend() {
    //redux hooks
    const {hotRecommends} = useSelector(state=>({
        hotRecommends:state.getIn(["recommend","hotRecommends"])
    }),shallowEqual)
    const dispatch = useDispatch();
    //other hooks
    useEffect(() => {
       dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
    }, [dispatch])
    return (
        <HotRecommendWrapper>
            <HYThemeHeaderRCM title="热门推荐" keywords={["华语","流行","民谣","摇滚","电子"]}/>
            <div className="recommend-list">
                {
                    hotRecommends.map((item,index) =>{
                    return <HYSongsCover key={item.id} info={item}/>
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})
