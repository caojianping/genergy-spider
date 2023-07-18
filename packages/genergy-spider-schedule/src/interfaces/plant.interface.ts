import { PlantDTO } from '../dto';
import { PlantModel } from '../models';

export interface IPlantService {
    isExist(psId: string, code: string): Promise<boolean>;

    getPlants(): Promise<Array<PlantModel>>;

    getCount(): Promise<number>;

    addPlant(plantDTO: PlantDTO): Promise<boolean>;
}
