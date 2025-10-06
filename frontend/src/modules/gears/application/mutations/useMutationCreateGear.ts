import { useDependencies } from "@/modules/di";
import { useMutation } from "@tanstack/react-query";
import { GearFactory } from "../../domain/gear.factory";

export const useMutationCreateGear = (options?: { onSuccess?: () => void }) => {
  const { gearRepository } = useDependencies();

  const { mutate, ...rest } = useMutation({
    mutationFn: (name: string) =>
      gearRepository.create(GearFactory.create({ name })),
    onSuccess: options?.onSuccess,
  });

  return { createGear: mutate, ...rest };
};
