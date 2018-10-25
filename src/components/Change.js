import React from 'react'
import {render} from 'react-dom'
import CardContent from '@material-ui/core/CardContent';

function Change(props){
    var year = "year_" + props.year;
    var parameter = props.parameter.toLowerCase();
    var previousYearNumber = (parseInt(props.year) - 1);
    var previousYear = "year_" + previousYearNumber;

    var thisYearCosts = Number(props.change[year][parameter].costs);

    try {
        var previousYearCosts = Number(props.change[previousYear][parameter].costs);
    }
    catch(err){ var previousYearCosts = 0;}

    var positiveChange = (thisYearCosts > previousYearCosts)? true : false;
    var changeSymbol = positiveChange ? "+" : "-";

    var minCosts = (thisYearCosts < previousYearCosts)? thisYearCosts : previousYearCosts;
    var maxCosts = (thisYearCosts > previousYearCosts)? thisYearCosts : previousYearCosts;

    console.log(minCosts);
    console.log(maxCosts);


    var changePercentage = (1.0 - (minCosts/maxCosts)) * 100;
    changePercentage = Math.round(changePercentage * 100) / 100;

    var changeString = "   " + changeSymbol + changePercentage + "% в " + props.year;
    // + " (по сравнению с " + previousYearNumber + ")");
    var trendingImageClass = (positiveChange)? "Trending-up-image" : "Trending-down-image";

    const body = <section>{thisYearCosts + " млн. ₽"}</section>
    const Title = capitalizeFirstLetter(props.change[year][parameter].title);
    const change = (previousYearCosts == 0)? <section></section> : <section>{changeString}</section>;

    return (
        <CardContent>
            <h2>
                {Title}
                {/*<button onClick={handleClick}>close</button>*/}
            </h2>
            <h1>
                {body}
            </h1>
            <p className = {trendingImageClass}>
                {change}
            </p>


        </CardContent>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleClick(){
    console.log('clicked')
}

export default Change;