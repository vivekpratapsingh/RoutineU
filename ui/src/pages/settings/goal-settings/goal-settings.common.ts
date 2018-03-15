import { Calculator } from "../../../helpers/calculator";

export function updateUserCalories(user: any): any {
    let weekly_goal = user.logs.goal.weekly_goal.length > 0 ? user.logs.goal.weekly_goal[user.logs.goal.weekly_goal.length - 1].goal : "Maintain my current weight";
    let calorieGoal = Calculator.getCalorieGoal(user.height, user.weight.current.weight, user.birthday,
        user.activity_level, user.gender, weekly_goal);
    user.logs.goal.calories.push({ calories: calorieGoal == undefined ? 0 : calorieGoal.goal });
    let macros = Calculator.getMacrosFromCalories(user.logs.goal.calories[user.logs.goal.calories.length - 1].calories,
        { carbohydrate: user.macros_percentage.carbohydrate, protein: user.macros_percentage.protein, fat: user.macros_percentage.fat });
    user.logs.goal.macros.push({ macros: { carbohydrate: macros.carbohydrate, protein: macros.protein, fat: macros.fat } });
    return user;
}