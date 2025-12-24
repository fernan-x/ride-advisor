import { Card } from "@/components/ui/Card";
import { Alert, Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddGearRuleModal } from "./AddGearRuleModal";
import { useMutationCreateGearRule } from "../mutations/useMutationCreateGearRule";
import { AlertTriangle, Plus, Scale } from "lucide-react";
import { useQueryGearRules } from "../queries/useQueryGearRules";
import { useQueryGears } from "../queries/useQueryGears";
import { GearRuleListItem } from "./GearRuleListItem";
import { GearRule } from "../../domain/gear-rule.domain";

const GearRuleListSkeleton = () => (
  <GearRuleListContainer>
    <div className="w-full h-14 rounded-lg bg-gray-200" />
    <div className="w-full h-14 rounded-lg bg-gray-200" />
  </GearRuleListContainer>
);

const GearRuleListContainer = ({ children }: { children: React.ReactNode }) => (
  <Card
    icon={<Scale className="w-6 h-6 text-blue-600" />}
    title="Vos règles d'équipement"
  >
    <Stack gap="md">{children}</Stack>
  </Card>
);

export const GearRuleList = () => {
  const { data: rules, isLoading } = useQueryGearRules();
  const { data: gears, isLoading: isLoadingGears } = useQueryGears();
  const [showAddModal, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const { createGearRule, isPending } = useMutationCreateGearRule({
    onSuccess: closeAddModal,
  });

  const gearsWithoutRules =
    gears?.filter((gear) => !rules?.find((rule) => rule.gearId === gear.id)) ?? [];

  const handleAddRule = (rule: GearRule) => {
    createGearRule(rule);
  };

  if (isLoading || isLoadingGears) {
    return <GearRuleListSkeleton />;
  }

  if (!rules || rules.length === 0) {
    return (
      <GearRuleListContainer>
        <p className="text-gray-500 text-sm">Aucune règle de configurée</p>
      </GearRuleListContainer>
    );
  }

  return (
    <>
      <Card
        icon={<Scale className="w-6 h-6 text-blue-600" />}
        title="Vos règles d'équipement"
      >
        <Stack gap="md">
          {gearsWithoutRules?.length > 0 && (
            <Alert
              variant="light"
              radius="md"
              color="orange"
              title="Vous n'avez pas configuré de règles pour les équipements suivants"
              icon={<AlertTriangle className="w-4 h-4" />}
            >
              <ul className="list-disc pl-4 text-sm text-orange-500">
                {gearsWithoutRules.map((gear) => (
                  <li key={gear.id}>{gear.name}</li>
                ))}
              </ul>
            </Alert>
          )}

          {rules && rules.map((rule) => (
            <GearRuleListItem key={rule.id} rule={rule} gears={gears ?? []} />
          ))}

          <Button
            variant="light"
            radius="md"
            color="indigo"
            leftSection={<Plus />}
            onClick={openAddModal}
          >
            Ajouter une nouvelle règle
          </Button>
        </Stack>
      </Card>
      <AddGearRuleModal
        show={showAddModal}
        onClose={closeAddModal}
        onConfirm={handleAddRule}
        gearRule={null}
        isLoading={isPending}
        gears={gearsWithoutRules ?? []}
      />
    </>
  );
};
