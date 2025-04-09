export interface FoodCost {
    idFoodCosts: number;
    weekNumber: string;
    foodId: number;
    gramsPerChicken: string;
    totalKg: string;
    totalCost: string;
    startDate: Date;
    endDate: Date;
    status: string;
}

export interface EditableFoodCost extends FoodCost {
    chickensCount?: string;
    unitPrice?: string;
}


export interface InsertCost {
    weekNumber: string;
    foodId: number;
    gramsPerChicken: string;
    chickensCount: string;
    unitPrice: string;
}

export interface UpdateCost {
    idFoodCosts: number;
    weekNumber: string;
    foodId: number;
    gramsPerChicken: string;
    chickensCount: string;
    unitPrice: string;
}
