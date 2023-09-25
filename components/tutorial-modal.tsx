'use client';

import useTutorialModal from '@/hooks/useTutorialModal';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from './ui/badge';
import {
  MessageSquare,
  Music,
  ImageIcon,
  VideoIcon,
  Code,
  Check,
  Zap,
  PersonStanding,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
enum STEPS {
  INTRO = 0,
  DESCRIPTION = 1,
  WALLS = 2,
  CHANGE_BOARD = 3,
  ALGORITHMS = 4,
  VISUALIZE_PATH = 5,
}

const TutorialModal = () => {
  const tutorialModal = useTutorialModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<STEPS>(STEPS.INTRO);
  //   const handleClose = useCallback(() => {
  //     if (disabled) {
  //       return;
  //     }

  //     setShowModal(false);
  //     setTimeout(() => {
  //       onClose();
  //     }, 300);
  //   }, [onClose, disabled]);
  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onNext = () => {
    setStep((prev) => prev + 1);
  };
  let header = (
    <div className="flex items-center gap-x-2 font-bold py-1">
      Pathfinding Visualizer
    </div>
  );
  let body = (
    <div>
      This is a pathfinding visualizer that allows you to find the path between
      the start and end node. Add walls or generate a random board to visualize
      the path
    </div>
  );
  if (step === STEPS.DESCRIPTION) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Description
      </div>
    );
    body = (
      <>
        <p className="flex flex-row">
          The person just finished his business and is trying to get home
          However, he realized that there are a lot of obstacles in his way
          which makes it hard for him to get home. He needs your help to find
          the shortest path to get home.
        </p>
      </>
    );
  }
  if (step === STEPS.WALLS) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Adding Walls
      </div>
    );
    body = (
      <>
        <div>Click and drag on the board to add walls</div>
        <div>Click on the dropdown to change the board</div>
      </>
    );
  }
  if (step === STEPS.CHANGE_BOARD) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Changing the board
      </div>
    );
    body = <div>Click on the dropdown to change the board</div>;
  }

  if (step === STEPS.ALGORITHMS) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Adding start and end nodes
      </div>
    );
    body = <div>Click on the dropdown to change the board</div>;
  }

  if (step === STEPS.VISUALIZE_PATH) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Visualizing the path
      </div>
    );
    body = <div>Click on the dropdown to change the board</div>;
  }

  useEffect(() => {
    tutorialModal.onOpen();
  }, []);
  return (
    <Dialog open={tutorialModal.isOpen} onOpenChange={tutorialModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            {header}
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {body}
            {/* {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                    <tool.icon className={cn(tool.color, 'w-6 h-6')} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))} */}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col gap-2 p-6">
            <div
              className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
            >
              <Button
                variant="outline"
                className="flex-grow"
                onClick={onBack}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button
                variant="outline"
                className="flex-grow"
                onClick={onNext}
                disabled={step === 4}
              >
                Next
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
