import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "@/hooks/useNavigate";

// 글로벌로 사용하는 alert dialog - store를 통해 사용
import { useAlertDialogStore } from "@/store/useAlertDialogStore";
// import { useNavigate } from "react-router-dom";

function GlobalAlertDialog() {
  const { isOpen, title, description, closeAlert, type } =
    useAlertDialogStore();
  const { moveCart } = useNavigate();
  const handleConfirm = () => {
    if (type === "navigate") moveCart();
    if (type === "alert") closeAlert();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={closeAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default GlobalAlertDialog;
