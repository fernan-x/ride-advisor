import { IGearRepository } from "@/modules/gears/domain/gear.repository";
import { Gear } from "../domain/gear.domain";
import { GearFactory } from "../domain/gear.factory";

export class StubGearRepository implements IGearRepository {
  private gears: Gear[] = [
    GearFactory.create({
      id: "00000000-0000-0000-0000-000000000001",
      name: "Casque",
    }),
    GearFactory.create({
      id: "00000000-0000-0000-0000-000000000002",
      name: "Gants d'hiver",
    }),
    GearFactory.create({
      id: "00000000-0000-0000-0000-000000000003",
      name: "Veste de pluie",
    }),
    GearFactory.create({
      name: "Mitaine",
    }),
  ];

  async getAll(): Promise<Gear[]> {
    return this.gears;
  }

  async getById(id: string): Promise<Gear | null> {
    return this.gears.find((gear) => gear.id === id) || null;
  }

  async create(gear: Gear): Promise<Gear> {
    this.gears.push(gear);
    return gear;
  }

  async delete(id: string): Promise<void> {
    this.gears = this.gears.filter((gear) => gear.id !== id);
    return;
  }
}
