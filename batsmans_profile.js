const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",requestCallback);
let batsmanProfile=[];
let count=0;
function requestCallback(err,res,html){
    const $=cheerio.load(html);
    const batsmanAnchorTags=$(".batsman-cell a");
    
    for(let i=0;i<batsmanAnchorTags.length;i++){
        batsmanProfile.push({
            name:$(batsmanAnchorTags[i]).text(),
            url:"https://www.espncricinfo.com"+$(batsmanAnchorTags[i]).attr("href")
        });
    }
    for (let j in batsmanProfile) {
            request(batsmanProfile[j].url,fetchDOB.bind(this,j));
        }
        //cant print here as we dont yet know ki all the players dob has been added(because request is "ASYNC")
    }
    
    function fetchDOB(index,err,res,html){
        count++;
        //console.log(index);
        const $=cheerio.load(html);
        const playerDOB=$($(".player-card-description.gray-900")[1]).text();
        //console.log(playerDOB);
        batsmanProfile[index]["DateofBirth"]=playerDOB.split(',')[0].split(' ')[1]+" "+playerDOB.split(',')[0].split(' ')[0]+playerDOB.split(',')[1];
        if(count==batsmanProfile.length){//now we know that all the requests have been completed
            console.log(batsmanProfile);
        }
    }

