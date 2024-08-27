
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ConfirmationModalProps {
  showConfirmation: boolean;
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  showConfirmation, 
  setShowConfirmation, 
  handleConfirm 
}) => {
  return (
    <Dialog
      open={showConfirmation}
      onClose={() => setShowConfirmation(false)}
    >
      <DialogTitle>Confirm Changes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to save these changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowConfirmation(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

