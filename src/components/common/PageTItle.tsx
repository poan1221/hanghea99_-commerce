interface PageTitleProps {
  title: string;
  alignLeft?: boolean;
}

export const PageTitle = ({ title, alignLeft }: PageTitleProps) => {
  return (
    <h2
      className={`
    text-slate-900 font-bold text-[40px] pb-10 ${alignLeft && "text-left"}
    `}
    >
      {title}
    </h2>
  );
};
