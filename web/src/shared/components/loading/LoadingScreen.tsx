import { useLoading } from '../../../contexts/loading-provider'

export function LoadingScreen() {
  const { isLoading, loadingMessage } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-lg transition-opacity duration-500">
    <div className="flex flex-col items-center gap-5">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-blue-200/60 dark:border-blue-900/60" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-400 dark:border-t-blue-400 dark:border-r-blue-300 motion-safe:animate-spin" />
        <div className="absolute inset-4 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-md" />
        <div className="relative h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)] dark:bg-blue-400 dark:shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
      </div>

      {loadingMessage && (
        <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300">
          <span className="animate-pulse">{loadingMessage}</span>
          <span className="flex gap-0.5">
            <span className="h-1 w-1 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]" />
            <span className="h-1 w-1 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]" />
            <span className="h-1 w-1 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]" />
          </span>
        </div>
      )}

    </div>
  </div>
  )
}
