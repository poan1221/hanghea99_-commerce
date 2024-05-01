import { Button } from "@/components/ui/button";
import { IconType, Icon } from "@/components/common/randerIcon";

interface IconButtonProps {
  iconType: IconType;
  label?: string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const IconButton = ({
  iconType,
  label,
  className,
  onClick,
}: IconButtonProps) => {
  return (
    <Button className={`flex items-center ${className}`} onClick={onClick}>
      <Icon type={iconType} />
      {label && <div className="pl-1">{label}</div>}
    </Button>
  );
};
