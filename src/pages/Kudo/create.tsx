import React, { useState } from "react";
import { FormProps, KudoForm } from "../../components";

import { Steps } from "../../components/Step";
import { useNavigate } from "react-router";

const KUDO_STORAGE_KEY = "kudo_lists";

const getFormValuesByStep = (step: number) => {
  try {
    const kudoLists = JSON.parse(localStorage.getValue(KUDO_STORAGE_KEY));
    return kudoLists[step];
  } catch {
    return {
      selectedUserId: -1,
      content: "",
    };
  }
};

const RANDOM_USER_ID = 9;
export const CreateKudoPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  // const [isFinished, setIsFinished] = useState(false);
  // init randomUser
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([RANDOM_USER_ID, -1, -1]);
  const steps = [
    {
      name: "Step 1",
    },
    {
      name: "Step 2",
    },
    {
      name: "Step 3",
    },
  ];

  // const handleSelectStep = (index: number) => {
  //   if (isFinished) setActiveStep(index);
  // };
  const handleBack = () => setActiveStep((activeStep) => activeStep - 1);

  const handleSelectUser = (formIndex: number, userId: number) => {
    setSelectedIds((selectedIds) =>
      selectedIds.map((selectedId, index) =>
        index === formIndex ? userId : selectedId
      )
    );
  };
  const handleNext = (values: FormProps, id: number, formIndex: number) => {
    setActiveStep((activeStep) => {
      if (activeStep < steps.length - 1) {
        return activeStep + 1;
      }
      // router push to success
      navigate("/kudo/create/success");
      return activeStep;
    });
  };
  return (
    <div className="w-screen flex justify-center pt-6">
      <div className="w-full md:w-[768px] px-4 flex flex-col">
        <div className=" flex w-full justify-center">
          <Steps
            steps={steps}
            activeStep={activeStep}
            isFinished={false}
            onSelectStep={() => {}}
          />
        </div>
        <div>
          <div className="overflow-hidden w-full">
            <div
              className="flex relative w-full ease-in-out duration-300 touch-pan-y backface-hidden translateZ-0"
              style={{ transform: `translateX(${-activeStep * 100}%)` }}
            >
              <div className="flex w-full h-[80vh]">
                {[
                  { key: "first", randomUserId: RANDOM_USER_ID },
                  { key: "second" },
                  { key: "last" },
                ].map(
                  (
                    {
                      key,
                      randomUserId,
                    }: {
                      key: string;
                      randomUserId?: number;
                    },
                    index
                  ) => (
                    <KudoForm
                      key={key}
                      onSelectUser={(userId) => handleSelectUser(index, userId)}
                      randomUserId={randomUserId}
                      onBack={handleBack}
                      onNext={(values, id) => handleNext(values, id, index)}
                      activeStep={activeStep}
                      totalStep={steps.length}
                      selectedIds={selectedIds.filter(
                        (_, idx) => idx !== index
                      )}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
