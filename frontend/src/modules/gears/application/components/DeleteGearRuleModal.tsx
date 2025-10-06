import { Button, Group, Modal, Stack } from "@mantine/core";

type DeleteGearRuleModalProps = {
  ruleDescription: string;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};
export const DeleteGearRuleModal = ({
  show,
  ruleDescription,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteGearRuleModalProps) => {
  const onHandleClose = () => {
    if (isLoading) {
      return;
    }

    onClose();
  };

  return (
    <Modal opened={show} onClose={onHandleClose} title="Supprimer la règle">
      <Stack gap="md">
        <p>Êtes-vous sûr de vouloir supprimer cette règle ?</p>
        <p>{ruleDescription}</p>
        <Group gap="xs" justify="end">
          <Button
            onClick={onHandleClose}
            variant="light"
            radius="md"
            color="indigo"
          >
            Annuler
          </Button>
          <Button
            disabled={isLoading}
            onClick={onConfirm}
            color="red"
            radius="md"
            loading={isLoading}
          >
            Supprimer
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
