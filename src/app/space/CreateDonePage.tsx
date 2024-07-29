import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function CreateDonePage() {
  const navigate = useNavigate();

  return (
    <DefaultLayout
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate("/space/create")}
        />
      }
    >
      <Spacing size={2.4} />
      <Typography variant="S3" color="grey400">
        스페이스 생성 완료!
      </Typography>
      <Spacing size={0.6} />
      <Typography variant="T4">{`어울리는 회고 템플릿을\n찾아볼까요?`}</Typography>
      <ButtonProvider>
        <ButtonProvider.Primary>회고 템플릿 추천 받기</ButtonProvider.Primary>
        <div css={laterTextStyles}>다음에 하기</div>
      </ButtonProvider>
    </DefaultLayout>
  );
}

// 이름 바꾸기
const laterTextStyles = css`
  font-size: 1.6rem;
  padding: 1.6rem 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
`;