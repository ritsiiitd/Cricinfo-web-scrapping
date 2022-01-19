const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",requestCallback);

function requestCallback(err,res,html){
    const $=cheerio.load(html);
    const losingTeam=$(".team-gray .name-link p").text();
    //console.log(losingTeam);
    const bothTeamsObject=$(".name-link p");
    const winningTeam=$(bothTeamsObject[0]).text()==losingTeam?$(bothTeamsObject[1]).text():$(bothTeamsObject[0]).text();
    const bothTeamsScoreObject=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .score");
    const winningTeamandScore=$(bothTeamsObject[0]).text()==losingTeam?[$(bothTeamsObject[1]).text(),$(bothTeamsScoreObject[1]).text()]:[$(bothTeamsObject[0]).text(),$(bothTeamsScoreObject[0]).text()];
    console.log(winningTeamandScore);

}