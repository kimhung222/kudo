import { classNames } from "../../utils";
import { CheckIcon } from "@heroicons/react/20/solid";
import React from "react";

export interface StepsProps {
  steps: string[];
  activeStep: number;
  isFinished: boolean;
  onSelectStep: (index: number) => void;
}

export const Steps: React.FC<StepsProps> = ({
  steps,
  activeStep,
  isFinished,
  onSelectStep,
}) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = isFinished || activeStep > index;
          const isActive = activeStep === index;
          return (
            <li
              onClick={() => onSelectStep(index)}
              key={index}
              className={classNames(
                index !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative"
              )}
            >
              {isCompleted ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-indigo-600" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
                    <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step}</span>
                  </div>
                </>
              ) : isActive ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step}</span>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
