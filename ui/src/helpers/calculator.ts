import { Collections } from "../common/collections";

export class Calculator {

    static getBMI(height: number, weight: number): number {
        return weight / ((height) / 100 * (height) / 100);
    }
    static getCalorieGoal(height: number, weight: number, birthday: Date, activity: String, gender: String, goal: String): any {
        let today = new Date();
        let a: Date = new Date(birthday);
        let age: number = parseInt(((today.getTime() - a.getTime()) / 31536000000).toPrecision(2));
        let calorieGoal: number;
        let bmr: number;
        var activityMultiplier = Collections.ActivityLevel.find(function (obj) { return obj.level == activity });
        var surplus = Collections.WeeklyGoal.find(function (obj) { return obj.goal == goal });
        if (gender == 'male') {

            bmr = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activityMultiplier.multiplier;
        }
        else {
            bmr = (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activityMultiplier.multiplier;
        }
        if (surplus.sign == '+') {
            calorieGoal = bmr + surplus.calorie_surplus;
        }
        else {
            calorieGoal = bmr - surplus.calorie_surplus;
        }
        return { bmr: bmr, goal: calorieGoal };
    }
}