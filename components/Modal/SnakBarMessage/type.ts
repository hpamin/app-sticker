export interface SnackbarPortalProps {
    visible: boolean;
    onDismiss: () => void;
    message: string;
    duration?: number;
    actionLabel?: string;
    onActionPress?: () => void;
}
