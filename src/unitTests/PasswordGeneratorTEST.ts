import PasswordGenerator from "../modules/PasswordGenerator";
import Assert from "./Assert";


export default class PasswordGeneratorTEST{

    constructor(){
        Assert.setAssertionClassName("PASSWORD GENERATOR");

        this.generateTEST();
    }

    generateTEST(){
        let min = 10;
        let max = 40;
        let pass1 = PasswordGenerator.generate(min, max);
        let pass2 = PasswordGenerator.generate(min, max);

        let condition1 = pass1.length <= max && pass1.length >= min;
        let condition2 = pass2.length <= max && pass2.length >= min;

        Assert.setAssertionTestName("Should Generate Random Passwords With Correct Length", 3);
        Assert.notEquals(pass1, pass2);
        Assert.equals(condition1, true);
        Assert.equals(condition2, true);
    }
}
