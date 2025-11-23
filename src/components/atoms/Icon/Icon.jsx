export const Icon = ({
  icon: IconComponent,
  size = 24,
  className = '',
  svgPath,
  ...props
}) => {
  if (!IconComponent && !svgPath) return null

  // If it's a Simple Icon SVG path, render as SVG
  if (svgPath) {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        className={className}
        aria-hidden='true'
        fill='currentColor'
        {...props}
      >
        <path d={svgPath} />
      </svg>
    )
  }

  // Otherwise, it's a Lucide React component
  return (
    <IconComponent
      size={size}
      className={className}
      aria-hidden='true'
      {...props}
    />
  )
}
