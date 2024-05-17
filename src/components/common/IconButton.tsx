import { Button } from "@/components/ui/button";
import { IconType, Icon } from "@/components/common/randerIcon";

interface IconButtonProps {
  iconType: IconType;
  label?: string;
  className?: string;
  isTransperent?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export const IconButton = ({
  iconType,
  label,
  className,
  isTransperent,
  onClick,
}: IconButtonProps) => {
  return (
    <Button
      size={label ? "default" : "icon"}
      className={className}
      variant={isTransperent ? "iconGhost" : "default"}
      onClick={onClick}
    >
      <Icon type={iconType} />
      {label && <div className="pl-1">{label}</div>}
    </Button>
  );
};
