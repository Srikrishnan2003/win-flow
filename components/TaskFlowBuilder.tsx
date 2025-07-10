'use client';

import { useState } from 'react';
import { TaskStep } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import StepCard from './StepCard';
import AddStepButton from './AddStepButton';
import ScriptPreview from './ScriptPreview';
import ExportScriptButton from './ExportScriptButton';
import { FileText } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

const TaskFlowBuilder = () => {
  const [steps, setSteps] = useState<TaskStep[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addStep = (type: string) => {
    const newStep: TaskStep = {
      id: uuidv4(),
      type: type as TaskStep['type'],
      data: {
        value: '',
        label: '',
        fileType: undefined,
      },
    };
    setSteps(prev => [...prev, newStep]);
  };

  const updateStepValue = (id: string, value: string, key: keyof TaskStep['data'] = 'value') => {
    setSteps(prev =>
      prev.map(step =>
        step.id === id
          ? {
              ...step,
              data: {
                ...step.data,
                [key]: value,
              },
            }
          : step
      )
    );
  };

  const deleteStep = (id: string) => {
    setSteps(prev => prev.filter(step => step.id !== id));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    setSteps(prev => {
      const newSteps = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newSteps.length) return prev;

      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];

      return newSteps;
    });
  };

  const updateStepLabel = (id: string, label: string) => {
    setSteps(prev => prev.map(step => (step.id === id ? { ...step, data: { ...step.data, label } } : step)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSteps(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <AddStepButton onAddStep={addStep} />

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={steps} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {steps.length > 0 ? (
                  steps.map((step, index) => (
                    <StepCard
                      key={step.id}
                      step={step}
                      index={index}
                      totalSteps={steps.length}
                      onValueChange={updateStepValue}
                      onDelete={deleteStep}
                      onMove={moveStep}
                      onLabelChange={updateStepLabel}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl p-12 mt-4">
                    <FileText className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-400">Your workflow is empty</h3>
                    <p className="mt-1 text-sm">Click Add Step to begin.</p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="sticky top-24 h-fit rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-slate-200">Live Script Preview</h2>
          <ScriptPreview steps={steps} />
          <div className="mt-4 flex justify-end">
            <ExportScriptButton steps={steps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskFlowBuilder;
