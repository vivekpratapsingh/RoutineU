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

    //calculate nutrient by serving size,unit,quantity
    static getFoodNutrientByQuantity(size: number, unit: string, food: any, quantity: number): any {
        var quantityData;
        var foodQuantity = food.quantity;
        var numQuantity = foodQuantity.length;
        for (let i = 0; i < numQuantity; i++) {
            if (foodQuantity[i].serving_size.size.amount == size && foodQuantity[i].serving_size.size.unit == unit) {
                quantityData = foodQuantity[i];
            }
        }
        var servingData = quantityData.serving_size;
        var nutrientsValue = {
            calories: servingData.calories * quantity,
            carbohydrates: servingData.carbohydrates.amount * quantity,
            fat: {
                amount: servingData.fat.amount * quantity,
                saturated: servingData.fat.saturated * quantity,
                polysaturated: servingData.fat.polysaturated * quantity,
                monosaturated: servingData.fat.monosaturated * quantity,
                trans: servingData.fat.trans * quantity
            },
            cholesterol : servingData.cholesterol.amount * quantity,
            sodium : servingData.sodium.amount * quantity,
            potassium:servingData.potassium.amount * quantity,
            dietry_fiber:servingData.dietry_fiber.amount * quantity,
            sugers:servingData.sugers.amount * quantity,
            protein:servingData.protein.amount * quantity,
            vitamin_a:servingData.vitamin_a.amount * quantity,
            vitamin_c:servingData.vitamin_c.amount * quantity,
            calcium:servingData.calcium.amount * quantity,
            iron:servingData.iron.amount * quantity,
        }
        return nutrientsValue;
    }

    //calculate macros by required percentage
    static getMacrosFromCalories(calories:number,macros:any) : any{
        let carbs = (calories * macros.carbohydrate)/400;
        let protein = (calories * macros.protein)/400;
        let fat  = (calories * macros.fat)/900;
        return {carbohydrate : carbs,protein:protein,fat:fat};
    }
}