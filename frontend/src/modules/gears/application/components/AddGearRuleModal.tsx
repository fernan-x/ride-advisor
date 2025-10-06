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

export type AddGearRuleModalProps = {
  gearRule: GearRule;
  show: boolean;
  onClose: () => void;
  onConfirm: (rule: GearRule) => void;
  isLoading?: boolean;
};
export const AddGearRuleModal = ({
  show,
  onClose,
  onConfirm,
  gearRule,
  isLoading = false,
}: AddGearRuleModalProps) => {
  const form = useForm({
    initialValues: {
      minTemperature: gearRule?.minTemperature ?? undefined,
      maxTemperature: gearRule?.maxTemperature ?? undefined,
      rainCondition:
        (gearRule?.rainCondition as GearRule["rainCondition"]) ?? "all",
      gearId: gearRule?.gearId ?? "",
    },
    validate: {
      gearId: (value) => (!value ? "Please select a gear" : null),
      rainCondition: (value) => (!value ? "Please choose a condition" : null),
      maxTemperature: (value, values) =>
        value != null &&
        values.minTemperature != null &&
        value < values.minTemperature
          ? "Max must be greater than or equal to min"
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
      rainCondition: values.rainCondition as GearRule["rainCondition"],
      gearId: values.gearId,
    };

    onConfirm(rule);
    onClose();
    form.reset();
  });

  const gearOptions = undefined;

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
            <InputLabel>Gear</InputLabel>
            <Select
              placeholder="Pick a gear"
              data={gearOptions}
              {...form.getInputProps("gearId")}
              radius="md"
              searchable
              clearable
            />
          </div>

          <Group grow align="flex-end">
            <NumberInput
              label="Min temperature (°C)"
              placeholder="e.g. 5"
              allowDecimal={false}
              min={-50}
              max={60}
              {...form.getInputProps("minTemperature")}
              radius="md"
            />
            <NumberInput
              label="Max temperature (°C)"
              placeholder="e.g. 18"
              allowDecimal={false}
              min={-50}
              max={60}
              {...form.getInputProps("maxTemperature")}
              radius="md"
            />
          </Group>

          <div>
            <InputLabel>Rain condition</InputLabel>
            <Select
              data={[
                { value: "all", label: "All" },
                { value: "wet", label: "Wet / Rainy" },
                { value: "dry", label: "Dry" },
              ]}
              {...form.getInputProps("rainCondition")}
              radius="md"
            />
            <Text size="xs" c="dimmed" mt={4}>
              Use <b>All</b> if this rule applies regardless of precipitation.
            </Text>
          </div>

          <Divider my="xs" />

          <Group justify="space-between">
            <Button variant="subtle" onClick={() => form.reset()} radius="md">
              Reset
            </Button>
            <Group>
              <Button variant="default" onClick={onClose} radius="md">
                Cancel
              </Button>
              <Button
                type="submit"
                color="indigo"
                radius="md"
                loading={isLoading}
              >
                Save rule
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
