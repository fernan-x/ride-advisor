import {
  Button,
  Divider,
  Group,
  InputLabel,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GearRule } from "../../domain/gear-rule.domain";

import { Gear } from "../../domain/gear.domain";
export type AddGearRuleModalProps = {
  gearRule: GearRule | null;
  show: boolean;
  onClose: () => void;
  onConfirm: (rule: GearRule) => void;
  isLoading?: boolean;
  gears: Gear[];
  gearsSelectDisabled?: boolean;
};
export const AddGearRuleModal = ({
  show,
  onClose,
  onConfirm,
  gearRule,
  gears = [],
  isLoading = false,
  gearsSelectDisabled = false,
}: AddGearRuleModalProps) => {
  const form = useForm({
    initialValues: {
      minTemperature: gearRule?.minTemperature ?? undefined,
      maxTemperature: gearRule?.maxTemperature ?? undefined,
      rainCondition:
        (gearRule?.rainCondition) ?? "all",
      gearId: gearRule?.gearId ?? "",
    },
    validate: {
      gearId: (value) => (!value ? "Veuillez sélectionner un équipement" : null),
      rainCondition: (value) => (!value ? "Veuillez choisir une condition" : null),
      maxTemperature: (value, values) =>
        value != null &&
        values.minTemperature != null &&
        value < values.minTemperature
          ? "La température max doit être supérieure ou égale à la température min"
          : null,
    },
    transformValues: (values) => ({
      ...values,
      minTemperature: values.minTemperature
        ? Number(values.minTemperature)
        : undefined,
      maxTemperature: values.maxTemperature
        ? Number(values.maxTemperature)
        : undefined,
    }),
  });

  const handleSubmit = form.onSubmit((values) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const rule: GearRule = {
      id: gearRule?.id ?? id,
      minTemperature: values.minTemperature,
      maxTemperature: values.maxTemperature,
      rainCondition: values.rainCondition,
      gearId: values.gearId,
    };

    onConfirm(rule);
    onClose();
    form.reset();
  });

  const gearOptions = gears.map((gear) => ({ value: gear.id, label: gear.name }));

  return (
    <Modal
      opened={show}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title="Ajouter une règle"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <div>
            <InputLabel>Équipement</InputLabel>
            <Select
              placeholder="Choisissez un équipement"
              data={gearOptions}
              {...form.getInputProps("gearId")}
              radius="md"
              searchable
              clearable
              nothingFoundMessage="Aucun équipement disponible"
              disabled={gearsSelectDisabled}
            />
          </div>

          <Group grow align="flex-end">
            <NumberInput
              label="Température min (°C)"
              placeholder="e.g. 5"
              allowDecimal={false}
              min={-50}
              max={60}
              {...form.getInputProps("minTemperature")}
              radius="md"
            />
            <NumberInput
              label="Température max (°C)"
              placeholder="e.g. 18"
              allowDecimal={false}
              min={-50}
              max={60}
              {...form.getInputProps("maxTemperature")}
              radius="md"
            />
          </Group>

          <div>
            <InputLabel>Condition de pluie</InputLabel>
            <Select
              data={[
                { value: "all", label: "Tous" },
                { value: "wet", label: "Humide / Pluvieux" },
                { value: "dry", label: "Sec" },
              ]}
              {...form.getInputProps("rainCondition")}
              radius="md"
            />
            <Text size="xs" c="dimmed" mt={4}>
              Utilisez <b>Tous</b> si cette règle s'applique indépendamment des précipitations.
            </Text>
          </div>

          <Divider my="xs" />

          <Group justify="space-between">
            <Button variant="subtle" onClick={() => form.reset()} radius="md">
              Réinitialiser
            </Button>
            <Group>
              <Button variant="default" onClick={onClose} radius="md">
                Annuler
              </Button>
              <Button
                type="submit"
                color="indigo"
                radius="md"
                loading={isLoading}
              >
                Enregistrer la règle
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
