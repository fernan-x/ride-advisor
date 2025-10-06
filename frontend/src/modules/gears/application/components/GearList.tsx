import { Bike, Plus } from "lucide-react";
import { useQueryGears } from "../queries/useQueryGears";
import { Card } from "@/components/ui/Card";
import { Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddGearModal } from "./AddGearModal";

const GearListSkeleton = () => (
  <>
    <div className="md:w-20 w-full h-14 rounded-lg bg-gray-200"></div>
    <div className="md:w-28 w-full h-14 rounded-lg bg-gray-200"></div>
    <div className="md:w-24 w-full h-14 rounded-lg bg-gray-200"></div>
  </>
);

export const GearList = () => {
  const { data, isLoading } = useQueryGears();
  const [addModal, { close, open }] = useDisclosure();

  return (
    <Card
      icon={<Bike className="w-6 h-6 text-blue-600" />}
      title="Votre équipement"
    >
      <AddGearModal opened={addModal} onClose={close} />
      <Stack gap="md">
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          {isLoading ? (
            <GearListSkeleton />
          ) : (
            data?.map((gear) => (
              <div
                key={gear.id}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="text-gray-700">{gear.name}</span>
              </div>
            ))
          )}
        </div>

        <Button
          variant="light"
          radius="md"
          color="indigo"
          leftSection={<Plus />}
          onClick={open}
        >
          Ajouter un nouvel équipement
        </Button>
      </Stack>
    </Card>
  );
};
