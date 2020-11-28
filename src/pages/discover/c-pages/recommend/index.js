import React, { memo } from 'react';

import HYTopBanner from './c-cpns/top-banner';
import HYHotRecommend from './c-cpns/hot-recommend';
import HYNewAlbum from './c-cpns/new-album';
import HYRankingList from './c-cpns/ranking-list';
import HYUserLogin from './c-cpns/user-login';
// import HYSettleSinger from './c-cpns/settle-singer';
import HYHotRadio from './c-cpns/hot-radio';
import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";

export default memo(function HYRecommend() {
  return (
    <RecommendWraper>
      <HYTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HYHotRecommend />
          <HYNewAlbum />
          <HYRankingList />
        </RecommendLeft>
        <RecommendRight>
            <HYUserLogin />
           {/* <HYSettleSinger />   */}
          <HYHotRadio /> 
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
})

    
//  function HYRecommend(props) {
//     const {getBanners,topBanners}= props;
//     useEffect(() => {
//         getBanners();
//     }, [getBanners])
//     return (
//         <div>
//             <h2>HYRecommend {topBanners.length}</h2>
//         </div>
//     )
// }
// const mapStateToProps = state =>({
//     topBanners:state.recommend.topBanners
// })
// const mapDispatchToProps = dispatch =>({
//     getBanners:()=>{
//         dispatch(getTopBannerAction)
//     }
// })
// export default connect(mapStateToProps,mapDispatchToProps)(memo(HYRecommend));
