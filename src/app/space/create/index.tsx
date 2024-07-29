import { css } from "@emotion/react";
import axios from "axios";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { Category } from "@/app/space/create/Category";
import { Field } from "@/app/space/create/Field";
import { Home } from "@/app/space/create/Home";
import { Info } from "@/app/space/create/Info";
import { Thumb } from "@/app/space/create/Thumb";
import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

type CreateSpaceProps = {
  onSubmit: (spaceValue: SpaceValue) => void;
};

const LAST_PAGE = 4;

export function CreateSpace({ onSubmit }: CreateSpaceProps) {
  const navigate = useNavigate();
  const [spaceValue, setSpaceValue] = useAtom(spaceState);
  const resetSpaceValue = useResetAtom(spaceState);

  useEffect(() => {
    if (spaceValue.step === LAST_PAGE + 1) {
      try {
        onSubmit({
          ...spaceValue,
        });
        resetSpaceValue();
      } catch (error) {
        setSpaceValue((prevValues) => ({
          ...prevValues,
          step: prevValues.step - 1,
        }));
      }
    }
  }, [onSubmit, resetSpaceValue, setSpaceValue, spaceValue]);

  const handleNext = () => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      step: prevValues.step + 1,
    }));
  };

  const handleCategoryChange = (typeValues: Pick<SpaceValue, "category">) => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      ...typeValues,
      step: prevValues.step + 1,
    }));
  };

  const handleFieldChange = (categoryValues: Pick<SpaceValue, "field">) => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      ...categoryValues,
      step: prevValues.step + 1,
    }));
  };

  const handleInfoChange = (infoValues: Pick<SpaceValue, "name" | "introduction">) => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: prevValues.step + 1,
    }));
  };

  const handleThumbChange = async (thumbValues: Pick<SpaceValue, "imgUrl">) => {
    try {
      const { imgUrl } = thumbValues;
      const {
        data: { presignedUrl, imageUrl },
      } = await api.get<{ presignedUrl: string; imageUrl: string }>("/external/image/presigned?domain=SPACE");

      await axios.put(presignedUrl, imgUrl, {
        headers: {
          "Content-Type": "image/png",
        },
      });

      setSpaceValue((prevValues) => ({
        ...prevValues,
        imgUrl: imageUrl,
        step: prevValues.step + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = useCallback(() => {
    spaceValue.step > 0 &&
      setSpaceValue((prevValues) => ({
        ...prevValues,
        step: prevValues.step - 1,
      }));
  }, [setSpaceValue, spaceValue.step]);

  // 뒤로 가기 감지
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [handleBack]);

  return (
    <DefaultLayout
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          color={spaceValue.step === 0 ? "white" : "default"}
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate(-1)}
        />
      }
      theme={spaceValue.step === 0 ? "dark" : "default"}
    >
      {spaceValue.step !== 0 && <ProgressBar curPage={spaceValue.step} lastPage={LAST_PAGE} />}
      {spaceValue.step === 0 && <Home onNext={handleNext} />}
      {spaceValue.step === 1 && <Category onNext={handleCategoryChange} />}
      {spaceValue.step === 2 && <Field onNext={handleFieldChange} />}
      {spaceValue.step === 3 && <Info onNext={handleInfoChange} />}
      {spaceValue.step === 4 && <Thumb onNext={handleThumbChange} />}
    </DefaultLayout>
  );
}