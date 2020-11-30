import React, { memo, useEffect,useState,useRef } from 'react';
import { Carousel } from 'antd';
import HYAlbumCover from '@/components/album-cover'
import HYThemeHeaderRCM from '@/components/theme-header-rcm';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getNewAlbumAction } from '../../store/actionCreators';
import {
    AlbumWrapper
} from './style'
export default memo(function HYNewAlbum(props) {
    
    //redux hooks
    const {newAlbums} = useSelector(state =>({
        newAlbums:state.getIn(["recommend","newAlbums"])
    }),shallowEqual)
    const dispatch = useDispatch();
    //other hooks
    const pageRef = useRef();
    useEffect(()=>{
        //那一段代码
        dispatch(getNewAlbumAction(10))
    },[])
    return (
       
        <AlbumWrapper>
            <HYThemeHeaderRCM title="新碟上架"/>
            <div className="content">
               <button className="arrow arrow-left sprite_02" onClick={e =>pageRef.current.prev()}></button>
               <div className="album">
                    <Carousel ref={pageRef} dots={false}>
                        {
                            [0,1].map(item=>{
                                return(
                                <div key={item} className="page">
                                 {
                                     newAlbums.slice(item*5,(item+1)*5).map(iten => {
                                        return <HYAlbumCover 
                                        key={iten.id} 
                                        info={iten} 
                                        size={100} 
                                        width={118}
                                        bgp="-570px"
                                        />
                                     })
                                 }
                                
                                </div>
                                )
                            })
                        }
                    </Carousel>
               </div>
               <button className="arrow arrow-right sprite_02" onClick={e =>pageRef.current.next()}></button>
            </div>
        </AlbumWrapper>
    )
})
// {
//     newAlbums.map((item,index)=>{
//         return(
//         <div key={item.id}>
//             {item.name}
//         </div>
//         )
//     })
//  }