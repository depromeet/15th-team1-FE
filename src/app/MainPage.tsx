/*NOTE - 해당 파일은 루트 router를 위한 임시 페이지입니다. 실제 페이지 작성 후 지워주세요! */
import { useAtom } from "jotai";

import { messageAtom } from "@/store/messageAtom.tsx";
import Modal from "@/component/common/modal/Modal";
import useModal from "@/hooks/useModal";
import Icon from "@/component/common/Icon/Icon";

function MainPage() {
  const [message] = useAtom(messageAtom);
  const { open } = useModal();

  return (
    <>
      <div>
        <span>welcome to layer 🎇</span>
        <div onClick={() => open({ title: "냠냠", content: "쩝쩝", callBack: () => console.log("확인") })}>{message}</div>
      </div>

      <Icon icon="ic_back" color="red" size={5} onClick={() => console.log("클릭")} />
      <Icon icon="ic_back" color={"rgba(0,0,0,0.6)"} size={2} />
      <Icon icon="ic_back" color="#00ff00" size={4} />

      <Modal />
    </>
  );
}

export default MainPage;
