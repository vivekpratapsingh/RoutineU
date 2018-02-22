import { Collections } from "../common/collections";

export class Calculator {

    static getBMI(height: number, weight: number): number {
        return  Math.round((weight / ((height) / 100 * (height) / 100))*100)/100;
    }
    static getCalorieGoal(height: number, weight: number, birthday: Date, activity: String, gender: String, goal: String = 'Maintain my current weight'): any {
        let today = new Date();
        let a: Date = new Date(birthday);
        let age: number = parseInt(((today.getTime() - a.getTime()) / 31536000000).toPrecision(2));
        let calorieGoal: number;
        let bmr: number;
        var activityMultiplier = Collections.ActivityLevel.find(function (obj) { return obj.level == activity });
        var surplus = Collections.WeeklyGoal.find(function (obj) { return obj.goal == goal });
        if (gender == 'male') {

            bmr =  Math.round((66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activityMultiplier.multiplier);
        }
        else {
            bmr = Math.round((655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activityMultiplier.multiplier);
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
            calories: Math.round(servingData.calories * quantity),
            carbohydrates: Math.round(servingData.carbohydrates.amount * quantity),
            fat: {
                amount: Math.round(servingData.fat.amount * quantity),
                saturated: Math.round(servingData.fat.saturated * quantity),
                polysaturated: Math.round(servingData.fat.polysaturated * quantity),
                monosaturated: Math.round(servingData.fat.monosaturated * quantity),
                trans: Math.round(servingData.fat.trans * quantity)
            },
            cholesterol: Math.round(servingData.cholesterol.amount * quantity),
            sodium: Math.round(servingData.sodium.amount * quantity),
            potassium: Math.round(servingData.potassium.amount * quantity),
            dietry_fiber: Math.round(servingData.dietry_fiber.amount * quantity),
            sugers: Math.round(servingData.sugers.amount * quantity),
            protein: Math.round(servingData.protein.amount * quantity),
            vitamin_a: Math.round(servingData.vitamin_a.amount * quantity),
            vitamin_c: Math.round(servingData.vitamin_c.amount * quantity),
            calcium: Math.round(servingData.calcium.amount * quantity),
            iron: Math.round(servingData.iron.amount * quantity),
        }
        return nutrientsValue;
    }

    //calculate macros by required percentage
    static getMacrosFromCalories(calories: number, macros: any): any {
        let carbs = Math.round((calories * macros.carbohydrate) / 400);
        let protein = Math.round((calories * macros.protein) / 400);
        let fat = Math.round((calories * macros.fat) / 900);
        console.log({ carbohydrate: carbs, protein: protein, fat: fat });
        return { carbohydrate: carbs, protein: protein, fat: fat };
    }
}