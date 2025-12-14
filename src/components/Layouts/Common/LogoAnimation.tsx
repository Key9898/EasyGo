export const textZoomGradientClass =
  'text-zoom-gradient bg-[linear-gradient(to_right,theme(colors.orange.500),theme(colors.orange.600),theme(colors.orange.400),theme(colors.orange.600),theme(colors.orange.500))] bg-clip-text text-transparent'

type LogoAnimationProps = {
  text: string
  shouldLoop?: boolean
  className?: string
}

export default function LogoAnimation({ text, shouldLoop = true, className = '' }: LogoAnimationProps) {
  const animationClass = shouldLoop
    ? '[animation:gradientShift_10s_linear_infinite]'
    : '[animation:gradientShift_10s_linear_1]'

  return (
    <h1
      className={`text-3xl sm:text-4xl lg:text-4xl font-bold ${textZoomGradientClass} ${animationClass} ${className}`}
    >
      {text}
    </h1>
  )
}
