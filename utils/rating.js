import { isEmpty } from "lodash";

export const calProfileRating = (videos)=>{
  if(isEmpty(videos)) return 0;
    console.log('videos',videos)
    videos = videos.filter(video => video.avgRating!==0)
    let sum=0;
    const TOTAL=videos.length;
    for(const video of videos){
    console.log("videos",video)
    console.log('video avg rating',video.avgRating);
      sum+=Number(video.avgRating);
    }
    console.log(sum)
    let numberDecimal= decimalSplitter({sum,TOTAL});
    console.log("decimal splited",numberDecimal);
    return numberDecimal;
} 
const decimalSplitter =({sum,TOTAL})=>{

  let avg=(sum/TOTAL).toFixed(1);
    let dec=avg.split('.');
    if(Number(dec[1])>0 && Number(dec[1])<5){
      dec[1]='5';
    }
    return avg=dec[0]+"."+dec[1];
}