import { CanvasLayout } from '@/components/Canvas/CanvasLayout';
import { FamilyTreeCanvas } from '@/components/Canvas/FamilyTreeCanvas';
import { SessionDebugger } from '@/components/Canvas/SessionDebugger';

export default function DashboardPage(): JSX.Element {
  return (
    <CanvasLayout>
      <FamilyTreeCanvas />
      <SessionDebugger />
    </CanvasLayout>
  );
}