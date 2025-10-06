import { Gear } from "./gear.domain";

export interface IGearRepository {
  getAll(): Promise<Gear[]>;
  getById(id: string): Promise<Gear | null>;
  create(gear: Gear): Promise<Gear>;
  delete(id: string): Promise<void>;
}
