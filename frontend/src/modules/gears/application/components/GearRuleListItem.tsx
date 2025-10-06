import { GearRule } from "../../domain/gear-rule.domain";
import { getRuleDescription } from "../utils/gear-rule.utils";
import { ActionIcon, Group } from "@mantine/core";
import { Pencil, Trash2 } from "lucide-react";
import { Gear } from "../../domain/gear.domain";
import { DeleteGearRuleModal } from "./DeleteGearRuleModal";
import { useDisclosure } from "@mantine/hooks";
import { useMutationDeleteGearRule } from "../mutations/useMutationDeleteGearRule";
import { AddGearRuleModal } from "./AddGearRuleModal";

type GearRuleListItemProps = {
  rule: GearRule;
  gears: Gear[];
};
export const GearRuleListItem = ({ rule, gears }: GearRuleListItemProps) => {
  const [showDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [showAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const { deleteGearRule, isPending } = useMutationDeleteGearRule();

  const ruleDescription = getRuleDescription(rule, gears);

  return (
    <>
      <DeleteGearRuleModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={() => deleteGearRule(rule.id)}
        ruleDescription={ruleDescription}
        isLoading={isPending}
      />
      <AddGearRuleModal
        show={showAddModal}
        onClose={closeAddModal}
        onConfirm={(rule: GearRule) => console.log("add rule", rule)}
        gearRule={rule}
        isLoading={isPending}
      />
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-gray-700">{ruleDescription}</span>
        <Group gap="sm">
          <ActionIcon variant="subtle" onClick={openAddModal} size="sm">
            <Pencil className="w-4 h-4" />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            onClick={openDeleteModal}
            color="red"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
          </ActionIcon>
        </Group>
      </div>
    </>
  );
};
