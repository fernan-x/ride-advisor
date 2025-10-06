export type GearRule = {
  id: string;
  minTemperature?: number;
  maxTemperature?: number;
  rainCondition: "all" | "wet" | "dry";
  gearId: string;
  // windCondition: 'all' | 'strong' | 'weak';
};
