import { Card } from "@/components/ui/Card";
import { Alert, Stack } from "@mantine/core";
import { AlertTriangle, Scale } from "lucide-react";
import { useQueryGearRules } from "../queries/useQueryGearRules";
import { useQueryGears } from "../queries/useQueryGears";
import { GearRuleListItem } from "./GearRuleListItem";

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

  const gearsWithoutRules =
    gears?.filter((gear) => !rules?.find((rule) => rule.gearId === gear.id)) ??
    [];

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

        {rules.map((rule) => (
          <GearRuleListItem key={rule.id} rule={rule} gears={gears ?? []} />
        ))}
      </Stack>
    </Card>
  );
};
