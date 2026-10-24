type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  id,
  index,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-index">
        <span className="section-index-number" aria-hidden="true">
          {index}
        </span>
        <span>{label}</span>
      </p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
