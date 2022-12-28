import React, { useContext, useEffect, useRef, useState } from "react";
import { FormProps, KudoForm } from "../../components";

import { Steps } from "../../components/Step";
import { useNavigate } from "react-router";
import { getUserKudoData, writeUserKudoData } from "../../libs/database";
import { AuthContext } from "../../context/auth.provider";
import toast from "react-hot-toast";

const RANDOM_USER_ID = 9;
export const CreateKudoPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const data = useRef<FormProps[]>([
    { userId: -1, content: "" },
    { userId: -1, content: "" },
    { userId: -1, content: "" },
  ]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([RANDOM_USER_ID, -1, -1]);
  const steps = ["Bước 1", "Bước 2", "Bước 3"];

  const handleBack = () => setActiveStep((activeStep) => activeStep - 1);

  const handleSelectUser = (formIndex: number, userId: number) => {
    setSelectedIds((selectedIds) =>
      selectedIds.map((selectedId, index) =>
        index === formIndex ? userId : selectedId
      )
    );
  };
  const handleNext = (values: FormProps, id: number, formIndex: number) => {
    data.current[formIndex] = {
      ...values,
    };
    const nextStep = activeStep + 1;
    if (activeStep < steps.length - 1) {
      setActiveStep(nextStep);
      return;
    }
    setIsSubmitting(true);
    writeUserKudoData(user?.uid || "", data.current)
      .then(() => {
        toast.success("Lời nhắn của bạn đã được ghi nhận!");
        navigate("/kudo/create/success");
      })
      .catch((e) => {
        toast.error("Có lỗi xảy ra!");
      })
      .finally(() => setIsSubmitting(false));
  };
  useEffect(() => {
    if (user) {
      setIsFetching(true);
      getUserKudoData(user?.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            data.current = snapshot.val();
          }
        })
        .catch(console.error)
        .finally(() => setIsFetching(false));
    }
  }, []);

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
                  { key: "first", isRandomChoice: true },
                  { key: "second", isRandomChoice: true },
                  { key: "last" },
                ].map(
                  (
                    {
                      key,
                      isRandomChoice,
                    }: {
                      key: string;
                      isRandomChoice?: boolean;
                    },
                    index
                  ) => (
                    <KudoForm
                      defaultValues={data.current[index]}
                      isLoading={isFetching || isSubmitting}
                      key={key}
                      onSelectUser={(userId) => handleSelectUser(index, userId)}
                      isRandomChoice={isRandomChoice}
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
