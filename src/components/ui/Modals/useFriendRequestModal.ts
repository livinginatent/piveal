// hooks/useFriendRequestModal.ts
import { useState } from "react";
import { ModalType } from "./FriendRequestModal";

interface UseFriendRequestModalReturn {
  modalVisible: boolean;
  modalType: ModalType;
  modalTitle: string;
  modalMessage?: string;
  showModal: (type: ModalType, title: string, message?: string) => void;
  hideModal: () => void;
  showLoading: (title: string, message?: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
}

export const useFriendRequestModal = (): UseFriendRequestModalReturn => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("info");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState<string>();

  const showModal = (type: ModalType, title: string, message?: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showLoading = (title: string, message?: string) => {
    showModal("loading", title, message);
  };

  const showSuccess = (title: string, message?: string) => {
    showModal("success", title, message);
  };

  const showError = (title: string, message?: string) => {
    showModal("error", title, message);
  };

  return {
    modalVisible,
    modalType,
    modalTitle,
    modalMessage,
    showModal,
    hideModal,
    showLoading,
    showSuccess,
    showError,
  };
};
