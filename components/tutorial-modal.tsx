"use client";

import useTutorialModal from "@/hooks/useTutorialModal";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STEPS } from "@/lib/enums";
import { algorithms } from "@/lib/algorithms";

const TutorialModal = () => {
  const tutorialModal = useTutorialModal();
  const [step, setStep] = useState<STEPS>(STEPS.INTRO);

  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onNext = () => {
    if (step === STEPS.TECH_STACK) {
      setStep(0);
      tutorialModal.onClose();
      return;
    }
    setStep((prev) => prev + 1);
  };
  let header = (
    <div className="flex items-center gap-x-2 font-bold py-1">
      Pathfinding Visualizer
    </div>
  );
  let body = (
    <p className="text-left">
      This is a pathfinding visualizer that allows you to find the path between
      the start and end node. Add walls or generate a random board to visualize
      the path
    </p>
  );
  if (step === STEPS.DESCRIPTION) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Description
      </div>
    );
    body = (
      <>
        <ul className="list-disc list-inside">
          <li className="text-left py-1">
            Within this visualizer, users can seamlessly navigate the grid,
            restricted to movements in the cardinal directions of up, down,
            left, and right.
          </li>
          <li className="text-left py-1">
            It empowers individuals to engage with diverse pathfinding
            challenges, ranging from intricate maze-solving to route
            optimization, all while deepening their comprehension of fundamental
            graph traversal and search principles.
          </li>
          <li className="text-left py-1">
            The visualizer offers versatile options, allowing you to customize
            the grid size, introduce obstacles, modify start and end nodes, and
            select different algorithms.
          </li>
        </ul>
      </>
    );
  }

  if (step === STEPS.ALGORITHMS) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">Algorithms</div>
    );
    //display info about algorithm based on selected algorithm
    body = (
      <>
        <p className="flex text-left text-xs">
          The following algorithms are supported:
        </p>
        <ul className="list-disc list-inside">
          {algorithms.map((algorithm) => (
            <li key={algorithm.value} className="text-left text-xs py-1">
              <span className="font-bold text-blue-500">
                {algorithm.label}:{" "}
              </span>{" "}
              {algorithm.description}
            </li>
          ))}
        </ul>
      </>
    );
  }
  if (step === STEPS.VIDEO) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">
        Watch the video to learn how to visualize the path
      </div>
    );
    body = (
      <div>
        <iframe
          width="640"
          height="360"
          src="https://www.youtube.com/watch?v=xZg_Ob6wzjk"
        />
      </div>
    );
  }
  if (step === STEPS.TECH_STACK) {
    header = (
      <div className="flex items-center gap-x-2 font-bold py-1">TECH STACK</div>
    );
    body = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 cursor-pointer">
        <Badge className="bg-blue-500 w-24 hover:text-blue-200">
          <p className="flex flex-row justify-center text-center">React</p>
        </Badge>
        <Badge className="bg-red-500 text-center text-white w-24 hover:text-red-200">
          Typescript
        </Badge>
        <Badge className="bg-cyan-500 text-center text-white hover:text-cyan-200 w-24">
          <p className="flex justify-center">TailwindCSS</p>
        </Badge>
        <Badge className="bg-green-500 text-center text-white hover:text-green-200 w-24">
          <p className="text-center flex">ShadCn/UI</p>
        </Badge>
        <Badge className="bg-emerald-500 text-center text-white hover:text-emerald-200 w-24">
          NextJS
        </Badge>
        <Badge className="bg-pink-500 text-center text-white hover:text-pink-200 w-24">
          FastAPI
        </Badge>
        <Badge className="bg-amber-500 text-center text-white hover:text-amber-200 w-24">
          Python
        </Badge>
        <Badge className="bg-indigo-500 text-center text-white hover:text-indigo-200 w-24">
          Swagger-UI
        </Badge>
      </div>
    );
  }

  return (
    <Dialog open={tutorialModal.isOpen} onOpenChange={tutorialModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            {header}
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {body}
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
              <Button variant="outline" className="flex-grow" onClick={onNext}>
                {step === STEPS.TECH_STACK ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
