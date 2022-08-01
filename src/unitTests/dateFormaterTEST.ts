import DateFormater from "../modules/DateFormater";
import Assert from "./Assert";

export default function dateFormaterTEST(){
    Assert.setAssertionClassName("DATE FORMATTER");

    shouldCorrectlyFormatDate();
}


function shouldCorrectlyFormatDate(){
    let date = new Date('2019-02-18T17:04:56Z');
    DateFormater.setFormat('hh : mm : ss | DD.MM.YY');
    let formated = DateFormater.formatDate(date);
    let expected = '18 : 04 : 56 | 18.02.2019';

    Assert.setAssertionTestName("Should Correctly Format Date");
    Assert.equals(formated, expected);
}