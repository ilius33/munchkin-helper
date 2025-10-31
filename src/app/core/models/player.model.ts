export enum Sex {
    Male = 'Male',
    Female = 'Female',
    Agender = 'Agender',
}

export interface Player {
    name: string;
    sex: Sex;
    level: number;
    inventoryStrength: number;
}

export function getDefaultPlayer(): Player {
    return { name: 'Player', sex: Sex.Agender, level: 1, inventoryStrength: 0 };
}