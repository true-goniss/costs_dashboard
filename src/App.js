import React, { Component } from 'react';
import logo from './logo.svg';

import trending_up from './baseline-trending_up-24px.svg';
import trending_down from './baseline-trending_down-24px.svg';

import './App.css';
import ChangeList from "./components/ChangeList";
import TotalChange from "./components/TotalChange";
import Card from "@material-ui/core/Card/Card";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const jsonData = require('./components/data.json');
console.log(jsonData);


class App extends Component {
    state = {
    year: '2018',
    block: 'blockT',
    labelWidth: 0,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
      
      function createYearRows() {
          var rows = [];
          var addedYears = '';
          Object.values(jsonData).map(
          (dataa) => {
              Object.keys(dataa).map(
              (year_key) => {
                if(!addedYears.includes(year_key)){
                    var year_n = (year_key.split('_'))[1]
                    rows.push(<MenuItem value={year_n.toString()}>{year_n}</MenuItem>);
                    addedYears += year_key + ";";
                }

                  // <MenuItem value={year_key.toString()}>year_key</MenuItem>
              }
            )
          }
          )
          return rows;
      }

      function createBlockRows() {
          var rows = [];

          Object.keys(jsonData).map(
          (block) => {
                        rows.push(<MenuItem value={block}>{"Блок" + block.slice(-1) }</MenuItem>);
                     }
            )
          return rows;
      }
      
      return (
      <div className="container">
        <header className="App-header">
        <p>
            Просмотр расходов:
        </p>
            {console.log(this.props.formControl)}
            <div>
               <div className="Select">
                   <FormControl className={this.props.formControl}>
                      <InputLabel shrink htmlFor="year-label-placeholder"></InputLabel>

                      <Select


                        value={this.state.year}
                        onChange={this.handleChange}
                        input={<OutlinedInput name="year" id="year-label-placeholder" />}
                        displayEmpty
                        name="year"
                        // className={this.props.formControl.selectEmpty}
                        >
                        {/*<MenuItem value="2018">*/}
                          {/*<em>None</em>*/}
                        {/*</MenuItem>*/}

                         <MenuItem value={"2018"} disabled>2018</MenuItem>
                         {createYearRows()}

                        {/*<MenuItem value={"2016"}>2016</MenuItem>*/}
                        {/*<MenuItem value={"2017"}>2017</MenuItem>*/}
                        {/*<MenuItem value={"2018"}>2018</MenuItem>*/}
                      </Select>
                      <FormHelperText>Выберите год</FormHelperText>
                    </FormControl>
               </div>
               <div className="Select">
                    <FormControl className={this.props.formControl}>
                      <InputLabel shrink htmlFor="block-label-placeholder" >
                      </InputLabel>
                      <Select
                        value={this.state.block}
                        onChange={this.handleChange}
                        input={<OutlinedInput name="block" id="block-label-placeholder" />}
                        displayEmpty
                        name="block"
                        // className={this.props.formControl.selectEmpty}
                        >
                        <MenuItem value={"blockT"} disabled>Блок T</MenuItem>
                          {
                              createBlockRows()
                          }
                      </Select>
                      <FormHelperText>Выберите блок</FormHelperText>
                    </FormControl>
                </div>
            </div>


        </header>
        <ChangeList selectedData = {this.state}/><br></br>
        <Card className = "TotalChange"><TotalChange change = {jsonData[this.state.block]} year = {this.state.year} block = {this.state.block}/></Card>
        <Card id="chartdiv"> </Card>
      </div>
    );
  }
}

export default App;
