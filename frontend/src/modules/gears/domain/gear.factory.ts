import { Gear } from "./gear.domain";
import { v4 as uuidv4 } from "uuid";

export const GearFactory = {
  create(data: Partial<Gear> & Pick<Gear, "name">): Gear {
    return {
      id: data?.id ?? uuidv4(),
      name: data.name,
      createdAt: data?.createdAt ?? new Date(),
    };
  },
};
