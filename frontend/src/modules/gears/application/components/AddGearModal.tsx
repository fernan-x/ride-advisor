import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useState } from "react";

import { useMutationCreateGear } from "../mutations/useMutationCreateGear";

export const AddGearModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState<string>("");

  const { createGear, isPending } = useMutationCreateGear({
    onSuccess: () => {
      setName("");
      onClose();
    },
  });

  const disabled = name.length === 0;

  const onHandleClick = () => {
    createGear(name);
  };

  return (
    <Modal
      opened={opened}
      title="Ajouter un nouvel équipement"
      onClose={onClose}
    >
      <Stack gap="md">
        <TextInput
          label="Nom de l'équipement"
          placeholder="Ex: Casque"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          color="indigo"
          radius="md"
          onClick={onHandleClick}
          disabled={disabled}
          loading={isPending}
        >
          Ajouter
        </Button>
      </Stack>
    </Modal>
  );
};
